import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const genrateToken = function (id) {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );
};


const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existendUser = await User.findOne({ email })

    if (existendUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    let profileImage = null;
    if (req.file) {

        const result = await uploadToCloudinary(req.file.buffer);

        profileImage = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }
    const user = await User.create({
        fullName, email, password, profileImage,
    })


    const userP = await User.findById(user._id).select("-password");

    const token = genrateToken(user._id)
    res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }).json(new ApiResponse(201, { user: userP, token }, "User registered successfully"))


})
const loginUser = asyncHandler(async (req, res) => {


    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new ApiError(401, "Invalid credentials")
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const user = await User.findById(existingUser._id).select("-password");




    const token = genrateToken(existingUser._id)

    res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",   
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }).status(200).json(new ApiResponse(200, { user, token }, "User logged in successfully"))

})
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("-password")

    if (!user) {
        throw new ApiError(404, "User not found")
    }
    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"))



})
const updateUserProfile = asyncHandler(async (req, res) => {

    const { fullName, email } = req.body

    if (!fullName && !email) {
        throw new ApiError(400, "All fields are required")

    }
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: { fullName, email } }, { new: true })

    res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully"))

})
const deleteUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user.
        _id
    )

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    res.status(200).json(new ApiResponse(200, null, "User profile deleted successfully"))

}
)

const logOut = asyncHandler(async (req, res) => {

    res.clearCookie("token")
    res.status(200).json(new ApiResponse(200, "logout succefully"))
})

export { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, logOut };
