import express, {Router  } from "express";
import { createJob, deleteJob, editJobs, getMyPostedJobs } from "../controllers/job.controllers";
import { authorizeRoles, isLoggedIn } from "../middleware/auth.middleware";
const  router = express.Router();

router.post('/', isLoggedIn, authorizeRoles("admin"), createJob);
router.patch('/:jobId', isLoggedIn,authorizeRoles("admin"), editJobs);
router.get('/me', isLoggedIn, authorizeRoles("admin"), getMyPostedJobs);
router.delete('/:id', isLoggedIn, authorizeRoles("admin"),deleteJob);

export default router