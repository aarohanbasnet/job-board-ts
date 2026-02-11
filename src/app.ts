import express, {Request, Response }from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from "./config/dbconnection";
import authRoutes from "./routes/auth.route";
import testRouter from "./routes/testroute";
import jobRouter from "./routes/job.routes";
import applicationRouter from "./routes/application.route"




dotenv.config(); //loads env first
const app = express();

connectDB();// database connection

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use(testRouter);

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRouter);

//application routes
app.use('/api/v1/application', applicationRouter);

export default app;