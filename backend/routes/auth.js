import register, { getPatientById, updatePatient, deletePatient, createAppointment } from "../controllers/patientControllers.js";
import express from 'express';
import { signup, login } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import Patient from '../models/Patient.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/patient', auth, register);
router.get('/patient', auth, async (req, res) => {
  try {
    const patient = await Patient.find();
    return res.status(200).json({ success: true, patient });
  } catch (err) {
    console.error('Error from getting patient ', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/patient/:id', auth, getPatientById);
router.put('/patient/:id', auth, updatePatient);
router.delete('/patient/:id', auth, deletePatient);
router.post('/appointment', auth, createAppointment);

export default router;

