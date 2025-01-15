import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Patient from './patient.js'; // Import the Patient model for association

const Vitals = db.define('Vitals', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically incremented ID for vitals
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id',
    },
  },
  weight: {
    type: DataTypes.FLOAT, // Storing weight as a float
    allowNull: false,
  },
  previousWeight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weightChange: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bmi: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pulse: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  respirationRate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  oxygenSaturation: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  oxygenSupplement: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  systolicBP: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diastolicBP: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bpLocation: {
    type: DataTypes.ENUM('Left Arm', 'Right Arm'),
    allowNull: false,
  },
  additionalFields: {
    type: DataTypes.JSON, // Storing additional fields as JSON
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

// Establish association between Vitals and Patient
Patient.hasMany(Vitals, {
  foreignKey: 'patientId',
  onDelete: 'CASCADE',
});
Vitals.belongsTo(Patient, {
  foreignKey: 'patientId',
});

// Sync the Vitals table with the database
export const syncVitalsTable = async () => {
  try {
    await Vitals.sync();
    console.log('Vitals table created or exists already');
  } catch (error) {
    console.error('Error creating vitals table:', error);
  }
};

syncVitalsTable();

export default Vitals;
