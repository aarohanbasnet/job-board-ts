import mongoose from "mongoose";

const connectDB = async() : Promise<void> =>{

    try{
        const URI = process.env.MONGO_URI;
        if(!URI){
            console.error("Error : MOngoURI is missing from .env file");
            process.exit(1);
        }; 
    
        await mongoose.connect(URI);
        console.log("MongoDB connected successfully");

    }catch(error){
        if(error instanceof Error){
            console.log("Mongo connection failed :", error.message);
            process.exit(1);
        }

    }
}

export default connectDB;