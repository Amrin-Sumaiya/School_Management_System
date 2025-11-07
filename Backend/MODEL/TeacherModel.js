import mongoose from "mongoose";



const All_TeachersSchema = new mongoose.Schema({

    name : {
        type:String,
        required : true
    },

    email : {
        type: String,
        required : true 
    },
 

//optional feilds
  classTeacherOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes", //reference to classs model 
    required: false, //optional
    default: null,
  },

  // subject teacher
subjectTeacherOfClass: [
  {
    classId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: "Classes",
        required: true },
    subjectId: 
    { type: mongoose.Schema.Types.ObjectId,
       ref: "Subject", required: true }
  }
],


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

    // teacher details

    university : {
      type: String,
      required: false
    },
    passingYear: {
      type: String,
      required: false
    },
    department: {
      type: String,
      required: false
    },
    experience: {
      type: String,
      required: false
    },

    isPresent: { type: Boolean, default: true }


})

export default mongoose.model("Teacher", All_TeachersSchema)

