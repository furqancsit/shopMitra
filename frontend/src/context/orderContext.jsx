import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/order/my-orders", {
        withCredentials: true,
      });
      setOrders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/product/all");
      setProducts(res.data.data);
      return res;
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchOrders(), fetchProducts()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        products,
        loading,
        fetchOrders,
        fetchProducts,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }

  return context;
};