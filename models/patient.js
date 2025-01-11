import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Patient = db.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Automatically incremented ID for content
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,  // DATEONLY ensures only the date (without time)
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aptSuite: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field
    },
    notificationMethod: {
        type: DataTypes.ENUM('Email', 'Text'),
        allowNull: true,
    },
    visitType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    insuranceCarrier: {
        type: DataTypes.STRING,
        allowNull: true,  // Required field
    },
    insurancePlanName: {
        type: DataTypes.STRING,
        allowNull: true,  // Required field
    },
    pharmacyDetails: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field
    },
    pharmacyName: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field
    },
    lastVisit: {
        type: DataTypes.DATEONLY,  // DATEONLY ensures only the date (without time)
        allowNull: true,  // Required field
    },
    patientImage: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field for image path
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
});

// Sync the table with the database
export const syncPatientTable = async () => {
    try {
        await Patient.sync();
        console.log('Patient table created or exists already');
    } catch (error) {
        console.error('Error creating patient table:', error);
    }
};

syncPatientTable();

export default Patient;
