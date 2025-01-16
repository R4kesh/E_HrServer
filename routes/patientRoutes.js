import express from 'express';
import { addVitals, getAllPatients, getPatient,inceptionDetails, patientDetails, patientSearch,testType
,listTestes,testCategoryData } from '../controllers/patientControllers.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

router.post('/patientDetails',upload.array("files",2), patientDetails);
router.get('/patients', getAllPatients);
router.get("/getPatient/:id",getPatient)
router.post('/vitals/:id',addVitals)
router.post('/inception',inceptionDetails)
router.post('/Patientsearch',patientSearch)
router.get('/testType',testType)
router.get('/tests/:id',listTestes)
router.get('/testCategoryData/:id',testCategoryData)


export default router; 
