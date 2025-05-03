import mongoose from "mongoose"
const classSchema = new mongoose.Schema({
     Class: {
        type: String,
        required: true
     },

     RoomNo: {
        type: Number,
        required: true
     }
})

export default mongoose.model("Classes", classSchema)