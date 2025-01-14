import Inception from "../models/inception.js";
import Patient from "../models/patient.js";
import Vitals from '../models/vitals.js'
export const patientDetails=async(req,res)=>{
    try {
        // Log request body and files for debugging
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);

        // Destructure the fields from the request body
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            address,
            aptSuite,
            city,
            state,
            zipCode,
            emailId,
            phoneNumber,
            notificationMethod,
            visitType,
            insuranceCarrier,
            insurancePlanName,
            pharmacyDetails,
            pharmacyName,
            lastVisit
        } = req.body;

        // Handle file upload - Assuming only one file for patientImage
        let patientImage = null;
        if (req.files && req.files.length > 0) {
            patientImage = `/uploads/${req.files[0].filename}`;  // Adjust to match your storage path
        }

        // Create a new patient record
        const patient = await Patient.create({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            address,
            aptSuite,
            city,
            state,
            zipCode,
            emailId,
            phoneNumber,
            notificationMethod,
            visitType,
            insuranceCarrier,
            insurancePlanName,
            pharmacyDetails,
            pharmacyName,
            lastVisit,
            patientImage
        });

        res.status(201).json({
            message: 'Patient data saved successfully!',
            patient
        });
    } catch (error) {
        console.error('Error saving patient details:', error);
        res.status(500).json({ message: 'Failed to save patient details' });
    }
}

export const getAllPatients = async (req, res) => {
    
    try {
      const patients = await Patient.findAll();
      
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      res.status(500).json({ error: "Failed to fetch patients" });
    }
  };

  export const getPatient=async (req, res) => {
    console.log('123');

    const { id } = req.params;
    console.log('id',id);
    
  try {
    const patient = await Patient.findByPk(id); // Find patient by primary key
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Error fetching patient" });
  }
}


export const addVitals=async (req, res) => {
  console.log('123');
  
  const { patientId } = req.params;
  const {
    weight,
    previousWeight,
    weightChange,
    height,
    bmi,
    pulse,
    temperature,
    respirationRate,
    oxygenSaturation,
    oxygenSupplement,
    systolicBP,
    diastolicBP,
    bpLocation,
    additionalFields,
  } = req.body;

  try {
    // Save the vitals data
    const vitals = await Vitals.create({
      patientId,
      weight,
      previousWeight,
      weightChange,
      height,
      bmi,
      pulse,
      temperature,
      respirationRate,
      oxygenSaturation,
      oxygenSupplement,
      systolicBP,
      diastolicBP,
      bpLocation,
      additionalFields,
    });

    res.status(201).json({ message: 'Vitals saved successfully', vitals });
  } catch (error) {
    console.error('Error saving vitals:', error);
    res.status(500).json({ message: 'Failed to save vitals', error });
  }
};

export const inceptionDetails=async (req, res) => {
  console.log('123');
  
  const { patientId, inceptionFields } = req.body;
console.log('req.body',req.body);

  try {
    // Save inception data to the database
    const newInception = await Inception.create({
      patientId,
      inceptionfeilds: inceptionFields, // Save all fields as JSON
    });

    res.status(201).json({ message: 'Data saved successfully', data: newInception });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save data', error });
  }
};