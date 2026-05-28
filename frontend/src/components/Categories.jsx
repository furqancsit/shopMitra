import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    link: "/men",
  },
  {
    id: 2,
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
    link: "/women",
  },
  {
    id: 3,
    name: "Streetwear",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
    link: "/streetwear",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
    link: "/accessories",
  },
];

function Categories() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            Shop By Category
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore curated collections crafted for every style and occasion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-3xl"
            >

              {/* Image */}
              <div className="h-[420px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>

              {/* Text */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm">
                  Explore Collection →
                </p>
              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Categories;