import { useEffect, useState } from "react";

// import { Eye } from "lucide-react";
import OrderStatusUpdate from "./OrderStatusUpdate";
import axios from "axios";

const Applicants = () => {
  const [customers, setCustomers] = useState([]);

  const getOrderDetails = async () => {
    try {
      const res = await axios.get("/api/order/orders");


      setCustomers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium border border-indigo-100">
              Order Management
            </span>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Customer Orders
            </h1>

            <p className="mt-2 text-slate-500">
              Manage customer purchases and order status.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <p className="text-xs text-slate-500">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900">
                {customers.length}
              </p>
            </div>
          </div>
        </div>

        {customers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 h-72 flex flex-col items-center justify-center shadow-sm">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
              📦
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-900">
              No Orders Found
            </h3>

            <p className="text-slate-500 mt-2">
              Orders will appear here when customers place them.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {customers.map((order) => (
              <div
                key={order._id}
                className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                shadow-sm
                hover:shadow-xl
                hover:border-indigo-200
                transition-all
                duration-300
                overflow-hidden
              "
              >
                <div className="p-6">
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                    {/* Customer */}
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {order.shippingAddress?.fullName
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {order.shippingAddress?.fullName}
                        </h3>

                        <p className="text-slate-500 mt-1">
                          {order.user?.email}
                        </p>

                        <p className="text-sm text-slate-400">
                          {order.shippingAddress?.phone}
                        </p>

                        <div className="mt-4">
                          <OrderStatusUpdate
                            key={order._id}
                            order={order}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Order ID
                        </p>

                        <p className="font-semibold text-slate-900 mt-1">
                          #{order._id.slice(-6)}
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Amount
                        </p>

                        <p className="font-bold text-emerald-600 mt-1">
                          ₹{order.totalAmount}
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Payment
                        </p>

                        <p className="font-medium text-slate-900 mt-1">
                          {order.paymentMethod}
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Status
                        </p>

                        <span
                          className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold
                          ${order.status === "delivered"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.status === "shipped"
                                ? "bg-blue-50 text-blue-700"
                                : order.status === "cancelled"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-amber-50 text-amber-700"
                            }
                        `}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Payment Status
                    </p>

                    <p
                      className={`font-medium ${order.paymentStatus === "paid"
                          ? "text-emerald-600"
                          : "text-amber-600"
                        }`}
                    >
                      {order.paymentStatus}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      Total Amount
                    </p>

                    <p className="text-2xl font-bold text-slate-900">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;