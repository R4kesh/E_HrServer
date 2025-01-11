import express from 'express';
import { getAllPatients, patientDetails } from '../controllers/patientControllers.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

router.post('/patientDetails',upload.array("files",2), patientDetails);
router.get('/patients', getAllPatients);



export default router; 
