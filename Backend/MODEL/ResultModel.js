import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({


  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },


  classLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
  },

  
subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,

},

CT1: {
    type: Number,
    default: 0,
  },
  CT2: {
    type: Number,
    default: 0,
  },
  HalfYearly: {
    type: Number,
    default: 0,
  },
  Yearly: {
    type: Number,
    default: 0,
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

resultSchema.index({ studentId: 1, classLevel: 1, subjectId: 1 }, { unique: true });

export default mongoose.model("Result", resultSchema);
