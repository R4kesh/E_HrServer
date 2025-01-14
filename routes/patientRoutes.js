import express from 'express';
import { addVitals, getAllPatients, getPatient, inceptionDetails, patientDetails } from '../controllers/patientControllers.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

router.post('/patientDetails',upload.array("files",2), patientDetails);
router.get('/patients', getAllPatients);
router.get("/:id",getPatient)
router.post('/vitals/:patientId',addVitals)
router.post('/inception',inceptionDetails)
export default router;