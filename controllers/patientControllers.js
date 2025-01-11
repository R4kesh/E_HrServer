import Patient from "../models/patient.js";
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
    console.log('123');
    
    try {
      const patients = await Patient.findAll();
      console.log(patients);
      
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      res.status(500).json({ error: "Failed to fetch patients" });
    }
  };