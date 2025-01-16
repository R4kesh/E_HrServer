import Inception from "../models/inception.js";
import Patient from "../models/patient.js";
import Vitals from '../models/vitals.js'
import { Op } from 'sequelize';

export const patientDetails=async(req,res)=>{
    try {
        // Log request body and files for debugging
        

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
   

    const { id } = req.params;
    
    
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
  
  
  const { id } = req.params;
  const patientId=id
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
 
  
  const { patientId, inceptionFields } = req.body;


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

// export const patientSearch = async (req, res) => {
//   console.log('12345');
  
//   const { query } = req.query;  // Access 'query' from req.query
//   console.log('query', query);
  
//   try {
//     const patients = await Patient.findAll({
//       where: {
//         [Op.or]: [
//           { firstName: { [Op.like]: `%${query}%` } },
//           { lastName: { [Op.like]: `%${query}%` } },
//         ],
//       },
//       attributes: ['id', 'firstName', 'lastName', 'dateOfBirth'], // Return relevant fields
//     });

//     if (patients.length === 0) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     console.log('patients', patients);
//     res.json(patients);
//   } catch (error) {
//     console.error('Error during search:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



export const patientSearch = async (req, res) => {
  console.log('Received search request');
  
  const { query } = req.body;  // Extract the 'query' from the request body
  console.log('Search query:', query);  // Log the query received

  try {
    // Search for patients matching firstName or lastName
    const patients = await Patient.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
        ],
      },
      attributes: ['id', 'firstName', 'lastName', 'dateOfBirth'], // Fields to return
    });

    // If no patients are found, return a 404 status
    if (patients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    console.log('Found patients:', patients);  // Log the list of found patients
    res.json(patients);  // Return the patient data to the frontend
  } catch (error) {
    console.error('Error during patient search:', error);
    res.status(500).json({ message: 'Server error' });
  }
};