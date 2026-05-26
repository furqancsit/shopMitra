import Router from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/user.controller.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/profile", deleteUserProfile);


export default router;