import express, {Request, Response }from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from "./config/dbconnection";
import authRoutes from "./routes/auth.route"



dotenv.config(); //loads env first
const app = express();

connectDB();// database connection

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

//routes
app.use('/api/v1/auth', authRoutes);

export default app;