
import Student from "../MODEL/userModel.js"
import Classes from "../MODEL/classModel.js"


export const create = async(req,res)=>{
   
    
    try{

        const newStudent = new Student(req.body);
        const { email, gurdianContact, studentId, class: studentClass } = newStudent;
       // const data=await Student.find({});
       // console.log(data)

         const studentExist = await Student.findOne({   $or: [
    { email },
    {gurdianContact},
    { studentId, class: studentClass }
  ] });
     
        if (studentExist){
            return res.status(400).json({
                message: "Student already exists with this email or roll number in this class"

            })
        }

        await newStudent.save();
        res.status(200).json({ message: "Student created successfully"});
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }


}

//get All_Students database 
 export const getAllStudents = async(req, res) =>{
    try{

        const studentsData = await Student.find({}).populate("class");

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
        const studentExist = await Student.findById(id).populate("class");
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
        await Student.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Student updated Successfully" });

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
        const classes = await Classes.find({});
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
    const classId = req.query.class;
    try {
        if (!classId) {
            return res.status(400).json({ message: "Class Parameted is required"})
        }
        const students = await Student.find({ class: classId }).populate("class");

        if (!students || students.length === 0){
            return res.status(404).json({ message: "No student found for this class." })
        }

        res.status(200).json(students);
    }catch (error) {
        res.status(500).json({ errorMessage: error.message});
    }
}

//get all absent student


export const getAbsentStudents = async (req, res) => {
    try {
        const absentStudents = await Student.find({ isPresent: false }).populate("class");

        if ( !absentStudents || absentStudents.length === 0){
            return res.status(404).json({ message: "No absent students found" });
        }

        res.status(200).json(absentStudents)
    }catch (error) {
        res.status(500).json({ errorMessage: error.message})
    }

}


