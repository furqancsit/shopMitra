import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import Applicants from "../components/Applicants";
import { useOrders } from "../context/orderContext";
import { useAuth } from "../context/authcontext";
const AdminDashboard = () => {
  const { orders, loading, products } = useOrders();
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-6">

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-2">
            Manage products, orders and customers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <Package className="text-blue-600 mb-2" />
            <h3 className="text-slate-500 text-sm">
              Products
            </h3>
            <p className="text-2xl font-bold">{loading ? "Loading..." : products.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <ShoppingBag className="text-green-600 mb-2" />
            <h3 className="text-slate-500 text-sm">
              Orders
            </h3>
            <p className="text-2xl font-bold">{loading ? "Loading..." : orders.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <Users className="text-purple-600 mb-2" />
            <h3 className="text-slate-500 text-sm">
              Customers
            </h3>
            <p className="text-2xl font-bold">{loading ? "Loading..." : user._id?.length || 0}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <LayoutDashboard className="text-orange-600 mb-2" />
            <h3 className="text-slate-500 text-sm">
              Revenue
            </h3>
            <p className="text-2xl font-bold">
              ₹24,500
            </p>
          </div>

        </div>

        {/* Components */}
        <div className="space-y-8">
          <ProductForm />
          <ProductTable />
          <Applicants />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;