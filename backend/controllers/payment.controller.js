import crypto from "crypto";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Order from "../models/order.model.js";

const verifyPayment = asyncHandler(async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Missing payment details",
        });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid signature",
        });
    }

    // update order in DB
    const order = await Order.findByIdAndUpdate(
        orderId,
        {
            paymentStatus: "paid",
            razorpayPaymentId: razorpay_payment_id,
        },
        { new: true }
    );

    return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: order,
    });
});

export { verifyPayment };