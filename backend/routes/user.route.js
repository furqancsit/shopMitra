import Router from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, logOut } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);


export default router;