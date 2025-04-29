import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({

    student_id: {
        type: String,
        required: true
    },

    payment_for: {
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
    paid_amount: {
        type: Number,
        required: true
    },
    due_amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        enum: ["Paid", "Partial", "Unpaid"],
        default: "Unpaid"
    },
    payment_method: {
        type: String,
        enum: ["Cash", "Card", "Online", "Bank Transfer"],
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
