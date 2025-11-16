import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  diagnosis: { 
    type: String 
  },
  prescription: { 
    type: String 
  },
  recommendations: { 
    type: String 
  },
  consultationDate: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;

