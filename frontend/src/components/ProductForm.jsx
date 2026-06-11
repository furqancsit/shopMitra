import { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    discount: "",
    stock: "",
  });

  const {
    name,
    description,
    price,
    category,
    images,
    discount,
    stock,

  } = form;

  const isValidProduct = () => {
    const required = [name, description, price, category, stock];

    if (required.some(v => v == null || v === "")) {
      toast.error("Please fill all required fields");
      return false;
    }

    if (
      [price, discount, stock].some(v =>
        v !== "" && Number.isNaN(Number(v))
      )
    ) {
      toast.error("Price, discount and stock must be numbers");
      return false;
    }

    if (Number(discount) < 0 || Number(discount) > 100) {
      toast.error("Discount must be between 0 and 100");
      return false;
    }

    if (Number(stock) < 0) {
      toast.error("Stock cannot be negative");
      return false;
    }

    return true;
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({
        ...prev,
        images: files,
      })
      );

    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      })
      );
    }

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidProduct()) return;

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("discount", form.discount);
      formData.append("stock", form.stock);

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }
      await axios.post("/api/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        images: "",
        discount: "",
        stock: "",
      })
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };



  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Create Product
        </h2>

        <p className="text-slate-500">
          Add new products to your store
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Product Name"
            className="
w-full
bg-slate-50
border
border-slate-200
rounded-xl
px-4
py-3
focus:ring-2
focus:ring-indigo-500
focus:border-indigo-500
outline-none
"
            name="name"
            value={name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            name="category"
            value={category}
            onChange={handleChange}
          />

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-lg"
          />


          <input
            type="number"
            name="discount"
            value={discount}
            onChange={handleChange}
            placeholder="Discount %"
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="number"
            name="stock"
            value={stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        <textarea
          placeholder="Description"
          className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          name="description"
          value={description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700  text-white px-8 py-3 md:w-auto  rounded-xl font-semibold transition"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default ProductForm;