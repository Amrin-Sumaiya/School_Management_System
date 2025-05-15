import mongoose from "mongoose";
import Exam from "./ExamModel.js"
import student from "./userModel.js"


const resultSchema = new mongoose.Schema({


  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:student,
    required: true,
  },

  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Exam,
    required: true,
  },

  classLevel: {
    type: String,
    required: true,
  },

  
subjectCode: {
    type: String,
    required: true,

},
 

  totalMarks: {
    type: Number,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },

  remarks: {
    type: String,
    default: "",
  }
}, { timestamps: true });

export default mongoose.model("Result", resultSchema);
