import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  ShoppingBag,
  Edit3,
  Save,
  X,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useOrders } from "../context/orderContext";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  const { orders } = useOrders();
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

  const updateProfile = async () => {
    try {
      setLoading(true);

      await axios.put("/api/users/profile", formData);

      toast.success("Profile updated successfully");
      setOpenEdit(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-16">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Account
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your profile and account settings
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">

            {/* Left Column */}
            <div className="space-y-5">

              {/* Profile Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                <div className="flex flex-col items-center text-center">

                  <div
                    className="
                      h-20 w-20
                      rounded-full
                      bg-gradient-to-br
                      from-indigo-500
                      to-violet-500
                      flex
                      items-center
                      justify-center
                      text-white
                      text-2xl
                      font-bold
                    "
                  >
                    {user?.fullName?.charAt(0)?.toUpperCase()}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-gray-900">
                    {user?.fullName}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1 break-all">
                    {user?.email}
                  </p>

                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                <button
                  onClick={() => setOpenEdit(true)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-5
                    py-4
                    hover:bg-gray-50
                    transition cursor-pointer
                  "
                >
                  <div className="flex items-center gap-3">
                    <Edit3 size={18} />
                    <span>Edit Profile</span>
                  </div>

                  <ChevronRight size={18} />
                </button>

                <div className="border-t border-gray-100" />

                <Link to="/my-orders">
                  <button
                    className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-5
                    py-4
                    hover:bg-gray-50
                    transition cursor-pointer
                  "
                  >

                    <div className="flex items-center gap-3 ">
                      <ShoppingBag size={18} />
                      <span>My Orders</span>
                    </div>

                    <ChevronRight size={18} />
                  </button>
                </Link>

              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">

              {/* Personal Info */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Personal Information
                </h3>

                <div className="space-y-5">

                  <div className="flex items-start gap-4">

                    <div className="p-3 bg-gray-100 rounded-xl">
                      <User size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Full Name
                      </p>

                      <p className="font-medium text-gray-900 mt-1">
                        {user?.fullName}
                      </p>
                    </div>a

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="p-3 bg-gray-100 rounded-xl">
                      <Mail size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Email Address
                      </p>

                      <p className="font-medium text-gray-900 mt-1 break-all">
                        {user?.email}
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* Account Summary */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Account Overview
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <div onClick={() => navigate("/my-orders")} className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-500">
                      Orders
                    </p>

                    <p className="text-2xl font-bold mt-2 cursor-pointer text-green-600">
                      {orders.length}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <p className="text-2xl font-bold mt-2 text-green-600">
                      Active
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {openEdit && (
        <div
          className="
            fixed inset-0
            bg-black/40
            z-50
            flex
            items-end
            sm:items-center
            justify-center
            p-0 sm:p-4
          "
        >
          <div
            className="
              w-full
              sm:max-w-md
              bg-white
              rounded-t-3xl
              sm:rounded-3xl
              p-6
              shadow-2xl
            "
          >
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-semibold">
                Edit Profile
              </h2>

              <button
                onClick={() => setOpenEdit(false)}
                className="
                  h-10 w-10
                  flex items-center justify-center
                  rounded-xl
                  hover:bg-gray-100
                "
              >
                <X size={18} />
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    outline-none
                  "
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    outline-none
                  "
                />
              </div>

              <button
                onClick={updateProfile}
                disabled={loading}
                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-medium
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >
                <Save size={18} />

                {loading
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;