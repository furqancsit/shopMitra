import axios from "axios";
import { useState } from "react";



const OrderStatusUpdate = ({ order }) => {
  const [status, setStatus] = useState(order.orderStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(`/api/order/updatestatus/${order._id}`, { status });

      alert("Order status updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">
        Order #{order._id.slice(-6)}
      </h2>

      <div className="flex flex-col gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="Pending">Pending</option>
          {/* <option value="Processing">Processing</option> */}
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          {/* <option value="Cancelled">Cancelled</option> */}
        </select>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
};

export default OrderStatusUpdate;