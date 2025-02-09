import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import HomePage from "./components/home/HomePage";
import { AdminPage } from "./components/Admin/DashBoard/AdminPage.jsx";
import { AboutUs } from "./components/AboutUs/AboutUs.jsx";
import { Users } from "./components/Admin/Users/Users.jsx";
import SearchParts from "./components/SearchItems";
import PartDetails from "./components/SearchItems/PartDetails.jsx";
import { AdminParts } from "./components/Admin/AdminParts/AdminParts.jsx";
import { AdminPartDetails } from "./components/Admin/AdminParts/AdminPartDetails.jsx";
import PurchasePart from "./components/purchaseParts/PurchasePart.jsx";
import AdminOrderManagement from "./components/Admin/AdminOrderManagement/AdminOrderManagement.jsx";
import OrderHistory from "./components/orderHistory/OrderHistory.jsx";
import Services from "./components/Services/Services.jsx";
import AdminServiceRequestManagement from "./components/Admin/AdminServiceRequestManagement/AdminServiceRequestManagement.jsx";
import AdminServiceManagement from "./components/Admin/AdminServiceManagement/AdminServiceManagement.jsx";
import Profile from "./components/UserProfile/UserProfile.jsx";
import ServiceHistory from "./components/ServiceHistory/ServiceHistory.jsx";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/parts" element={<SearchParts />} />
        <Route path="/parts/:id" element={<PartDetails />} />
        <Route path="/adminParts" element={<AdminParts />} />
        <Route path="/adminParts/details" element={<AdminPartDetails />} />
        <Route path="/PurchasePart" element={<PurchasePart />} />
        <Route
          path="/AdminOrderManagement"
          element={<AdminOrderManagement />}
        />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/admin/service-request-management"
          element={<AdminServiceRequestManagement />}
        />
        <Route
          path="/admin/service-management"
          element={<AdminServiceManagement />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/service-history" element={<ServiceHistory />} />
        <Route
          path="/order/payment/success/:tranId"
          element={<PaymentSuccess />}
        />
      </Routes>
    </Router>
  );
}

export default App;
