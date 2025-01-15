import express from 'express';
import { addVitals, getAllPatients, getPatient, inceptionDetails, patientDetails, patientSearch } from '../controllers/patientControllers.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

router.post('/patientDetails',upload.array("files",2), patientDetails);
router.get('/patients', getAllPatients);
router.get("/:id",getPatient)
router.post('/vitals/:id',addVitals)
router.post('/inception',inceptionDetails)
router.post('/Patientsearch',patientSearch)
export default router; 
