import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  // ================= GET PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${id}`);
        setItem(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  // ================= RAZORPAY SCRIPT =================
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // ================= PAYMENT =================
  const openRazorpay = async (order, razorpayOrder) => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      toast.error("Razorpay failed to load");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      order_id: razorpayOrder.id,

      handler: async (response) => {
        try {
          await axios.post("/api/order/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order._id,
          });

          toast.success("Payment successful");
          navigate("/success");
        } catch {
          toast.error("Payment verification failed");
        }
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  // ================= FORM HANDLER =================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = async () => {
    if (!item) return toast.error("Product not found");

    if (
      !form.fullName ||
      !form.phone ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const orderData = {
        items: [
          {
            product: item._id,
            quantity: 1,
            size: "M",
            color: "Black",
          },
        ],
        shippingAddress: form,
        paymentMethod: form.paymentMethod,
      };

      const res = await axios.post("/api/order/create", orderData, {
        withCredentials: true,
      });

      const { order, razorpayOrder } = res.data.data;

      if (form.paymentMethod === "COD") {
        toast.success("Order placed successfully");
        navigate("/success");
        return;
      }

      await openRazorpay(order, razorpayOrder);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading product...
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* ================= SHIPPING FORM ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">
            Shipping Details
          </h2>

          <div className="space-y-4">
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              name="street"
              placeholder="Street Address"
              value={form.street}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border p-3 rounded"
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI / Razorpay</option>
              <option value="CARD">Card / Razorpay</option>
            </select>
          </div>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded border"
            />

            <div>
              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-gray-500">Quantity: 1</p>

              <p className="text-green-600 font-bold text-xl">
                ₹{item.price}
              </p>
            </div>
          </div>

          <div className="border-t mt-6 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{item.price}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{item.price}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;