import { Response } from "express";
import { customRequest } from "../middleware/auth.middleware";
import { JobModel } from "../models/job.model";
import { userModel } from "../models/user.model";
import { IJobDocument } from "../models/job.model";
import { rmSync } from "node:fs";
import mongoose from "mongoose";

export const createJob = async function(req : customRequest, res : Response){
 const {title, company, level, workType, hourlyRate, postedBy, isActive} = req.body;
    try{

        if(!req.user || !req.user.id){
            return res.status(401).json({
                success : false,
                message : "Authentication required"
            })
        }

        if(!title || !company){
            return res.status(400).json({
                success : false,
                message : "Please provide all required fields"
            })
        };

        const newJob : IJobDocument = await JobModel.create({
            title,
            company,
            level,
            workType,
            hourlyRate,
            isActive,
            postedBy : req.user.id as unknown as mongoose.Types.ObjectId
        });

        return res.status(201).json({
            success : true,
            message : "New job posted successfully",
            data : {
                job : newJob
            }
        })


    } catch(error){
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}

