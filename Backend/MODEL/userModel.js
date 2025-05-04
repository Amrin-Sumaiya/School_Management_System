import mongoose from "mongoose"


const All_studentsSchema = new mongoose.Schema({

    name:{
        type:String,
        required : true
    },
    class:{
        type:Number,
        required : true
    },
    age:{
        type:Number,
        required : true
    },
    version:{
        type:String,
        required : true
    },
    sex:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    


},
{ collection: "students" } )
export default mongoose.model("student", All_studentsSchema)
