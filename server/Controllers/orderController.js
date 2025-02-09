const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");
const Part = require("../models/partsModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "autom66f6a5da4f0b0";
const store_passwd = "autom66f6a5da4f0b0@ssl";
const is_live = false;

// Simulate payment process
const processPayment = async (totalPrice) => {
  // this should be replaced with actual payment gateway logic (like- Stripe, PayPal, Bkash)
  const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success
  return isPaymentSuccessful ? "Completed" : "Failed";
};

// Place a new order
const placeOrder = expressAsyncHandler(async (req, res) => {
  try {
    const { partId, quantity, userId, paymentOption, note } = req.body;

    const part = await Part.findById(partId);
    const user = await User.findById(userId);

    if (!part) {
      res.status(404).json({ message: "Part not found" });
      throw new Error("Part not found");
    }

    const totalPrice = part.price * quantity;

    const order = await orderModel.create({
      userId,
      partId,
      quantity,
      totalPrice,
      paymentOption,
      note,
      paymentStatus: "Pending",
    });

    // Payment gateway integration
    const data = {
      total_amount: totalPrice,
      currency: "BDT",
      tran_id: order._id.toString(),
      success_url: `http://localhost:5000/order/payment/success/${order._id.toString()}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: user.name,
      cus_email: user.email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    console.log(data);

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Extract the GatewayPageURL
      const GatewayPageURL = apiResponse.GatewayPageURL;
      console.log("Redirecting to: ", GatewayPageURL);

      // Respond with the payment URL
      res.status(201).json({ url: GatewayPageURL });
    });
  } catch (error) {
    console.log("error placing order", error);
    res.status(500).json({ message: "Error placing order" });
  }
});

//initiate ssl commerz payment gateway
const initiateSSLCommerzPayment = expressAsyncHandler(async (req, res) => {
  const { partId, quantity, userId, paymentOption, note } = req.body;
});

// Get user order history
const getOrderHistory = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: new mongoose.Types.ObjectId(req.query.userId) })
      .populate("partId")
      .sort({ _id: -1 });
    res.json(orders);
  } catch (error) {
    console.log("error fetching order history in server", error);
    res.status(500).json({ message: "Error fetching order history" });
  }
});

// Update order payment status (Admin functionality)
const updatePaymentStatus = expressAsyncHandler(async (req, res) => {
  const { orderId, paymentStatus } = req.body;

  const order = await orderModel.findById(orderId);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    throw new Error("Order not found");
  }

  order.paymentStatus = paymentStatus;
  await order.save();

  res.json(order);
});

module.exports = {
  placeOrder,
  getOrderHistory,
  updatePaymentStatus,
  initiateSSLCommerzPayment,
};
