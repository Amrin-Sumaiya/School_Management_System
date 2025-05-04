import Subject from "../MODEL/SubjectModel.js"

export const create = async(req, res) =>{
    try{
        const newSubject = new Subject (req.body);
        const {subjectCode} = newSubject;

        const subjectExist = await Subject.findOne({ subjectCode });
        if (subjectExist){
            return res.status(400).json({ message: "Subject Already Exist "});

        } 

        const savedData = await newSubject.save();
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({ errorMessage:error.message })
    }
}

//get All subjects list 

export const getAllSubjects = async (req, res)=>{
    try{

        const subjectData = await Subject.find();
        if (!subjectData || subjectData.length === 0){
            return res.status(404).json({ message: "Subject Data not Found"});

        }
        res.status(200).json(subjectData)

    } catch ( error) {
        res.status(500)({ errorMessage: error.message });
    }
}

//get subject With specific Id Wise 

