import Teacher from "../Teacher_Model/TeacherModel.js"


export const create = async(req, res) => {
    try{

        const newTeacher = new Teacher(req.body)
        const {email} = newTeacher;

        const teacherExist = await Teacher.findOne({email})
        if(teacherExist){
        return res.status(400).json({message : "Teacher already exists."})
        }

        const savedData = await newTeacher.save();
        res.status(200).json(savedData);


    }catch (error){

        res.status(500).json({errorMessage:error.message})
    }
}

export const getAllTeachers = async(req, res)=>{
    try{

        const teacherData = await Teacher.find();
        if(!teacherData || teacherData.length === 0){
            return res.status(404).json({ message: "Teacher data not found."})
        }
        res.status(200).json(teacherData)


    }catch (error){
        res.status(500).json({ errorMessage: error.message});

    }
}

///get users with specific id

export const getTeacherById = async (req, res)=> {
    try{
        const id = req.params.id;
        const teacherExist = await Teacher.findById(id);
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
        res.status(200).json({ message: "User deleted successfully ."})

    }catch (error){
        res.status(500).json({ errorMessage: error.mesage});

    }
};