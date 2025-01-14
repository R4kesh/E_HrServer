import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import { syncPatientTable } from './models/patient.js';
import patientRoutes from './routes/patientRoutes.js'
import path from "path";
import { fileURLToPath } from 'url';
import { syncVitalsTable } from './models/vitals.js';
import { syncInceptionTable } from './models/inception.js';

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(cors({origin: 'http://localhost:5173'}));          
app.use(express.json());
app.use('/api/patient', patientRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 3000;

app.listen(port,async () => {
  console.log(`Server running on port ${port}`);
  try {
    syncPatientTable()
    syncVitalsTable()
    syncInceptionTable()
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
});
