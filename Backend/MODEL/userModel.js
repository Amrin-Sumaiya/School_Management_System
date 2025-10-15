import mongoose from "mongoose"

const All_studentsSchema = new mongoose.Schema({

    studentId: { 
      type: String,    
      required: true },

    name:{ 
       type:String,
       required : true 
      },
    class:{
       type: mongoose.Schema.Types.ObjectId, //reference by object ID
       ref: "Classes",   //model name as string 
        required : true 
      },
    age:{ type:Number, required : true  },
    sex:{ type:String, required : true },
    email:{  type:String,  required : true },
    
  //Additional Feild
   religion: {type: String,  required : true },
   caste: {type: String,  required : true  },
   bloodGroup: {type: String,  required : true  },
   dob: { type: String,  required : true  },
   address: { type: String,  required : true },
   

   //Grudian Infromation
   fatherName: { type: String, required: true },
   motherName: { type: String, required: true },
   gurdianContact: {type: String, required: true },
   gurdianProffesion: { type: String, required: true },

   isPresent: {type: Boolean, default: true}, ///absent students dashboard pannel
 
   
//admission year chartbar feild
admissionYear: { 
  type: Number, 
  required: true,
  default: new Date().getFullYear() 
}

},

{ collection: "students" } );

All_studentsSchema.index({ studentId: 1, class: 1 }, { unique: true });
export default mongoose.model("student", All_studentsSchema)
