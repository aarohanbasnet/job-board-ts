import mongoose, {mongo, Mongoose, Schema} from "mongoose";

export interface IJob{
    _id? : mongoose.Types.ObjectId
    title : string
    company : string
    level : "Junior" | "Midlevel" | "Senior" | "Intern"
    workType : "Full Time" | "Part Time" | "Contract"
    hourlyRate : number
    postedBy : mongoose.Types.ObjectId
    isActive : boolean
}

const JobSechema = new  Schema<IJob>({
    title : {type : String, required : true},
    company : {type : String, required : true},
    level : {type : String, enum : ["Junior", "Midlevel", "Senior", "Intern"], required : true},
    workType : {type : String, required : true},
    hourlyRate : {type : Number, required : true},
    postedBy : {type : mongoose.Schema.Types.ObjectId, ref: "User", required : true},
    isActive : {type : Boolean, default : true}
}, {timestamps : true});

export const JobModel = mongoose.model<IJob>("Job", JobSechema);