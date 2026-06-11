import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Pencil,
  Trash2,
  Eye,
  Package,
  Search,
} from "lucide-react";

const ProductTable = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/product/all");
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/product/delete/${id}`);

      toast.success("Product deleted successfully");

      setProduct((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }


  };

  const filteredProducts = product.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">
              Inventory Management
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Products Dashboard
            </h1>

            <p className="text-indigo-100 mt-2">
              Manage products, pricing and inventory.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
              <p className="text-sm text-indigo-100">
                Total Products
              </p>

              <h3 className="text-3xl font-bold">
                {product.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Toolbar */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-slate-100">
          <div className="p-6 flex flex-col lg:flex-row gap-4 justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Products
              </h2>

              <p className="text-slate-500">
                Browse and manage your inventory
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="
                  h-12
                  w-full
                  sm:w-80
                  pl-11
                  pr-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  focus:bg-white
                  focus:ring-4
                  focus:ring-indigo-100
                  focus:border-indigo-500
                  transition-all
                  outline-none
                "
                />
              </div>

              <button
                className="
                h-12
                px-5
                rounded-2xl
                bg-indigo-600
                text-white
                font-medium
                hover:bg-indigo-700
                transition
              "
              >
                Add Product
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center">
              <Package size={40} className="text-slate-400" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-800">
              No Products Found
            </h3>

            <p className="text-slate-500 mt-2">
              Start by adding your first product.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile */}
            <div className="grid gap-5 p-5 md:hidden">
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className="
                  group
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  overflow-hidden
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                "
                >
                  <div className="relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-52 object-cover"
                    />

                    {p.discount > 0 && (
                      <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {p.discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-900">
                      {p.name}
                    </h3>

                    <p className="text-slate-500 mt-2 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="flex items-center justify-between mt-5">
                      <span className="text-2xl font-bold text-slate-900">
                        ₹{p.price}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                        {p.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-5">
                      <button className="h-11 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        <Eye size={18} className="mx-auto" />
                      </button>

                      <button className="h-11 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition">
                        <Pencil size={18} className="mx-auto" />
                      </button>

                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="h-11 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 size={18} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-8 py-5 text-left text-xs uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-8 py-5 text-left text-xs uppercase tracking-wider text-slate-500">
                      Category
                    </th>

                    <th className="px-8 py-5 text-left text-xs uppercase tracking-wider text-slate-500">
                      Price
                    </th>

                    <th className="px-8 py-5 text-left text-xs uppercase tracking-wider text-slate-500">
                      Discount
                    </th>

                    <th className="px-8 py-5 text-left text-xs uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((p) => (
                    <tr
                      key={p._id}
                      className="
                      border-t
                      border-slate-100
                      hover:bg-indigo-50/40
                      transition-all
                    "
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="
                            h-16
                            w-16
                            rounded-2xl
                            object-cover
                            shadow-md
                          "
                          />

                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {p.name}
                            </h3>

                            <p className="text-sm text-slate-500 max-w-sm truncate">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-5">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                          {p.category}
                        </span>
                      </td>

                      <td className="px-8 py-5 font-bold text-slate-900">
                        ₹{p.price}
                      </td>

                      <td className="px-8 py-5">
                        {p.discount > 0 ? (
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {p.discount}% OFF
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            —
                          </span>
                        )}
                      </td>

                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          <button className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-blue-100 hover:text-blue-600 transition flex items-center justify-center">
                            <Eye size={18} />
                          </button>

                          <button className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-600 transition flex items-center justify-center">
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => deleteProduct(p._id)}
                            className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-red-100 hover:text-red-600 transition flex items-center justify-center"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
