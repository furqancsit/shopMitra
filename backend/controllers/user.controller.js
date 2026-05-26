import Usser from "../models/user.model.js";
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
};git 


const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existendUser = await User.find({ email })

    if (existendUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        fullName, email, password
    })

    const userP = await User.findById(user._id).select("-password");
    res.status(201).json(new ApiResponse(201, { user, token: genrateToken(user._id) }, "User registered successfully"))

})
const loginUser = asyncHandler(async (req, res) => {


    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existendUser = await User.findOne({ email })

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const checkPassword = user.comparePassword(password)

    if (!checkPassword) {
        throw new ApiError(401, "Invalid credentials")
    }

    const user = await User.create({
        email, password
    })


    res.status(200).json(new ApiResponse(200, { user, token: genrateToken(existendUser._id) }, "User logged in successfully"))

})
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }
    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"))



})
const updateUserProfile = asyncHandler(async (req, res) => {

    const { fullName, email } = req.body

    if (fullName || email) {
        throw new ApiError(400, "All fields are required")

    }
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const userUpdate = user.findByIdAndUpdate(req.user._id, { $set: { fullName, email } }, { new: true })

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

export { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile };
