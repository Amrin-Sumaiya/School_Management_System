import Teacher from "../MODEL/TeacherModel.js";
import Subject from "../MODEL/SubjectModel.js";


export const create = async(req, res) => {
  try {
    let { subjectCode, ...rest } = req.body;

    // find subject by subjectCode string and get _id
    const subject = await Subject.findOne({ subjectCode });
    if (!subject) {
      return res.status(400).json({ message: "Invalid subjectCode" });
    }

    const newTeacher = new Teacher({
      ...rest,
      subjectCode: subject._id, // save objecct 
      classTeacherOf: rest.classTeacherOf || null, // optional
    });

    const teacherExist = await Teacher.findOne({ email: newTeacher.email });
    if (teacherExist) {
      return res.status(400).json({ message: "Teacher already exists." });
    }

    const savedData = await newTeacher.save();
    const populatedTeacher = await savedData.populate("subjectCode", "subjectCode subjectName");

    res.status(201).json(populatedTeacher);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}
 //get all teacher list 
export const getAllTeachers = async(req, res)=>{
    try{

        const teacherData = await Teacher.find()
         .populate("subjectCode", "subjectCode subjectName");

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
        .populate("subjectCode", "subjectCode subjectName");

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
            return res.status(404).json({ mesage: "teacher not found ." });

        }

        const updatedData = await Teacher.findByIdAndUpdate(id, req.body, {
            new:true
        })
        .populate("subjectCode", "subjectCode subjectName");
        res.status(200).json(updatedData)

    }catch (error){
        res.status(500).json({ errorMessage: error.mesage})

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
        .populate("subjectCode", "subjectCode subjectName"); 

        if (!absentTeachers || absentTeachers.length === 0) {
            return res.status(400).json({ message: 'No Absent teacher found '});

        }
        res.status(200).json(absentTeachers);

    } catch (error) {
        res.status(500).json({ errorMessage: error.mesage });
    }
}