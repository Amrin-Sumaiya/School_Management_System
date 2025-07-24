import mongoose from "mongoose"


const All_studentsSchema = new mongoose.Schema({

    studentId: { type: String, required: true },
    name:{  type:String, required : true },
    class:{ type:Number, required : true },
    age:{ type:Number, required : true  },
    version:{  type:String,  required : true },
    sex:{ type:String, required : true },
    email:{  type:String,  required : true },
    
  //Additional Feild
   religion: {type: String},
   caste: {type: String },
   bloodGroup: {type: String },
   dob: { type: String },
   address: { type: String},
   

   //Grudian Infromation
   fatherName: { type: String, required: true },
   motherName: { type: String, required: true },
   gurdianContact: {type: String, required: true },
   gurdianProffesion: { type: String, required: true },
   

},
{ collection: "students" } );

All_studentsSchema.index({ studentId: 1, class: 1 }, { unique: true });
export default mongoose.model("student", All_studentsSchema)
