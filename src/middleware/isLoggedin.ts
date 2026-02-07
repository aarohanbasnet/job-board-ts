import {Request, Response, NextFunction } from "express";
import { ITokenPayload, verifyToken } from "../utils/generateToken";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

interface customRequest extends Request{
    user? : ITokenPayload;
}

export const isLoggedIn = function(req : customRequest, res: Response, next : NextFunction){
    try{
        let token: string | undefined;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        else if (req.cookies.token) {
            token = req.cookies.token;
        }
        if(!token){
            return res.status(401).json({
                success : false,
                message : "please login or register"
            })  ;
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();

    } catch(error : unknown){
        if(error instanceof JsonWebTokenError){
            return res.status(401).json({
                success : false,
                message : "Invalid token. Please log in again."
            });
        };

        if(error instanceof TokenExpiredError){
            return res.status(401).json({
                success : false,
                message : "Your session has expired. Please log in again"
            });
        };
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        };
    }
};