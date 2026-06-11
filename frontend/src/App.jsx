import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import Men from './pages/Men'
import Women from './pages/Women'
import Login from './pages/Login'
import Signup from './pages/Signup.jsx'

import Dashboard from './user/Dashboard.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminRoute from './routes/AdminRoute.jsx'

import { useAuth } from './context/authcontext.jsx'

import ProductDetails from './pages/ProductDetials.jsx'
import Checkout from './pages/CheckOut.jsx'
import MyOrders from './user/MyOrders.jsx'
import UpdateProfile from './user/UpdateProfile.jsx'
import Profile from './user/Profile.jsx'

function App() {
  const { user } = useAuth()

  const notify = () =>
    toast.success("Success Notification!", { position: "top-right" })

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <ToastContainer autoClose={3000} newestOnTop />

      <Router>
        <Navbar />

        <main className="flex-grow w-full">
          <div className="max-w-7xl mx-auto px-4">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />

              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/my-orders" element={<MyOrders />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
              <Route path="/profile" element={<Profile />} />

              {/* Protected user dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard user={user} />
                  </ProtectedRoute>
                }
              />

              {/* Admin route */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
        </main>

        <Footer />
      </Router>
    </div>
  )
}

export default App