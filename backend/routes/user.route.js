import Router from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/user.controller.js";
import { protect } from "../controllers/middlewares/auth.middleware.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);


export default router;