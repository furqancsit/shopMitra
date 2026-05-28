import express from "express";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 6000;

import userRoutes from "./routes/user.route.js";
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    }).catch((error) => {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    });
