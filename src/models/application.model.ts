import mongoose, {Schema, Document} from "mongoose";
export interface IApplicationDocument extends Document {
    job : mongoose.Types.ObjectId
    user : mongoose.Types.ObjectId
    coverletter? : string
    status : "pending" | "accepted" | "rejected"
}

const ApplicationSchema = new Schema<IApplicationDocument>({
     job : {type : mongoose.Schema.Types.ObjectId, ref : "Job", required : true},
     user : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
     coverletter : {type : String},
     status : {type : String, enum : ["pending", "accepted", "rejected"], default : "pending"},
}, {timestamps : true})

export const ApplicationModel = mongoose.model<IApplicationDocument>("Application", ApplicationSchema) //Here <IApplicationDocument> returns onlty the document typed ie while using ApplicationModel.find()