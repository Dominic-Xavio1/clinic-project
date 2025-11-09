import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';

const register = async (req, res) => {
  let { fullname, status, age, gender, medicalcondition, familyname } = req.body;
  if (!fullname || !status || !age || !medicalcondition || !familyname || !gender) {
    return res.status(400).json({
      success: false, 
      message: 'Please enter all required fields'
    });
  }

  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    let name = fullname.replace(/\s+/g, '').toLowerCase();
    let patient = await Patient.findOne({ name });
    if (patient) {
      return res.status(400).json({
        success: false, 
        message: `Patient with name ${fullname} already exists!`
      });
    }

    gender = gender.toLowerCase();
    patient = new Patient({ 
      name,
      age: Number(age),
      status,
      savedBy: userId,
      medicalcondition,
      familyname,
      gender
    });

    await patient.save();
    
    res.status(201).json({
      success: true,
      message: 'Patient registered successfully!'
    });
  } catch (err) {
    console.error('Server error from register patient:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors).map(e => e.message).join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while registering patient'
    });
  }
};
export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    return res.json({ success: true, patient });
  } catch (err) {
    console.error('Error from getting patient by id', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    console.log("updates data ",updates)
    if (updates.fullname) {
      updates.name = updates.fullname.replace(/\s+/g, '').toLowerCase();
      delete updates.fullname;
    }
    if (updates.age) updates.age = Number(updates.age);

    const patient = await Patient.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    return res.json({ success: true, patient, message: 'Patient updated' });
  } catch (err) {
    console.error('Error updating patient', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const deletePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    return res.json({ success: true, message: 'Patient deleted' });
  } catch (err) {
    console.error('Error deleting patient', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const createAppointment = async (req, res) => {
  try {
    const { patientId, date, notes } = req.body;
    const userId = req.userId;
    if (!patientId || !date) return res.status(400).json({ success: false, message: 'patientId and date are required' });
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    const appt = new Appointment({ patient: patientId, date: new Date(date), notes, createdBy: userId });
    await appt.save();

    return res.status(201).json({ success: true, appointment: appt });
  } catch (err) {
    console.error('Error creating appointment', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export default register;