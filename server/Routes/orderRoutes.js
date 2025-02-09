const express = require("express");
const {
  placeOrder,
  getOrderHistory,
  initiateSSLCommerzPayment,
} = require("../Controllers/orderController");
const { verifyJWT } = require("../middlewares/verifyJWT");
const orderModel = require("../models/orderModel");

const orderRouter = express.Router();

orderRouter.post("/place-order", /*verifyJWT,*/ placeOrder);
orderRouter.get("/history", /*verifyJWT,*/ getOrderHistory);
orderRouter.post(
  "/payment/success/:tranId",
  /*verifyJWT,*/ async (req, res) => {
    console.log(req.params.tranId);
    const order = await orderModel.findById(req.params.tranId);
    order.paymentStatus = "Completed";
    await order.save();
    res.redirect(
      `http://localhost:5173/order/payment/success/${req.params.tranId}`
    );
  }
);

module.exports = orderRouter;
