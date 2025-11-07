import mongoose from "mongoose";

const examSchema = new mongoose.Schema({


    examDate: {
        type: Date,
        required: true,
    },

    examType: {
        type: String,
        required: true,
        enum: ["Class Test (CT)", "Half Yearly", "Yearly", "Pre-Test", "Test"],
    },

    examMarks: {
        type: Number,
        required: true,
    },


}, { timestamps: true });

export default mongoose.model("Exam", examSchema)