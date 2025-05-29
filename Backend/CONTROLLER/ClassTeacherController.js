
// import Student from '../MODEL/userModel.js'

// export const create = async (req, res) => {
//   try {
     
//     const { class: classNumRaw, version} = req.body;
//     const classNum = Number(classNumRaw);

//     const classTeacherExist = await Student.find({
//       class: 8,
    
//     });

//     if (classTeacherExist) {
//       return res.status(400).json({ message: "Class Teacher Already Took Attendance"});
//     }

//     const students = await Student.find({ class: classNum, version })

//     if (!students.length){
//       return res.status(400).json({ message: "No students found for this class/version"})
//     }

//     const newClassTeacher = new ClassTeacher(req.body);
//     const savedData = await newClassTeacher.save();
//     res.status(200).json({
//       message: "Attendance started",
//       classInfo: savedData,
//       students,
//     });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };






//get attendace by class teacher



import Student from '../MODEL/userModel.js'

export const getStudentsByClassAndVersion = async (req, res) =>{
  try{
    const classNum = parseInt(req.params.class); //get classNumber from URL 
    const version = req.params.version;  

     console.log(" Searching for class:", classNum);
     console.log(" Searching for version:", version);


    const students = await Student.find({ class: classNum, version: { $regex: new RegExp(`^${version}$`, "i") } });
    

    if(!students.length){
      return res.status(404).json({ message: "No student attendance found for this class"})
    }

    const filtered = students.map(student =>({

    
id:student?._id,
      studentId: student.studentId,
      name: student.name,
    }))




      res.status(200).json(filtered)
    

  } catch(error){
    res.status(500).json({ errorMessage: error.message });
  }
}
