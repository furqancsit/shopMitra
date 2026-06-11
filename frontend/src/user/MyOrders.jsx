import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useOrders } from "../context/orderContext";
const MyOrders = () => {
    const { orders, fetchOrders } = useOrders();

    useEffect(() => {
        fetchOrders();
    }, []);


    return (

        <div className="min-h-screen bg-gray-50 text-black py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
                        Order Management
                    </div>


                    <h1 className="text-5xl font-bold text-black">
                        My Orders
                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">
                        Track and manage your purchases
                    </p>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="
          group
          bg-gray-900
          border
          border-gray-800
          rounded-3xl
          overflow-hidden
          hover:border-indigo-500/40
          hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]
          transition-all
          duration-300
        "
                        >
                            {/* Order Header */}
                            <div className="px-7 py-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-900 to-indigo-950/20">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                                    <div>
                                        <h3 className="font-bold text-xl text-white">
                                            Order #{order._id.slice(-6).toUpperCase()}
                                        </h3>

                                        <p className="text-sm text-gray-400 mt-1">
                                            Placed on{" "}
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-5">
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border
                  ${order.status === "delivered"
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : order.status === "shipped"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                }
                `}
                                        >
                                            {order.status}
                                        </span>

                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                                Order Total
                                            </p>

                                            <p className="text-2xl font-bold text-white">
                                                ₹{order.totalAmount}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="divide-y divide-gray-800">
                                {order.items.map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/product/${item.product?._id}`}
                                        className="
                block
                p-6
                hover:bg-gray-800/40
                transition-all
              "
                                    >
                                        <div className="flex flex-col md:flex-row gap-5">
                                            {/* Product Image */}
                                            <div className="relative w-full md:w-28 h-28 flex-shrink-0">
                                                <img
                                                    src={item.product?.image}
                                                    alt={item.product?.name}
                                                    className="
                      w-full
                      h-full
                      rounded-2xl
                      object-cover
                      border
                      border-gray-700
                    "
                                                />

                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent" />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg text-white group-hover:text-indigo-400 transition">
                                                    {item.product?.name}
                                                </h4>

                                                <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                    <div className="bg-gray-800/50 rounded-2xl p-3">
                                                        <p className="text-xs text-gray-500 uppercase">
                                                            Quantity
                                                        </p>
                                                        <p className="text-white font-semibold mt-1">
                                                            {item.quantity}
                                                        </p>
                                                    </div>

                                                    <div className="bg-gray-800/50 rounded-2xl p-3">
                                                        <p className="text-xs text-gray-500 uppercase">
                                                            Price
                                                        </p>
                                                        <p className="text-white font-semibold mt-1">
                                                            ₹{item.price}
                                                        </p>
                                                    </div>

                                                    <div className="bg-gray-800/50 rounded-2xl p-3">
                                                        <p className="text-xs text-gray-500 uppercase">
                                                            Color
                                                        </p>
                                                        <p className="text-white font-semibold mt-1 capitalize">
                                                            {item.color}
                                                        </p>
                                                    </div>

                                                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-3">
                                                        <p className="text-xs text-indigo-400 uppercase">
                                                            Subtotal
                                                        </p>
                                                        <p className="text-indigo-300 font-bold mt-1">
                                                            ₹{item.price * item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="px-7 py-5 border-t border-gray-800 bg-gray-900/80 backdrop-blur">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">
                                        {order.items.length} item(s)
                                    </p>

                                    <div>
                                        <p className="text-xs text-gray-500 text-right">
                                            Grand Total
                                        </p>

                                        <p className="text-2xl font-bold text-white">
                                            ₹{order.totalAmount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );


};

export default MyOrders;