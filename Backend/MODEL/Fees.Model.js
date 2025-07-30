import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({

    studentId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    classLevel: {
        type: String,
        required: true
    },

    payment_type: {
        type: String,
        enum: ["Monthly Fee", "Exam Fee", "Picnic Fee", "Admission Fee", "Others"],
        required: true
    },
    month: {
        type: String, // e.g., "April 2025"
        required: function() {
            return this.payment_for === "Monthly Fee";
        }
    },
    amount: {
        type: Number,
        required: true
    },
    due_ammount: {
       
        type: Number,
        required : true
    },
    payment_method: {
        type: String,
        enum: ["Cash"],
        default: "Cash"
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model("Fees", feesSchema);
