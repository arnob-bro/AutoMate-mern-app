import React from "react";
import "./AboutUs.css";
import Navbar from "../navbar/navbar";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons

export const AboutUs = () => {
  return (
    <div className="about-us">
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to Automate, your trusted partner for vehicle services in
          Bangladesh. At Automate, we understand that your vehicle is more than
          just a mode of transportation; it’s a vital part of your daily life.
          With a commitment to excellence and customer satisfaction, we offer a
          comprehensive range of services designed to keep your vehicle running
          smoothly.
        </p>

        <h2>Our Mission</h2>
        <p>
          At Automate, our mission is to provide reliable and high-quality
          vehicle services that ensure your safety and comfort on the road. We
          strive to exceed your expectations with every service we offer,
          delivering peace of mind through expert maintenance and repair
          solutions.
        </p>

        <h2>What Sets Us Apart</h2>
        <ul>
          <li>
            <strong>Bangladesh-Based Expertise:</strong> Proudly based in
            Bangladesh, Automate brings local knowledge and understanding to
            every service we provide. Our team of experienced mechanics is
            familiar with the unique challenges faced by vehicles in our local
            environment.
          </li>
          <li>
            <strong>Comprehensive Services:</strong> Whether you need routine
            maintenance, emergency repairs, or genuine parts, Automate is here
            to help. From bike parts and wash services to complete car service
            and wash options, we cover all your vehicle needs under one roof.
          </li>
          <li>
            <strong>Customer-Centric Approach:</strong> Your satisfaction is our
            priority. We prioritize clear communication, transparent pricing,
            and personalized service to ensure that every interaction with
            Automate is positive and productive.
          </li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          Ready to experience the Automate difference? Contact us today to
          schedule your next service or to inquire about our range of vehicle
          services. Visit our shop, give us a call, or connect with us on social
          media. We look forward to serving you!
        </p>

        <div className="contact-info">
          <p>
            <FaMapMarkerAlt /> <strong>Address:</strong> 123 road, Dhaka,
            Bangladesh
          </p>
          <p>
            <FaPhoneAlt /> <strong>Phone:</strong> +8801234567891
          </p>
          <p>
            <FaEnvelope /> <strong>Email:</strong> automate@gmail.com
          </p>
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

export default AboutUs;
