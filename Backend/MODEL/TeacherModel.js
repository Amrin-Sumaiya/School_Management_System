import mongoose from "mongoose";
import Subject from "./SubjectModel.js"

const All_TeachersSchema = new mongoose.Schema({

    name : {
        type:String,
        required : true
    },

    email : {
        type: String,
        required : true 
    },
    
subjectCode: {
    type: String,
    required: true,
    ref: Subject, // this must match your model name
},

//optional feilds
  classTeacherOf: {
    type: String,
    required: false, //optional
    default: null,
  },

    sex: {
        type: String,
        required : true
    },
    join_date: {
        type: String,
        required : true
    },
    age: {
        type: Number,
        required : true
    },

    contact : {
        type: Number,
        required : true
    },

    isPresent: { type: Boolean, default: true }


})

export default mongoose.model("Teacher", All_TeachersSchema)

