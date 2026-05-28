import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useAuth } from "../context/authcontext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  return (
    <header className="w-full  bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navbar Container */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-wide"
          >
            <ShoppingBag className="w-7 h-7 text-black" />
            <span>ShopMitra</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-black transition"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="text-gray-700 hover:text-black transition"
            >
              Shop
            </Link>

            <Link
              to="/men"
              className="text-gray-700 hover:text-black transition"
            >
              Men
            </Link>

            <Link
              to="/women"
              className="text-gray-700 hover:text-black transition"
            >
              Women
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-black transition"
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons Desktop */}
          {
            user ? (
              <span className="text-black border rounded-full cursor-pointer px-3 py-1 bg-gray-200">
               {user.fullName}
              </span>  
            ) : (

              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                >
                  Sign Up
                </Link>
              </div>
)}
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>

              <Link
                to="/men"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Men
              </Link>

              <Link
                to="/women"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Women
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-3 pt-4">

                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2 rounded-lg border border-black"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="w-full text-center px-4 py-2 rounded-lg bg-black text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>

              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;