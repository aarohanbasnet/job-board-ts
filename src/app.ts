import express, {Request, Response }from "express";
import dotenv from 'dotenv';
import connectDB from "./config/dbconnection";


dotenv.config(); //loads env first
const app = express();

connectDB();// database connection

app.use(express.json());

app.get('/', (req : Request, res : Response)=>{
    res.send("working")
});

export default app;