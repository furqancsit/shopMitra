import { asyncHandler } from "../utils/AsyncHandler.js";

export const adminOnly = asyncHandler(async (req, res, next) => {

    if (req.user.isAdmin !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
});