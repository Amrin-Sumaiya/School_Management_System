import ExamInfo from "../MODEL/ExamModel.js";

export const create = async(req, res) =>{
    try {

        const newExam = new ExamInfo(req.body);
        const {examType, examDate} = newExam;

        const examExist = await ExamInfo.findOne({examType, examDate})
        if(examExist){
            return res.status(400).json({ message: "Exam with same type and date already exists."})
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
        const UpdatedData= await ExamInfo.findByIdAndUpdate(id, req.body, {
            new:true
        })
          return res.status(200).json({ message: "Updated Exam data successfully.", UpdatedData })

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
        res.status(200).json({ message: "Exam Data Deleted Successfully "})

    } catch (error){
        res.status(500).json({ errorMessage: error.message })
    }
}


