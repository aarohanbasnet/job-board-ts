import express, {Router  } from "express";
import { createJob } from "../controllers/job.controllers";
import { authorizeRoles, isLoggedIn } from "../middleware/auth.middleware";
const  router = express.Router();

router.post('/', isLoggedIn, authorizeRoles("admin"), createJob);

export default router