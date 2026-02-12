import { Response } from "express";
import { customRequest } from "../middleware/auth.middleware";
import { JobModel } from "../models/job.model";
import { IJob } from "../models/job.model";
import mongoose from "mongoose";
import { ApplicationModel } from "../models/application.model";

interface IJobQuery {
    postedBy : string,
    isDeleted? : boolean
}

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

        const newJob : IJob = await JobModel.create({
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
};

export const editJobs = async function(req : customRequest, res : Response){
    const jobId = req.params.jobId;
    const adminId = req.user?.id;
    const updatedData = req.body;
    const filter = {
        _id : jobId,
        postedBy : adminId
    } as any

    try{

        const updatedJob = await JobModel.findOneAndUpdate(
        filter, updatedData,
        {
            new : true,
            runValidators : true
        }
     );

     if(!updatedJob){
        return res.status(404).json({
            success : false,
            message : "Job not found or you are not authorized to edit it"
        });
     }

     return res.status(200).json({
        success : true,
        message : "Job updated successfully",
        data : {
            job : updatedJob
        }
     });

    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}

export const deleteJob = async function(req : customRequest, res : Response){
    const {id} = req.params;
    const adminId = req.user?.id;
try{

    if(!adminId || !id){
        return res.status(401).json({
            success : false,
            message :  "Unauthorized"
        });
    }

    const job = await JobModel.findOneAndUpdate(
        {_id : id, postedBy : adminId},
        {isDeleted : true, isActive : false},
        {new : true});

    if(!job){
        return res.status(404).json({
            success : false,
            message : "Job not found or you are not authorized"
        });
    }

    return res.status(200).json({
        success : true,
        message : `The job ${job.title} at ${job.company} has been archived succesfully`
    });

    
} catch (error){
    if(error instanceof Error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}

};

export const getMyPostedJobs = async function(req: customRequest, res: Response) {
    try {
        const adminId = req.user?.id;
        const { showDeleted } = req.query;

        if (!adminId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const query: IJobQuery = { postedBy: adminId };

        if (showDeleted !== "true") {
            query.isDeleted = false;
        }

        const jobs = await JobModel.find(query).sort("-createdAt");

        return res.status(200).json({
            success: true,
            count: jobs.length,
            message: showDeleted === "true" 
                ? "Showing all your posts (including archived)" 
                : "Showing your active posts",
            data: jobs
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};