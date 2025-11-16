import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true},
  savedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
  status: {  type: String,
    enum: ["healed", "sick", "diagnosis", "in_treatment"], 
    default: "healed" },
    familyname: { type: String, required: true },
    gender: { type: String, required: true},
    medicalcondition: { type: String, required:true},
},{timestamps:true});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
