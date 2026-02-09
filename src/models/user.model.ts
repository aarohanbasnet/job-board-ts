import mongoose, {Document, Schema} from "mongoose";

export type UserRole = "admin" | "user";

export interface IUserDocument extends Document {
    name :  string
    email : string
    password : string
    role : UserRole;
}

const UserSchema = new Schema <IUserDocument>({
    name : { type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    role : {type : String, enum: ["admin", "user"], default : "user"}
})

export const userModel = mongoose.model<IUserDocument>("User", UserSchema);