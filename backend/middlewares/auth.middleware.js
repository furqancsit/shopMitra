import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = asyncHandler(async (req, res, next) => {

    let token;

    // Get token from cookies
    if (req.cookies?.token) {
        token = req.cookies.token;
    }

    // Optional: support Bearer token
    else if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
        throw new ApiError(401, "Unauthorized access");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    // Attach user to request
    req.user = user;

    next();
});