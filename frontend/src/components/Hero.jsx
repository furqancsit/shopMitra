import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="w-full min-h-[90vh] flex items-center bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8">

            {/* Tag */}
            <span className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm tracking-wide">
              New Collection 2026
            </span>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-black">
                Elevate Your Style With Modern Fashion
              </h1>

              <p className="text-gray-600 text-lg max-w-xl">
                Discover premium clothing crafted for comfort, confidence,
                and everyday elegance. Explore the latest trends designed
                for modern lifestyles.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <Link
                to="/shop"
                className="px-7 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Shop Now
              </Link>

              <Link
                to="/collection"
                className="px-7 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition duration-300"
              >
                Explore Collection
              </Link>

            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-700">

              <div>
                ✓ Free Shipping
              </div>

              <div>
                ✓ Easy Returns
              </div>

              <div>
                ✓ Secure Payment
              </div>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">

            <div className="relative w-full max-w-md lg:max-w-lg">

              {/* Background Shape */}
              <div className="absolute inset-0 bg-black rounded-[40px] rotate-6"></div>

              {/* Hero Image */}
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
                alt="Fashion Model"
                className="relative rounded-[40px] object-cover w-full h-[500px] lg:h-[650px] shadow-2xl"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;