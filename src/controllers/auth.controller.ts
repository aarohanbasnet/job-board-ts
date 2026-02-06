import {Request, Response }from "express"
import bcrypt from "bcrypt"
import { userModel } from "../models/user.model";
import { hash } from "../utils/bcryptUtils";
import { generateToken } from "../utils/generateToken";


export const register = async function(req : Request, res: Response){
 try{

        const {name, email, password, role} = req.body;
        let existingUser = await userModel.findOne({email});
        if(existingUser) return 
            res
            .status(400)
            .json({
                success : false,
                message : "User alreday exists please login"
        });

        const hashedPassword  = await hash(String(password));

        const user = await userModel.create({
             name,
             email,
            password : hashedPassword
        });

        const token = generateToken(user);
        res.cookie("token", token);

        return res.status(201).json({
            success : true,
            message : "User createed successfully",
            data : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
            },
        });

        

 }catch(error){
    if(error instanceof Error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
 }
};




