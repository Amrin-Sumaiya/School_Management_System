import ExamInfo from "../MODEL/ExamModel.js";

export const create = async(req, res) =>{
    try {

        const newExam = new ExamInfo(req.body);
        const {classLevel, examDate} = newExam;

        const examExist = await ExamInfo.findOne({classLevel, examDate})
        if(examExist){
            return res.status(400).json({ message: "An exam with this class and date already exists."})
        }

        const savedData = await newExam.save();
        res.status(200).json(savedData);
    } catch (error){
        res.status(500).json({ errorMessage: error.message })

    }
}

//get All exam's database 
export const getAllExams = async(req, res) =>{
    try{
        const examData = await ExamInfo.find();
        if (!examData || examData.length === 0 ){
            return res.status(404).json({ message: "Exam Data Not Found. "})
        }
        res.status(200).json(examData);

    }catch (error){
        res.status(500).json({ errorMessage: error.message })
    }
}


//get Exam Data with specific data 

export const  getExamDataById = async(req, res) =>{
    try{
        const id = req.params.id;
        const examExist = await ExamInfo.findById(id);
        if (!examExist){
            return res.status(404).json({ message: "Exam Not Found"});

        }
        res.status(200).json(examExist)

    } catch (error){
        res.status(500).json({ errorMessage: error.message });
    }

}

//Update Exam Info Datas 

export const updateExamData = async (req, res) =>{
    try{
        const id = req.params.id;
        const examExist = await ExamInfo.findById(id);
        if (!examExist){
            return res.status(404).json({ message: "Exam Not Found"});

        }
        const UpdateData= await ExamInfo.findByIdAndUpdate(id, req.body, {
            new:true
        })
            return res.status(400).json({ message: "Update information successfully."})
      

    } catch (error){
        res.status(500).json({ errorMessage: error.message });
    }
}


//delete Exam Data 

export const deleteExamData = async (req, res) =>{
    try{
        const id = req.params.id;
        const examExist = await ExamInfo.findById(id);
        if (!examExist){
            return res.status(404).json({ message: "Exam Not Found"});

        }
        await ExamInfo. findByIdAndDelete(id);
        res.status(200).json({ messaqge: "Exam Data Deleted Successfully "})

    } catch (error){
        res.status(500).json({ errorMessage: error.message })
    }
}


