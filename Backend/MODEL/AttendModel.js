import mongoose from "mongoose"
//import student from "./userModel.js"

const attendenceSchema = new mongoose.Schema({
  studentId: {
    type: String,
     ref: "student",
    required: true,
  },


    date: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        required: true,
    },

    remarks: {
        type: String,
        default: "",
    }
}, { timestamps: true });

export default mongoose.model("Attendance", attendenceSchema)