import jwt from "jsonwebtoken"
import { IUserDocument } from "../models/user.model"

export interface ITokenPayload {
     id : string
     role : IUserDocument["role"]; //Takes value from the model
}

export const generateToken = (user : IUserDocument) : string =>{
    const payload : ITokenPayload = {
        id : user._id.toString(),
        role : user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET as string, 
        { expiresIn : '1d'}
    );
};
