import Attendance from "../MODEL/AttendModel.js"

export const create = async(req, res)=>{
    try {
        const { studentId, date} =req.body;
       
        const attendanceIdExist = await Attendance.findOne({ studentId, date });
        if (attendanceIdExist){
            return res.status(400).json({ message: "Student Attendence already Exists. "});

        }
        const newAttendance = new Attendance(req.body);
        const savedData = await newAttendance.save();
        res.status(200).json(savedData);
        

    } catch (error){
        res.status(500).json({ errorMessage: error.message})

    }
}

// get allstudents attendance record

export const getAllAttendanceRecord = async (req, res) => {
    try{

        const attendanceData = await Attendance.find().populate('studentId');
        if(!attendanceData || attendanceData.length === 0){
            return res.status(404).json({ message: "Attendace Record not found ." })

        }
        res.status(200).json(attendanceData)


    }catch (error){
        res.status(500).json({ errorMessage: error.Message })
    }
}


//Update attendance record 
export const UpdateAttendanceById = async(req,res) =>{
    try{

        const id = req.params.id;
        const attendanceExist = await Attendance.findById(id)
        if (!attendanceExist){
            return res.status(404).json({ message: "Attendace Record Not Found"})

        }
        const updateData = await Attendance.findByIdAndUpdate(id, req.body,{
            new: true  
        })
        res.status(200).json(updateData)
        
        

    } catch ( error) {
        res.status(500).json({ errorMessage: error.Message })
    }
}

//