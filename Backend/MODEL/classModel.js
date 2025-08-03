import mongoose from "mongoose"
const classSchema = new mongoose.Schema({
     Class: {
        type: String,
        required: true
     },

     RoomNo: {
        type: String,
        required: true
     }
})

export default mongoose.model("Classes", classSchema)