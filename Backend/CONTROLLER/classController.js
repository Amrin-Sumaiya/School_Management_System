import Class from "../MODEL/classModel.js";

export const create = async (req, res) => {
    try {
        const newClass = new Class(req.body); // FIXED: Use 'Class' model
        const { RoomNo } = newClass;

        const classExist = await Class.findOne({ RoomNo });
        if (classExist) {
            return res.status(400).json({ message: "ClassRoom already assigned." });
        }

        const savedData = await newClass.save();
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message }); // FIXED: lowercase 'message'
    }
}


//get All classrom data information
export const getAllClassInfo = async(req, res)=> {
    try {

        const classData = await Class.find();
        if(!classData || classData.length === 0){
            return res.status(404).json({ message: "ClassRoom not FOund"});

        }
        res.status(200).json(classData)

    } catch ( error ){
        res.status(500).json({ errorMessage: error.message });

    }
}

// get specific classrom 

export const getClassroomById = async(req,res) =>{
    try {
        const id = req.params.id;
        const classExist = await Class.findById(id);
        if(!classExist){
            return res.status(404).json({ message: "ClassRoom not FOund"});

        }
        res.status(200).json(classExist)


    } catch (error){
        res.status(500).json({ errorMessage: error.message });
    }
}


//Update Classroom Information 
export const update = async (req, res) =>{
    try{

        const id = req.params.id;
        const classExist = await Class.findById(id);
        if(!classExist){
            return res.status(404).json({ message: "ClassRoom not FOund"});

        }

        const updateData= await Class.findByIdAndUpdate(id, req.body, {
            new:true
        })
        res.status(200).json(updateData)

    } catch(error){
        res.status(500).json({ errorMessage: error.message });
    }
}


//Delete Classroom Information
export const deleteClassInfo = async(req, res) => {
    try {
        const id = req.params.id;
        const classExist = await Class.findById(id);

        if (!classExist) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        await Class.findByIdAndDelete(id);
        res.status(200).json({ message: "Classroom information deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

