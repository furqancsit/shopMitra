import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    size: String,
    color: String
});

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [orderItemSchema],

    shippingAddress: {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: "India"
        }
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "UPI", "CARD"],
        default: "COD",
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
        required: true
    },
    stripeSessionId: String,
    razorpayOrderId: {
        type: String,
        default: null,
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
        lowercase: true
    },

    subTotal: Number,
    discount: {
        type: Number,
        default: 0
    },
    totalAmount: Number,

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;