
import Student from "../MODEL/userModel.js"


export const create = async(req,res)=>{

    
    
    try{
        const newStudent = new Student(req.body);
        const { email, gurdianContact, studentId, class: studentClass } = newStudent;
       // const data=await Student.find({});
       // console.log(data)

         const studentExist = await Student.findOne({   $or: [
    { email },
    {gurdianContact},
    { studentId }
  ] });

  
         if (false) {
             return res.status(400).json({ message: "Student already exists with this email or roll number in this class."})
         }

        const savedData = await newStudent.save();
       //res.status(200).json(savedData);
       res.status(200).json({message: "Student created succefully."});


    }catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

//get All_Students database 
 export const getAllStudents = async(req, res) =>{
    try{

        const studentsData = await Student.find();
        if (!studentsData || studentsData.length === 0 ){
            return res.status(404).json({ message: "Student data not found" });
        }
        res.status(200).json(studentsData);

    } catch (error){
        res.status(500).json({ errorMessage: error.message });

    }
 }

 //get Students with specific id

 export const getStudentById = async(req, res) =>{
    try{

        const id = req.params.id;
        const studentExist = await Student.findById(id);
        if (!studentExist){
            return res.status(404).json({ message: "Student not found" });

        }
        res.status(200).json(studentExist)


    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }
 }


 //update Students Information data
 export const update = async ( req, res)=>{
    try{

        const id = req.params.id;
        const studentExist = await Student.findById(id);
        if (!studentExist){
            return res.status(404).json({ message: "Student not found" });

        }
       const updatedData = await Student.findByIdAndUpdate(id, req.body,{
            new:true
        })
        // res.status(200).json(updatedData)
       

     res.status(200).json({ message: "Student Updated Successfully."})
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }
 }

 //Delete specific students data

 export const deleteStudent = async ( req, res) => {
    try{
        const id = req.params.id;
        const studentExist = await Student.findById(id);
        if (!studentExist){
            return res.status(404).json({ message: "Student not found" });

        }
        await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted successfully" })

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }

 }

 // Get all uniqe class levels
 export const getClassLevels = async (req, res) => {
    try {
        const classes = await Student.distinct("class");
        if (!classes || classes.length === 0){
            return res.status(404).json({ message: "No class levels found "});
        }
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
 }

// get student by specific class
export const getClassLevelWithStudents = async (req, res) => {
    const selectedClass = parseInt(req.query.class);
    try {
        if (!selectedClass) {
            return res.status(400).json({ message: "Class Parameted is required"})
        }
        const students = await Student.find({ class: selectedClass });

        if (!students || students.length === 0){
            return res.status(404).json({ message: `No student found for this class ${selectedClass}.` })
        }

        res.status(200).json(students);
    }catch (error) {
        res.status(500).json({ errorMessage: error.message});
    }
}

//get all absent student


export const getAbsentStudents = async (req, res) => {
    try {
        const absentStudents = await Student.find({ status: false });

        if ( !absentStudents || absentStudents.length === 0){
            return res.status(404).json({ message: "No absent students found" });

        }

        res.status(200).json(absentStudents)
    }catch (error) {
        res.status(500).json({ errorMessage: error.message})
    }

}

