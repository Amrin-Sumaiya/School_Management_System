import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true, // e.g., "Mathematics"
    },

    subjectCode: {
        type: String,
        required: true,
        unique: true, //  "MATH-05"
    },



    description: {
        type: String,
        default: "", // Optional description
    }
}, { timestamps: true });

export default mongoose.model("Subject", subjectSchema);
