import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import patientRoutes from './routes/auth.js';
import authRoute from "./routes/auth.js"
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/register', patientRoutes);
app.use("/get",patientRoutes);
app.use("/auth",authRoute);


              

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));