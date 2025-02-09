import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { placeOrder } from "../../Api/userPanel"; // Import the API function
import "./PurchasePart.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar"; // Adjust the path according to your structure

const PurchasePart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewingPart = location.state?.part; // Access part data passed from PartDetails
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [note, setNote] = useState("");

  const handleOrder = async () => {
    if (paymentOption != "") {
      try {
        const userId = JSON.parse(localStorage.getItem("userData"))._id;
        const response = await placeOrder(
          viewingPart._id,
          quantity,
          userId,
          paymentOption,
          note
        );

        const { paymentStatus } = response;
        setMessage(`Order placed successfully. `);
        navigate(`/OrderHistory`);
      } catch (error) {
        setMessage("Failed to place order");
      }
    } else {
      alert("Please fill up the fields");
    }
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar here */}
      <div className="purchase-part-container-PP">
        <div className="purchase-box-PP">
          {" "}
          {/* New wrapper for image and details */}
          <div className="image-section-PP">
            <img
              src={viewingPart.image}
              alt={viewingPart.name}
              className="part-image-PP"
            />
          </div>
          <div className="details-section-PP">
            <h2 className="section-title-PP">Purchase Part</h2>
            <div className="part-details-PP">
              <div className="part-name-PP">
                <strong>{viewingPart.name}</strong>
              </div>
              <div className="part-info-PP">
                Type: {viewingPart.vehicleType}
              </div>
              <div className="part-info-PP">
                Brand: {viewingPart.vehicleBrand}
              </div>
              <div className="part-price-PP">Price: ${viewingPart.price}</div>
            </div>
            <div className="input-section-PP">
              <label htmlFor="quantity" className="input-label-PP">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="quantity-input-PP"
              />
            </div>
            <div className="input-section-PP">
              <label htmlFor="payment-option" className="input-label-PP">
                Choose Payment Option:
              </label>
              <select
                id="payment-option"
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
                className="payment-dropdown-PP"
              >
                <option value="">Select Payment Option</option>
                {/* <option value="Cash On Delivery">Cash On Delivery</option> */}
                <option value="SSLCommerz">SSLCommerz</option>
              </select>
            </div>
            <div className="input-section-PP">
              <label htmlFor="note" className="input-label-PP">
                Add Note:
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="note-textarea-PP"
                rows="4"
                placeholder="Add any special instructions or notes here..."
              />
            </div>
            <button onClick={handleOrder} className="order-button-PP">
              Place Order
            </button>
            {message && <p className="order-message-PP">{message}</p>}
          </div>
        </div>
      </div>
      <div className="box4">
        <div className="contactUs">
          <h3>Contact Us</h3>
          <p>123, ABC Street, Dhaka-1000, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default PurchasePart;
