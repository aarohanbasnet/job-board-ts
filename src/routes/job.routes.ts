import express, {Router  } from "express";
import { createJob, editJobs } from "../controllers/job.controllers";
import { authorizeRoles, isLoggedIn } from "../middleware/auth.middleware";
const  router = express.Router();

router.post('/', isLoggedIn, authorizeRoles("admin"), createJob);
router.patch('/:jobId', isLoggedIn,authorizeRoles("admin"), editJobs);

export default router