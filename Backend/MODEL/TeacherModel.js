import mongoose from "mongoose";

const All_TeachersSchema = new mongoose.Schema({

    name : {
        type:String,
        required : true
    },

    email : {
        type: String,
        required : true
    },
    department : {
        type: String,
        required : true
    },
    sex: {
        type: String,
        required : true
    },
    join_date: {
        type: String,
        required : true
    },
    age: {
        type: Number,
        required : true
    },

    contact : {
        type: Number,
        required : true
    },


})

export default mongoose.model("Teacher", All_TeachersSchema)

