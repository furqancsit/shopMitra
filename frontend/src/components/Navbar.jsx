import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../context/authcontext";
import axios from "axios";
import { getDashboardRoute } from "../utils/getDashboardRoute";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="p-2 rounded-xl bg-black text-white">
              <ShoppingBag size={22} />
            </div>
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              ShopMitra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {["Home", "Shop", "Men", "Women", "my-orders"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-gray-700 hover:text-black transition-all duration-300
                after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                after:w-0 after:bg-black after:transition-all after:duration-300
                hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <>
                {/* User Dropdown */}
                <div className="relative">
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <User size={18} />
                    <span className="font-medium">{user.fullName}</span>
                  </div>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-44 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">

                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>



                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={async () => {
                          setDropdownOpen(false);
                          await axios.post("/api/users/logout", {}, { withCredentials: true });
                          window.location.reload();
                        }}
                      >
                        Logout
                      </button>

                    </div>
                  )}
                </div>

                {/* Dashboard */}
                <Link
                  to={
                    user
                      ? user.isAdmin === "admin"
                        ? "/admin"
                        : "/dashboard"
                      : "/login"
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-md"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:border-black hover:bg-gray-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] py-4" : "max-h-0"
          }`}>
          <div className="flex flex-col gap-4 bg-white rounded-2xl p-4 shadow-lg border">

            {["Home", "Shop", "Men", "Women", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-black font-medium"
              >
                {item}
              </Link>
            ))}

            <hr />

            {user ? (
              <>
                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-xl">
                  <User size={18} />
                  <span>{user.fullName}</span>
                </div>

                <Link
                  to={getDashboardRoute(user)}
                  className="text-center bg-black text-white py-3 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-center border py-3 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="text-center bg-black text-white py-3 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;