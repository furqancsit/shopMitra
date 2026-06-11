import express from "express";
import { verifyPayment } from "../controllers/payment.controller.js";
import Router from "express";

const router = Router()
router.post("/verify-payment", verifyPayment);

export default router