import Product from "../models/Product.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";


// all users

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()

    if (products.length === 0) {
        return res.status(404).json(new ApiError(404, "No products found"));
    }
 

    res.status(200).json(new ApiResponse(200, { success: true, data: products }));
});

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json(new ApiError(404, "Product not found"));
    }

    return res.status(200).json(new ApiResponse(200, { success: true, data: product }));
}
)

// admin

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, imageUrl, discount, stock } = req.body;

    if (!name || !description || !price === undefined || !category || stock === undefined) {
        return res.status(400).json(new ApiError(400, "All fields except imageUrl and discount are required"));
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        discount: discount || 0,
        stock,
        user: req.user._id,
        imageUrl: imageUrl || "",
    });


    res.status(201).json(new ApiResponse(201, { success: true, data: product }));
});


const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, imageUrl, discount, stock } = req.body;


    const product = await Product.findById(id);

    if (!product) {

        return res.status(404).json(new ApiError(404, "Product not found"));
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, {
        name: name !== undefined ? name : product.name,
        description: description !== undefined ? description : product.description,
        price: price !== undefined ? price : product.price,
        category: category !== undefined ? category : product.category,
        imageUrl: imageUrl !== undefined ? imageUrl : product.imageUrl,
        discount: discount !== undefined ? discount : product.discount,
        stock: stock !== undefined ? stock : product.stock,
    }, { new: true, });


    return res.status(200).json(new ApiResponse(200, { success: true, data: updatedProduct }));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return res.status(404).json(new ApiError(404, "Product not found"));
    }

    return res.status(200).json(new ApiResponse(200, { success: true, data: deletedProduct }));
});


const manageStock = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { stock } = req.body;

    if (stock === undefined) {
        return res.status(400).json(new ApiError(400, "Stock value is required"));
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { stock }, { new: true });

    if (!updatedProduct) {
        return res.status(404).json(new ApiError(404, "Product not found"));
    }
    return res.status(200).json(new ApiResponse(200, { success: true, data: updatedProduct }));
});
export { createProduct, updateProduct, deleteProduct, managaeStock, manageStock };