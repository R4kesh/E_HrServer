import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Patient from './patient.js'; // Import the Patient model for association

const Inception = db.define('Inception', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically incremented ID for inception entries
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id', // Reference to the Patient table
    },
  },
 

  inceptionfeilds: {
    type: DataTypes.JSON, // Stores prescribed medications as an array or object
    allowNull: true, // Optional field
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

// Establish association between Inception and Patient
Patient.hasMany(Inception, {
  foreignKey: 'patientId',
  onDelete: 'CASCADE',
});
Inception.belongsTo(Patient, {
  foreignKey: 'patientId',
});

// Sync the Inception table with the database
export const syncInceptionTable = async () => {
  try {
    await Inception.sync();
    console.log('Inception table created or exists already');
  } catch (error) {
    console.error('Error creating inception table:', error);
  }
};

syncInceptionTable();

export default Inception;
