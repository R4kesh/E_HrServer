import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';


dotenv.config(); // Load environment variables

const app = express();
app.use(cors({origin: 'http://localhost:5173'}));          
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port,async () => {
  console.log(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
});
