import { Response } from "express";
import { customRequest } from "../middleware/auth.middleware";
import { ApplicationModel } from "../models/application.model";
import mongoose from "mongoose";
import { JobModel } from "../models/job.model";


//APPLY FOR JOB
export const applyForJob = async function(req : customRequest, res : Response){
    try {
        const jobId = req.params.jobId as string;
        const userId = req.user?.id;

        if(!jobId || !userId || !mongoose.Types.ObjectId.isValid(jobId)){
            return res.status(400).json({
                success : false,
                message : "Invalid job ID or User session"
            });
        }
        
        //application exist?
        const existingApplication = await ApplicationModel.findOne({
            job : jobId, 
            user : userId
        });
        
        if(existingApplication){
            return res.status(400).json({
                success : false,
                message : "You have alreday applied for this job"
            });
        }

        const application = await ApplicationModel.create({
            job : jobId,
            user : userId
        });

        return res.status(201).json({
            success : true,
            message : "Application submitted successfully",
            data : application
        });

    } catch(error){
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
    }
};

//MY APPLICATIONS
export const  myApplication = async function( req : customRequest, res : Response){
    const userId = req.user?.id;

    try{

        if(!userId) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized"
            });
        }

        const applications = await ApplicationModel.find({user : userId})
        .populate({
            path : 'job',
            select : 'title company level workType',
            match : {isDeleted : false} //soft deletion 
        })
        .sort("-createdAt"); //newest application first

        return res.status(200).json({
            success : true,
            count : applications.length,
            data : applications
        });
    } catch(error){
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
    }
};


//WITHDRAW APPLICATION
export const withdrawApplication = async function( req : customRequest, res : Response){
    const {id} = req.params; 
    const userId = req.user?.id;
    try{

        if(!userId || !id){
            return res.status(401).json({
                success : false,
                message : "Unauthorized"
            })
        }

        const application = await ApplicationModel.findOneAndDelete({
            _id : id,
            user : userId
        });

        if(!application){
            return res.status(404).json({
                success : false,
                message : "Application not found or you aren't authorized to withdraw"
            });
        }

        return res.status(200).json({
            success : true,
            message : "Application withdrawn successfully"
        })

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
    }

};

//GET ALL JOBS

export const getAllJobs = async function(req : customRequest, res : Response){
    try{
        const jobs = await JobModel.find({
            isActive : true
        }).populate("postedBy", "name")
        .sort("-createdAt");

        return res.status(200).json({
            success : true,
            count : jobs.length,
            message : "Jobs fetched successfully",
            data : {
                jobs
            }
        });
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
    }
};