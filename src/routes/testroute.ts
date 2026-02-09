import express, { Response } from "express";
import { isLoggedIn, authorizeRoles, customRequest } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/test-public", (req : customRequest, res : Response)=>{
    res.json({
        message : "Public Route : Anyone can see this."
    });
});

router.get("/test-protected", isLoggedIn, (req : customRequest, res : Response)=>{
    res.status(200).json({
        message : "Protected route : You are logged in!",
        data : {
            "user" : req.user?.id,
            "role" : req.user?.role
        }
    });
});

router.get("/test-admin", isLoggedIn, authorizeRoles("admin"), (req : customRequest, res: Response)=>{
    res.status(200).json({
        message : "Protected route high level access granted",
        data : {
            "user" : req.user?.id,
            "role" : req.user?.role
        }
    });
});

export default router
