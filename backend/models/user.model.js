import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    profileImage: {
        url: String,
        public_id: String,
    },
    isAdmin: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return candidatePassword === this.password;
};

const User = mongoose.model("User", userSchema);

export default User;