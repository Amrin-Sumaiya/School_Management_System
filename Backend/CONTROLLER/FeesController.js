import Fees from "../MODEL/Fees.Model.js"

export const create = async(req, res) =>{
    try {
        const newFeesRecord = new Fees(req.body);
        const {month} = newFeesRecord;

        const feesExist = await Fees.findOne({month})
        if(feesExist){
            return res.status(400).json({ message: "Already Payment Done"})

        }

        const savedData = await newFeesRecord.save();
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({ errorMessage:error.message })
    }
}

//get all students, who paymented 
 export const getAllPayments = async(req, res) =>{
    try{
        const feesData = await Fees.find();
        if(!feesData || feesData.length === 0){
            return res.status(404).json({ message: "Data not Found.  "})
        }
        res.status(200).json(feesData)

    }catch (error){
        res.status(500).json({ errorMessage: error.message });
    }
 }

 //get payment monthly record with specific id 

 export const getPaymentById = async(req, res) =>{
    try{
        const id = req.params.id;
        const feesExist = await Fees.findById(id);
        if(!feesExist) {
            return res.status(404).json({ message: "Payment not found ."});

        }
        res.status(200).json(feesExist)

    }catch ( error){
        res.status(500).json({ errorMessage: error.message })

    }
 }


 //Update the payment Data record
 export const update = async (req, res) =>{
    try{

        const id = req.params.id;
        const feesExist = await Fees.findById(id);
        if(!feesExist) {
            return res.status(404).json({ message: "Payment not found ."});

        }

       const UpdatedData= await Fees.findByIdAndUpdate(id, req.body, {
            new:true
        })
        res.status(200).json(UpdatedData)
    }catch ( error){
        res.status(500).json({ errorMessage: error.message });


    }
 }


 //Delete payment record
 export const deleteFeesRecord = async (req, res) => {
    try{
        const id = req.params.id;
        const feesExist = await Fees.findById(id);
        if(!feesExist) {
            return res.status(404).json({ message: "Payment not found ."});

        }
        await Fees.findByIdAndDelete(id);
        res.status(200).json({ messsage: "Payment record deleted successfully . "});

    } catch (error){
        res.status(500).json({ errorMessage: error.message });

    }
 }
