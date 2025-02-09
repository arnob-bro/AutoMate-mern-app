import React from "react";
import { useLocation } from "react-router-dom";
import "./PartDetails.css";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

const PartDetails = () => {
  const location = useLocation();
  const part = location.state?.part;
  const navigate = useNavigate();

  const handlePartPurchase = (part) => {
    navigate(`/PurchasePart`, { state: { part } }); // Navigate to the details page
  };

  if (!part) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="part-details-container">
        <div className="part-image-section">
          <img
            src={part.image}
            alt={part.name}
            className="part-image-details"
          />
        </div>
        <div className="part-info-section">
          <h1>{part.name}</h1>
          <p>
            <strong>Price:</strong> ${part.price}
          </p>
          <p>
            <strong>Availability:</strong>{" "}
            {part.isAvailable === "Yes" ? "Available" : "Not Available"}
          </p>
          <p>
            <strong>Description:</strong> {part.shortDescription}
          </p>
          <p>
            <strong>Long Description:</strong> {part.longDescription}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePartPurchase(part);
            }}
          >
            Buy
          </button>
        </div>
        <div className="box4">
          <div className="contactUs">
            <h3>Contact Us</h3>
            <p>123, ABC Street, Dhaka-1000, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartDetails;
