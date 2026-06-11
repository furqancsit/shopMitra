import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  ShoppingBag,
  Edit3,
  Save,
  X,
  ShieldCheck,
  Activity,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const [openEdit, setOpenEdit] = useState(false);

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

      await axios.put("/api/user/profile", formData);

      toast.success("Profile updated");
      setOpenEdit(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              My Profile
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your account settings and personal information
            </p>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

            {/* Sidebar */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-fit">

              <div className="flex flex-col items-center">

                <div
                  className="
                  h-24 w-24
                  rounded-full
                  bg-gradient-to-br
                  from-violet-600
                  to-blue-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-bold
                  ring-4
                  ring-violet-100
                "
                >
                  {user?.fullName?.charAt(0)}
                </div>

                <h2 className="mt-4 text-xl font-semibold text-slate-900 text-center">
                  {user?.fullName}
                </h2>

                <p className="text-slate-500 text-sm text-center break-all">
                  {user?.email}
                </p>

                <div className="mt-4 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                  Active User
                </div>
              </div>

              <div className="mt-8 space-y-3">

                <button
                  onClick={() => setOpenEdit(true)}
                  className="
                  w-full
                  flex
                  items-center
                  justify-between
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  hover:border-violet-300
                  hover:bg-violet-50
                  transition-all
                "
                >
                  <div className="flex items-center gap-3">
                    <Edit3 size={18} />
                    <span>Edit Profile</span>
                  </div>

                  <ChevronRight size={18} />
                </button>

                <button
                  className="
                  w-full
                  flex
                  items-center
                  justify-between
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  hover:border-violet-300
                  hover:bg-violet-50
                  transition-all
                "
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={18} />
                    <span>My Orders</span>
                  </div>

                  <ChevronRight size={18} />
                </button>

              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <ShoppingBag className="text-blue-600" />
                  </div>

                  <p className="mt-4 text-slate-500 text-sm">
                    Orders
                  </p>

                  <h3 className="mt-1 text-3xl font-bold text-slate-900">
                    24
                  </h3>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <ShieldCheck className="text-emerald-600" />
                  </div>

                  <p className="mt-4 text-slate-500 text-sm">
                    Security
                  </p>

                  <h3 className="mt-1 text-3xl font-bold text-slate-900">
                    100%
                  </h3>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Activity className="text-violet-600" />
                  </div>

                  <p className="mt-4 text-slate-500 text-sm">
                    Activity
                  </p>

                  <h3 className="mt-1 text-3xl font-bold text-slate-900">
                    Active
                  </h3>
                </div>

              </div>

              {/* Personal Information */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-8">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <button
                    onClick={() => setOpenEdit(true)}
                    className="
                    hidden sm:flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    bg-violet-600
                    hover:bg-violet-700
                    text-white
                    transition
                  "
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                </div>

                <div className="space-y-4">

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200">

                    <div className="p-3 rounded-xl bg-violet-50 text-violet-600">
                      <User size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Full Name
                      </p>

                      <p className="font-semibold text-slate-900">
                        {user?.fullName}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200">

                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                      <Mail size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Email Address
                      </p>

                      <p className="font-semibold text-slate-900 break-all">
                        {user?.email}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openEdit && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Edit Profile
              </h2>

              <button
                onClick={() => setOpenEdit(false)}
                className="
                p-2
                rounded-lg
                hover:bg-slate-100
                transition
              "
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-violet-500
                  focus:ring-4
                  focus:ring-violet-100
                "
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-violet-500
                  focus:ring-4
                  focus:ring-violet-100
                "
                />
              </div>

              <button
                onClick={updateProfile}
                disabled={loading}
                className="
                w-full
                mt-2
                py-3
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                text-white
                font-medium
                flex
                items-center
                justify-center
                gap-2
                hover:opacity-95
                transition
                disabled:opacity-50
              "
              >
                <Save size={18} />

                {loading ? "Updating..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default Profile;