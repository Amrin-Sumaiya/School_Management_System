
import Student from "../userModel.js"


export const create = async(req,res)=>{

    
    
    try{
        const newStudent = new Student(req.body);
        const { email } = newStudent;
       // const data=await Student.find({});
       // console.log(data)

         const studentExist = await Student.findOne({ email });
         if (studentExist) {
             return res.status(400).json({ message: "Student already exist."})
         }

        const savedData = await newStudent.save();
       //res.status(200).json(savedData);
       res.status(200).json({message: "User created succefully."});


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
        res.status(200).json(updatedData)
       


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
    res.status(200).json({ message: "User deleted successfully" })

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }

 }
