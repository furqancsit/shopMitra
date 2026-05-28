import Router from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/Product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware";

const router = Router();

router.post("/create",protect,adminOnly, createProduct);

// user
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
// admin
router.put("/update/:id",protect, adminOnly, updateProduct);
router.delete("/delete/:id",protect, adminOnly, deleteProduct);

export default router;