import Teacher from "../MODEL/TeacherModel.js";
import Subject from "../MODEL/SubjectModel.js";
import Class from "../MODEL/classModel.js";


//create teacher
export const create = async(req, res) => {
  try {
    let { subjects, classTeacherOf, ...rest } = req.body;
 //valid subjects array of subjects code of IDs
    if (!Array.isArray(subjects) || subjects.length ===0) {
        return res.status(400).json({ message: "At least one subject required "});
    }
    //find subject by subject code or _id
    const subjectsDocs = await Subject.find({
        $or: [
            { subjectCode: { $in: subjects } },
            { _id: {$in: subjects } }
        ]
    });

    if (subjectsDocs.length === 0) {
        return res.status(400).json({ message: "Invalid subjects provided"});

    }

    //valid classTeacherof provided 
    let classId = null;
    if (classTeacherOf) {
        const classExist = await Class.findById(classTeacherOf);
        if (!classExist) {
            return res.status(400).json({ message: "Invalid classTeacherOf " });
        }
        classId = classExist._id; 

        } 

    const newTeacher = new Teacher({
      ...rest,
        subjects: subjectsDocs.map((sub) => sub._id), //array of subject IDs
      classTeacherOf: classId || null, // optional
    });

    const teacherExist = await Teacher.findOne({ email: newTeacher.email });
    if (teacherExist) {
      return res.status(400).json({ message: "Teacher already exists." });
    }
   await newTeacher.save();
   res.status(200).json({ message: "Teacher created successfully"}); //teacher created successfully 
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}


 //get all teacher list 
export const getAllTeachers = async(req, res)=>{
    try{

        const teacherData = await Teacher.find()
          .populate("subjects", "subjectCode subjectName")  //for subjects feild
         .populate("classTeacherOf", "Class"); //for the class feild


        if(!teacherData || teacherData.length === 0){
            return res.status(404).json({ message: "Teacher data not found."})
        }
        res.status(200).json(teacherData)

    }catch (error){
        res.status(500).json({ errorMessage: error.message});

    }
}

///get teacher with specific id

export const getTeacherById = async (req, res)=> {
    try{
        const id = req.params.id;
        const teacherExist = await Teacher.findById(id)
        .populate("subjects", "subjectCode subjectName")
        .populate("classTeacherOf", "Class"); //for the class feild

        if(!teacherExist) {
            return res.status(404).json({ message: "Teacher not found."})
        }
        res.status(200).json(teacherExist)


    }catch (error){
        res.status(500).json({ errorMessage: error.message});

    }
}

//update the teacher information
export const update = async (req, res)=> {
    try{

        const id = req.params.id;
        const teacherExist = await Teacher.findById(id);
        if (!teacherExist) {
            return res.status(404).json({ mesage: "Teacher not found ." });

        }
        const { classTeacherOf, subjects, ...rest } = req.body;
        let updates = { ...rest };
        
        if (subjects) {
            const subjectsDocs = await Subject.find({
                $or: [
                    { subjectCode: { $in: subjects } },
                    { _id: { $in: subjects } }
                ]
            });
            if (subjectsDocs.length === 0) {
                return res.status(400).json({ message: "Invalid subjects provided" });
            }
            updates.subjects = subjectsDocs.map((sub) => sub._id);
        }

    // Validate classTeacher provided 
    if (classTeacherOf) {
        const classExist = await Class.findById(classTeacherOf);
        if (!classExist) {
            return res.status(400).json({ message: "Invalid classTeacherOf " });
        }
        updates.classTeacherOf = classExist._id;
    } else {
        updates.classTeacherOf = null; // if not provided, set to null
    }



    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updates, { new: true })
    .populate("subjects", "subjectCode subjectName")
    .populate("classTeacherOf", "Class");

    res.status(200).json(updatedTeacher);
    }catch (error){
        res.status(500).json({ errorMessage: error.message });
    }

}

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