import React, { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";


const Signup = () => {
    const { setUser } = useAuth();


    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const formValidation = () => {

        if (!form.fullName || !form.email || !form.password) {
            toast.error("Please fill all the fields!")
            return false
        }

        const isEmailValid = form.email.trim()

        if (!/\S+@\S+\.\S+/.test(isEmailValid)) {
            toast.error("Please enter a valid email!")
            return false
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters long!")
            return false
        }
        return true



    }

    const { fullName, email, password } = form

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formValidation()) return
        try {
          const res =  await axios.post("/api/users/register", form);
          
            toast.success("Signup successful!");

            setForm({
                fullName: "",
                email: "",
                password: ""
            });
            setUser(res.data.data);
            navigate("/shop")



        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }


    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-black text-center mb-2">
                    Create Account
                </h1>

                <p className="text-gray-600 text-center mb-6">
                    Sign up to get started
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Full Name */}
                    <div>
                        <label className="block text-black font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            name="fullName"
                            value={fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-black font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-black font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-black font-semibold cursor-pointer hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;