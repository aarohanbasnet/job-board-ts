import {Request, Response }from "express"
import  { compare } from "bcrypt"
import { userModel } from "../models/user.model";
import { hash } from "../utils/bcryptUtils";
import { generateToken } from "../utils/generateToken";

export const register = async function(req : Request, res: Response){
 try{

        const {name, email, password, role} = req.body;
        let existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "account exists please login"
            })
        }

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
            message : "User created successfully",
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

export const login = async function(req : Request, res : Response){
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(400).json({
            success : false,
            message : "Something went wrong"
        });

    const isMatch = await compare(password, user.password);
    if(!isMatch) return res.status(401).json({
        success : false,
        message : "invalid credientials"
    });

    const token = generateToken(user);
    res.cookie("token", token);

    return res.status(201).json({
        success : true,
        message : "Logged in successfully"
    })

    } catch (error){
        if(error instanceof Error){
            res.status(500).json({
                success : false,
                message : error.message
            })
        }
    };
};


export const logout = async function (req : Request, res : Response){
    try{

        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                success : false,
                message : "You are not logged in"
            });
        }
        
        res.clearCookie("token", {
            httpOnly : true,
            sameSite : "strict"
        });

    return res.status(200).json({
        success : true,
        message : "loggedout successfully"
    });
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}




