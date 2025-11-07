import Teacher from "../MODEL/TeacherModel.js";
import Subject from "../MODEL/SubjectModel.js";
import Class from "../MODEL/classModel.js";

// create teacher
export const create = async (req, res) => {
  try {
    let { classTeacherOf, subjectTeacherOfClass = [], ...rest } = req.body;

    // validate classTeacherOf if provided
    let classId = null;
    if (classTeacherOf) {
      const classExist = await Class.findById(classTeacherOf);
      if (!classExist) {
        return res.status(400).json({ message: "Invalid classTeacherOf" });
      }
      classId = classExist._id;
    }

    //  validate subjectTeacherOfClass array
    if (!Array.isArray(subjectTeacherOfClass)) subjectTeacherOfClass = [];

    // prevent duplicate class assignment in the incoming array
    const classIdsInPairs = subjectTeacherOfClass.map((p) => String(p.classId));
    const dupClass = classIdsInPairs.find((id, i) => classIdsInPairs.indexOf(id) !== i);
    if (dupClass) {
      return res.status(400).json({ message: "Cannot assign multiple subjects for the same class" });
    }

    // validate each pair
    const validatedPairs = [];
    for (const pair of subjectTeacherOfClass) {
      const { classId: cId, subjectId: sId } = pair;
      if (!cId || !sId) {
        return res.status(400).json({ message: "Each subjectTeacherOfClass must include classId and subjectId" });
      }

      const classExist = await Class.findById(cId);
      if (!classExist) return res.status(400).json({ message: `Invalid classId ${cId}` });

      const subjectExist = await Subject.findById(sId);
      if (!subjectExist) return res.status(400).json({ message: `Invalid subjectId ${sId}` });

      const subjectInClass = classExist.ClassRoomSubjectPlan
        .map(String)
        .includes(String(sId));
      if (!subjectInClass) {
        return res.status(400).json({ message: `Subject ${sId} is not part of class ${classExist.Class} subject plan` });
      }

      // class teacher will not allow to assign subject for that classes 
      if (classId && String(classId) === String(cId)) {
        return res.status(400).json({ message: "A teacher cannot be subject-teacher of his/her own classTeacherOf class" });
      }

      validatedPairs.push({ classId: classExist._id, subjectId: subjectExist._id });
    }

    // Create and save
    const newTeacher = new Teacher({
      ...rest,
      classTeacherOf: classId || null,
      subjectTeacherOfClass: validatedPairs
    });

    // check existing by email
    const teacherExist = await Teacher.findOne({ email: newTeacher.email });
    if (teacherExist) {
      return res.status(400).json({ message: "Teacher already exists." });
    }

    await newTeacher.save();

    res.status(200).json({ message: "Teacher created successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET ALL TEACHERS
export const getAllTeachers = async (req, res) => {
  try {
    const teacherData = await Teacher.find()
      .populate("classTeacherOf", "Class")
      .populate("subjectTeacherOfClass.classId", "Class")
      .populate("subjectTeacherOfClass.subjectId", "subjectName subjectCode");

    if (!teacherData || teacherData.length === 0) {
      return res.status(404).json({ message: "Teacher data not found." });
    }
    res.status(200).json(teacherData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET TEACHER BY ID
export const getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;
    const teacherExist = await Teacher.findById(id)
      .populate("classTeacherOf", "Class")
      .populate("subjectTeacherOfClass.classId", "Class")
      .populate("subjectTeacherOfClass.subjectId", "subjectName subjectCode");

    if (!teacherExist) return res.status(404).json({ message: "Teacher not found." });
    res.status(200).json(teacherExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const teacherExist = await Teacher.findById(id);
    if (!teacherExist) return res.status(404).json({ message: "Teacher not found." });

    const { classTeacherOf, subjects, subjectTeacherOfClass = [], ...rest } = req.body;
    const updates = { ...rest };

    // validate classTeacherOf
    if (classTeacherOf) {
      const classExist = await Class.findById(classTeacherOf);
      if (!classExist) return res.status(400).json({ message: "Invalid classTeacherOf" });
      updates.classTeacherOf = classExist._id;
    } else {
      updates.classTeacherOf = null;
    }

    // NEW: validate subjectTeacherOfClass in update
    if (!Array.isArray(subjectTeacherOfClass)) return res.status(400).json({ message: "subjectTeacherOfClass must be an array" });

    // prevent duplicate class in pairs
    const classIdsInPairs = subjectTeacherOfClass.map((p) => String(p.classId));
    const dupClass = classIdsInPairs.find((id, i) => classIdsInPairs.indexOf(id) !== i);
    if (dupClass) {
      return res.status(400).json({ message: "Cannot assign multiple subjects for the same class" });
    }

    // validate each pair
    const validatedPairs = [];
    for (const pair of subjectTeacherOfClass) {
      const { classId: cId, subjectId: sId } = pair;
      if (!cId || !sId) return res.status(400).json({ message: "Each subjectTeacherOfClass must include classId and subjectId" });

      const classDoc = await Class.findById(cId);
      if (!classDoc) return res.status(400).json({ message: `Invalid classId ${cId}` });

      const subjectDoc = await Subject.findById(sId);
      if (!subjectDoc) return res.status(400).json({ message: `Invalid subjectId ${sId}` });

      // ensure subject belongs to class subject plan
      const subjectInClass = classDoc.ClassRoomSubjectPlan.map(String).includes(String(sId));
      if (!subjectInClass) {
        return res.status(400).json({ message: `Subject ${sId} is not part of class ${classDoc.Class} subject plan` });
      }

      // disallow assigning subject for teacher's own classTeacherOf
      if (updates.classTeacherOf && String(updates.classTeacherOf) === String(cId)) {
        return res.status(400).json({ message: "A teacher cannot be subject-teacher of his/her own classTeacherOf class" });
      }
      // Also if teacher already classTeacherOf (old) and update sets null -- we already set updates.classTeacherOf above.

      validatedPairs.push({ classId: classDoc._id, subjectId: subjectDoc._id });
    }

    updates.subjectTeacherOfClass = validatedPairs;

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updates, { new: true })
      .populate("classTeacherOf", "Class")
      .populate("subjectTeacherOfClass.classId", "Class")
      .populate("subjectTeacherOfClass.subjectId", "subjectName subjectCode");

    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


//delete the teacher information
export const deleteTeacher = async (req, res)=> {
    try{

        const id = req.params.id;
        const teacherExist = await Teacher.findById(id);
        if (!teacherExist) {
            return res.status(404).json({ mesage: "teacher not found ." });

        }

        await Teacher.findByIdAndDelete(id);
        res.status(200).json({ message: "Teacher deleted successfully ."})

    }catch (error){
        res.status(500).json({ errorMessage: error.message});

    }
};

///get absent teachers

export const getAbsetTeachers = async (req, res) => {
    try {
      const absentTeachers = await Teacher.find({ isPresent: false })
    .populate("subjects", "subjectCode subjectName");


        if (!absentTeachers || absentTeachers.length === 0) {
            return res.status(400).json({ message: 'No Absent teacher found '});

        }
        res.status(200).json(absentTeachers);

    } catch (error) {
        res.status(500).json({ errorMessage: error.mesage });
    }
}

