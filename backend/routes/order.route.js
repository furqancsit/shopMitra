import { Router } from "express";
import { createOrder, getMyOrders, orders, updateOrderStatus } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";


const router = Router()

router.post("/create", protect, createOrder)
router.get(
    "/my-orders",
    protect,
    getMyOrders
)
// router.post("router")


router.get("/orders", protect, adminOnly, orders)

router.put("/updatestatus/:orderId", protect, adminOnly, updateOrderStatus)


export default router