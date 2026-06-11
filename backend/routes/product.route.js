import Router from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/Product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/create", upload.array("images", 2), protect, adminOnly, createProduct);

// user
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
// admin
router.put("/update/:id",protect, adminOnly, updateProduct);
router.delete("/delete/:id",protect, adminOnly, deleteProduct);

export default router;