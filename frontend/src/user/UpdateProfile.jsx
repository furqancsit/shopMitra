import React, { useState } from "react";
import axios from "axios";
import { User, Mail, Save } from "lucide-react";
import { toast } from "react-toastify";

const UpdateProfile = ({ user }) => {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setLoading(true);

            const res = await axios.put(
                "/api/users/profile",
                formData
            );

            toast.success(
                res.data.message ||
                "Profile updated successfully"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Update failed"
            );
        } finally {
            setLoading(false);
        }


    };

    return (<div className="min-h-screen bg-slate-100 flex items-center justify-center p-4"> <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">


        {/* Header */}
        <div className=" bg-black p-8">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="text-white" size={30} />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        My Profile
                    </h1>

                    <p className="text-indigo-100">
                        Manage your account information
                    </p>
                </div>
            </div>
        </div>

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
        >
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                </label>

                <div className="relative">
                    <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="
              w-full
              pl-12
              pr-4
              py-3
              border
              border-slate-200
              rounded-xl
              bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                </label>

                <div className="relative">
                    <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="
              w-full
              pl-12
              pr-4
              py-3
              border
              border-slate-200
              rounded-xl
              bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-indigo-600
          hover:bg-indigo-700
          disabled:bg-indigo-400
          text-white
          font-semibold
          py-3
          rounded-xl
          transition
        "
            >
                <Save size={18} />

                {loading
                    ? "Updating..."
                    : "Update Profile"}
            </button>
        </form>
    </div>
    </div>

    );
};

export default UpdateProfile;
