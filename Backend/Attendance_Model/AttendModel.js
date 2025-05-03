import mongoose from "mongoose"

const attendenceSchema = new mongoose.Schema({
    student_id: {
        type: String,
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