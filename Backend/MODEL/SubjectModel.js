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

    classLevel: {
        type: String,
        required: true, //
    },



    description: {
        type: String,
        default: "", // Optional description
    }
}, { timestamps: true });

export default mongoose.model("Subject", subjectSchema);
