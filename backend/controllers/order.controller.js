import Product from "../models/Product.model.js";
import Order from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Razorpay from "razorpay";
import { razorpay } from "../utils/razorpay.js";

const createOrder = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { items, shippingAddress, paymentMethod } = req.body;

    if (
        !shippingAddress?.fullName ||
        !shippingAddress?.phone ||
        !shippingAddress?.street ||
        !shippingAddress?.city ||
        !shippingAddress?.state ||
        !shippingAddress?.pincode
    ) {
        throw new ApiError(400, "Shipping address is incomplete");
    }

    if (!paymentMethod) {
        throw new ApiError(400, "Payment method is required");
    }

    if (!items || items.length === 0) {
        throw new ApiError(400, "No items in order");
    }

    let subTotal = 0;
    const orderItems = [];

    for (let item of items) {

        const product = await Product.findById(item.product);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        if (product.stock < item.quantity) {
            throw new ApiError(
                400,
                `Insufficient stock for ${product.name}`
            );
        }

        const price = product.price;

        subTotal += price * item.quantity;

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price,
            size: item.size,
            color: item.color
        });

        // reduce stock
        product.stock -= item.quantity;
        await product.save();
    }

    const discount = 0;
    const totalAmount = subTotal - discount;
    let razorpayOrder = null;

    // Create Razorpay order only for online payments
    if (paymentMethod !== "COD") {
        razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100, // amount in paise
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        });
    }

    let orderPayment = null;

    if (paymentMethod !== "COD") {
        orderPayment = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: "INR",
            receipt: "order_rcptid_" + Date.now(),
        });
    }
    const order = await Order.create({
        user: userId,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        subTotal,
        discount,
        totalAmount,
        paymentStatus:
            paymentMethod === "COD" ? "pending" : "pending",
        razorpayOrderId: razorpayOrder?.id || null,
        razorpayOrderId: orderPayment?.id || null
    });

    return res.status(201).json(
        new ApiResponse(201, {
            order,
            razorpayOrder: orderPayment
        }, "Order created successfully")
    );

});




//logedIn user
const getMyOrders = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const orders = await Order.find({
        user: userId
    })
        .populate("items.product")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully"
        )
    );

});


const updateOrderStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const order = await Order.findById(req.params.orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.status = status;

    await order.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order updated"
        )
    );

});


// admin
const orders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.product")
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "All orders fetched"
        )
    );
});

export { createOrder, getMyOrders, updateOrderStatus, orders }