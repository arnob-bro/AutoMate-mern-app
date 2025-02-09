import React, { useState, useEffect } from "react";
import { fetchOrders, updateOrder } from "../../../Api/adminPanel"; // Import API functions
import "./AdminOrderManagement.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton from Material-UI
import Box from "@mui/material/Box";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Number of orders per page

  useEffect(() => {
    fetchOrderData();
  }, [paymentStatusFilter, statusFilter, page]);

  const fetchOrderData = async () => {
    setLoading(true); // Start loading
    try {
      const data = await fetchOrders(
        page,
        limit,
        paymentStatusFilter,
        statusFilter
      );
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handlePaymentStatusChange = (orderId, newPaymentStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, paymentStatus: newPaymentStatus }
          : order
      )
    );
  };

  const handleUpdateOrder = async (order) => {
    try {
      await updateOrder(order._id, order.paymentStatus, order.status);
      alert("Order updated");
      fetchOrderData(); // Refresh orders after update
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Failed to update order");
    }
  };

  const handleFilterChange = (e) => {
    setPaymentStatusFilter(e.target.value);
    setPage(1); // Reset to first page when filtering
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset to first page when filtering
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-order-container">
        <div className="top-navigation">
          <h1>Admin Order Management</h1>
          <form>
            <label>Payment Status: </label>
            <select value={paymentStatusFilter} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>

            <label>Status: </label>
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
              <option value="Refunded">Refunded</option>
              <option value="Closed">Closed</option>
            </select>
          </form>
        </div>

        {loading ? (
          // Skeleton Loader
          <Box>
            {[...Array(5)].map((_, index) => (
              <Box key={index} mb={2} p={2} className="admin-order-item">
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="40%" height={30} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="rectangular" width="100%" height={50} />
              </Box>
            ))}
          </Box>
        ) : orders.length === 0 ? (
          <p style={{ color: "black" }}>No orders available.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="admin-order-item">
              <div className="details">
                <p>
                  <span id="info1">Order Id: </span>
                  {order._id}
                </p>
                <p>
                  <span id="info1">User email: </span>
                  {order.userId ? order.userId.email : "N/A"}
                </p>
                <p>
                  <span id="info1">Username: </span>
                  {order.userId ? order.userId.name : "N/A"}
                </p>
                <p>
                  <span id="info1">Part name: </span>
                  {order.partId.name}
                </p>
                <p>
                  <span id="info1">Part quantity: </span>
                  {order.quantity}
                </p>
                <p>
                  <span id="info1">Total Price: </span>
                  {order.totalPrice}
                </p>

                <p>
                  <span id="info1">Payment Status: </span>
                </p>
                <select
                  value={order.paymentStatus}
                  onChange={(e) =>
                    handlePaymentStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>

                <p>
                  <span id="info1">Status: </span>
                </p>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Closed">Closed</option>
                </select>
                <button onClick={() => handleUpdateOrder(order)}>
                  Update Order
                </button>
              </div>
            </div>
          ))
        )}

        <div className="pagination">
          {page > 1 && (
            <button onClick={() => setPage(page - 1)}>Previous</button>
          )}
          {page < totalPages && (
            <button onClick={() => setPage(page + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;
