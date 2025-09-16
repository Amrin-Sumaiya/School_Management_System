import Result from "../MODEL/ResultModel.js"

export const create = async (req, res) =>{ 
    try{ 
    const newResult = new Result(req.body);
    const {examId, studentId, subjectCode } = newResult;

    const resultExist = await Result.findOne({examId, studentId, subjectCode });
    if (resultExist){
        return res.status(400).json({ message: "Result Already Exist"});

    }
    const savedData = await newResult.save()
    res.status(200).json(savedData)
} catch (error){
    res.status(500).json({ errorMessage: error.message })
} 

} 
       
//get All Exam Data from the database 

export const getAllResultsData = async (req, res) =>{
    try{  

        const resultsData = await Result.find();
        if(!resultsData || resultsData.length === 0){
            return res.status(404).json({ message: "Result Data not Found "})
        }

        res.status(200).json(resultsData)

    }catch (error){
        res.status(500).json({ errorMessage: error.message });
    }
}

//get Result With specific id wise 

export const getResultById = async(req, res) =>{
    try{

        const id = req.params.id;
        const resultExist = await Result.findById(id);
       
        if(!resultExist){
            return res.status(404).json({ message: "Result not Found "})
        }

        res.status(200).json(resultExist)

    } catch(error){
        res.status(500).json({ errorMessage: error.message })
    }
}

// Update Result Data 

export const updateResultData = async (req, res) =>{
    try {

        const id = req.params.id;
        const resultExist = await Result.findById(id);
       
        if(!resultExist){
            return res.status(404).json({ message: "Result not Found "})
        }

       const updatedData = await Result.findByIdAndUpdate(id, req.body, {
            new:true
        });

        res.status(200).json({ message: "Result Updated Successfully "})

    } catch (error){
        res.status(500)({ errorMessage: error.message })
    }
}

//Delete specific Result Data 

export const DeleteResultData = async ( req, res) =>{
    try{

        const id = req.params.id;
        const resultExist = await Result.findById(id);
       
        if(!resultExist){
            return res.status(404).json({ message: "Result not Found "})
        }

        await Result.findByIdAndDelete(id);
        res.status(200).json({ message: "Result Deleted Successfully "})

    } catch(error){
        res.status(500)({ errorMessage: error.message})
    }
}

