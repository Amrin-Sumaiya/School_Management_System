
//get attendace by class teacher

import Student from '../MODEL/userModel.js'

export const getStudentsByClassAndVersion = async (req, res) =>{
  try{
    const classId = req.params.class; // this is ObjectId of Classes model

    // Find students by class (ObjectId reference)
    const students = await Student.find({ class: classId }).populate("class");

    if(!students.length){
      return res.status(404).json({ message: "No student attendance found for this class"})
    }

    const filtered = students.map(student =>({

id:student?._id,
      studentId: student.studentId,
      name: student.name,
      class: student.class,
      age: student.age,
      sex: student.sex,
      email: student.email,
      religion: student.religion,
      caste: student.caste,
      bloodGroup: student.bloodGroup,
      dob: student.dob,
      address: student.address,
      fatherName: student.fatherName,
      motherName: student.motherName,
      gurdianContact: student.gurdianContact,
      gurdianProffesion: student.gurdianProffesion,
    }))

      res.status(200).json(filtered)
    

  } catch(error){
    res.status(500).json({ errorMessage: error.message });
  }
}

// //get specific studetns details

// export const getAllStudentsForClassTeacher = async (req, res) => {
//   try {
//     const classId = req.params.class; //teacher's class id

//     //get the same students as attendance api
//     const students = await Student.find({ class: classId});

//     if (!students.length) {
//       return res.status(404).json({ message: "No students found for this class"})
//     }
//     res.status(200).json(students); //return full students
//   } catch ( error){
//     res.status(500).json({ errorMessage: error.message });
//   }
// }
