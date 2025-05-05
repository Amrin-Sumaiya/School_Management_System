import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true, //half yearly, yearly 
    },

    examDate: {
        type: Date,
        required: true,
    },

    examType: {
        type: String,
        required: true, // written, viva, quiz
    },


    examMarks: {
        type: Number,
        required: true,
    },

    classLevel: {
        type: String,
        required: true, // "class 8"
    }

}, { timestamps: true });

export default mongoose.model("Exam", examSchema)