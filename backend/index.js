import "dotenv/config";
import express from "express";

import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

const app = express();


const PORT = process.env.PORT || 6000;

import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js"
import orderRoute from "./routes/order.route.js"
import paymentRouter from "./routes/payment.route.js"
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)
app.use("/api/payment", paymentRouter)


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
