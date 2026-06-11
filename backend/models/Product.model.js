import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['men', 'women', 'clothes', 'kids', 'accessories'],
        required: true,
        lowercase: true,
    },
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    stock: {
        type: Number,
        default: 0,
        required: true,
        min: 0,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },



}, { timestamps: true });
productSchema.index({ name: 'text' });
productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;