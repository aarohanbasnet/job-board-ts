import express, {Router} from "express";
import { applyForJob, getAllJobs, myApplication, withdrawApplication } from "../controllers/application.controller";
import { authorizeRoles, isLoggedIn } from "../middleware/auth.middleware";
const router = express.Router();

router.post('/apply/:jobId', isLoggedIn, authorizeRoles("user"), applyForJob);
router.get('/my-applications', isLoggedIn, authorizeRoles("user"), myApplication);
router.delete('/withdraw/:jobId', isLoggedIn, authorizeRoles("user"), withdrawApplication);
router.get('/', isLoggedIn, getAllJobs)

export default router