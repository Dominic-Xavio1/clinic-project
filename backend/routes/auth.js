import register, { getPatientById, updatePatient, deletePatient, createAppointment, createReport, getPatientReports, getAllReports, updatePatientStatus } from "../controllers/patientControllers.js";
import express from 'express';
import { signup, login, registerNurse, listUsers } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import Patient from '../models/Patient.js'
import { requireRole } from "../middleware/roles.js";
import { listDiseases, createDisease, updateDisease, deleteDisease } from "../controllers/diseaseController.js";
import { listMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/nurse', auth, requireRole('doctor'), registerNurse);
router.get('/users', auth, listUsers);

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

// Report routes
router.post('/report', auth, createReport);
router.get('/report', auth, getAllReports);
router.get('/report/:patientId', auth, getPatientReports);

// Patient status update route
router.put('/patient/:id/status', auth, updatePatientStatus);

// Disease awareness routes
router.get('/diseases', auth, listDiseases);
router.post('/diseases', auth, requireRole('doctor', 'nurse'), createDisease);
router.put('/diseases/:id', auth, requireRole('doctor', 'nurse'), updateDisease);
router.delete('/diseases/:id', auth, requireRole('doctor', 'nurse'), deleteDisease);

// Messaging routes    requireRole('receptionist','receptionist') from /messages
router.post('/messages', auth, sendMessage);
router.get('/messages', auth, listMessages);

export default router;

