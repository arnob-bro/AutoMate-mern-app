import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Services.css";
import Navbar from "../navbar/navbar";
import { fetchAllServices, makeServiceRequest } from "../../Api/userPanel";
import { useNavigate } from "react-router-dom";

function Services() {
  const [carServices, setCarServices] = useState([]);
  const [bikeServices, setBikeServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [message, setMessage] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [comments, setComments] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchAllServices(); // Await here
        console.log(data);
        const services = data;
        setCarServices(
          services.filter((service) => service.vehicleType === "Car")
        );
        setBikeServices(
          services.filter((service) => service.vehicleType === "Bike")
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const totalCost = selectedServices.reduce(
    (sum, service) => sum + service.cost,
    0
  );

  const handleBookingRequest = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const params = {
        customerId: userData._id,
        customerEmail: userData.email,
        customerPhone,
        selectedServices,
        totalCost,
        bookingDate, // Send booking date to the server
        comments,
      };
      const data = await makeServiceRequest(params);

      setMessage(data.message);
      alert(data.message);
      navigate("/service-history");
    } catch (error) {
      console.error("Error booking services:", error);
      setMessage("There was an error sending the booking request.");
    }
  };

  return (
    <div className="services-page">
      <Navbar />
      <div className="services-container">
        <h1>Car and Bike Services</h1>
        <div className="service-cards">
          <div className="service-card">
            <h2>Car Services</h2>
            <ul>
              {carServices.map((service) => (
                <li style={{ color: "black" }} key={service.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceSelect(service)}
                    />
                    {`${service.name} - $${service.cost}`}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="service-card">
            <h2>Bike Services</h2>
            <ul>
              {bikeServices.map((service) => (
                <li style={{ color: "black" }} key={service.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceSelect(service)}
                    />
                    {`${service.name} - $${service.cost}`}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="total-cost">
          <h2>Total Cost: ${totalCost}</h2>
        </div>

        <div className="date-input">
          <label>
            Booking Date:
            <br />
            <input
              type="date"
              value={bookingDate}
              min={
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </label>
        </div>

        <div className="phone-input">
          <label>
            Mobile Number:
            <br />
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter your mobile number"
            />
          </label>
        </div>

        <div className="comments-section">
          <label>
            Comments:
            <br />
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your comments"
            />
          </label>
        </div>

        <button
          className="booking-button"
          onClick={handleBookingRequest}
          disabled={
            selectedServices.length === 0 || !customerPhone || !bookingDate
          } // Ensure date is selected
        >
          Request Booking
        </button>

        {message && <p className="message">{message}</p>}
      </div>
      <div className="box4">
        <div className="contactUs">
          <h3>Contact Us</h3>
          <p>123, ABC Street, Dhaka-1000, Bangladesh</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
