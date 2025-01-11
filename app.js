import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import { syncPatientTable } from './models/patient.js';
import patientRoutes from './routes/patientRoutes.js'


dotenv.config();

const app = express();
app.use(cors({origin: 'http://localhost:5173'}));          
app.use(express.json());
app.use('/api/patient', patientRoutes);
const port = process.env.PORT || 3000;

app.listen(port,async () => {
  console.log(`Server running on port ${port}`);
  try {
    syncPatientTable()
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
});
