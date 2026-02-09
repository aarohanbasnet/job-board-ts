import mongoose, {Schema, Document} from "mongoose";

export interface IJobDocument extends Document {
    title : string
    company : string
    level : "Junior" | "Midlevel" | "Senior" | "Intern"
    workType : "Full Time" | "Part Time" | "Contract"
    hourlyRate : number
    postedBy : mongoose.Types.ObjectId | string
    isActive : boolean
}

const JobSechema = new  Schema<IJobDocument>({
    title : {type : String, required : true},
    company : {type : String, required : true},
    level : {type : String, enum : ["Junior", "Midlevel", "Senior", "Intern"], required : true},
    workType : {type : String, required : true},
    hourlyRate : {type : Number, required : true},
    postedBy : {type : mongoose.Schema.Types.ObjectId, ref: "User", required : true},
    isActive : {type : Boolean, default : true}
}, {timestamps : true});

export const JobModel = mongoose.model<IJobDocument>("Job", JobSechema)