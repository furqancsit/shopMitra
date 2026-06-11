import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/authcontext";
const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    const formValidation = () => {

        if (!form.email || !form.password) {
            toast.error("Please fill all the fields!")
            return false
        }

        if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
            toast.error("Please enter a valid email!")
            return false
        }
        if (form.password.length < 6) {
            toast.error("password must be 6 character")
            return false
        }
        return true

    }

    const { setUser } = useAuth()

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formValidation()) return

        try {
            setLoading(true)

            const { data } = await axios.post("/api/users/login", form)

            setUser(data.data.user)


            toast.success("successfully login")
            navigate("/");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed!"

            )
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-lg p-8 bg-white">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-black text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-gray-600 text-center mb-6">
                    Login to your account
                </p>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div>
                        <label className="block text-black font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-black font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={form.password}
                            
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-700">
                            <input type="checkbox" className="accent-black" />
                            Remember me
                        </label>

                        <a href="/forget-password" className="text-black font-medium cursor-pointer hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-600 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-black font-semibold cursor-pointer hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}


export default Login