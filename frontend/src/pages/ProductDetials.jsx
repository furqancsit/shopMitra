import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

const ProductDetails = () => {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)



    const navigate = useNavigate()

    useEffect(() => {

        const getProduct = async () => {

            try {

                const res = await axios.get(`/api/product/${id}`)

                setProduct(res.data.data)
                setLoading(false)

            } catch (error) {

                toast.error("Failed to fetch product")
                setLoading(false)

            }

        }

        getProduct()

    }, [id])


    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading product...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-10">

                {/* Image Section */}
                <div className="bg-gray-100 rounded-2xl overflow-hidden">
                    <img
                        src={product.images?.[0]?.url || 'https://via.placeholder.com/500'}
                        alt={product.name}
                        className="w-full h-[500px] object-cover"
                    />
                </div>

                {/* Details Section */}
                <div>

                    <span className="inline-block px-3 py-1 text-xs bg-black text-white rounded-full mb-4">
                        {product.category}
                    </span>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mb-6">
                        <p className="text-3xl font-bold text-black">
                            ₹{product.price}
                        </p>

                        {product.discount > 0 && (
                            <p className="text-green-600 font-medium mt-1">
                                {product.discount}% OFF
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Link
                            to={`/checkout/${product._id}`}
                            className="bg-black text-white px-6 py-3 rounded-xl"
                        >
                            Buy Now
                        </Link>

                        <button className="border border-black cursor-pointer text-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition">
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails