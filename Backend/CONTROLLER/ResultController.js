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

//Get all failed students by year

export const getFailedStudentsByYear = async (req, res) => {
    try {
let { year } = req.params;

if (!year ) { 
    const currentYear = new Date().getFullYear();
    year = currentYear.toString();
}

console.log("Fetching failed students for year: ", year);

        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${parseInt(year) + 1}-01-01`);

        const failedStudents = await Result.find({
            grade: "F",
            createdAt: { $gte: startDate, $lt: endDate },
        }).populate({
  path: "studentId",
  select: "name studentId gurdianContact class",
  populate: {
    path: "class",
    select: "Class", // field from classModel.js
  },
})

        .populate("subjectId", "subjectName")
        .populate("examId", "examName")
        // .populate("classLevel", "Class");

        if (!failedStudents.length) {
            return res.status(404).json({ message: "No failed studetns found for this year" });
        }
        // console.log("Failed students data: ", failedStudents);
        

const formatted = failedStudents.map((item) => ({
      studentObjectId: item.studentId?._id?.toString() || "N/A", // ✅ keep actual ObjectId
  rollNumber: item.studentId?.studentId || "N/A",  
    name: item.studentId?.name || "N/A",
    class: item.studentId?.class || "N/A",
    gurdianContact: item.studentId?.gurdianContact ||  item.studentId?.guardianContact || "N/A",
    subject: item.subjectId?.subjectName || "N/A",
    exam: item.examId?.examName || "N/A",
}));
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

