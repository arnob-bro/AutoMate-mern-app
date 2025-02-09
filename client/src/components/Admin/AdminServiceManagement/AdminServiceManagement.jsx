import React, { useState, useEffect } from "react";
import {
  fetchAllServices,
  updateServiceCostApi,
  addNewServiceApi,
} from "../../../Api/adminPanel";
import "./AdminServiceManagement.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";

function AdminServiceManagement() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    vehicleType: "Car",
    cost: 0,
  });

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await fetchAllServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    loadServices();
  }, []);

  const handleServiceCostChange = (id, cost) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === id ? { ...service, cost: cost } : service
      )
    );
  };

  const updateServiceCost = async (id) => {
    try {
      const serviceToUpdate = services.find((service) => service._id === id);
      await updateServiceCostApi(id, serviceToUpdate.cost);
      alert("Service cost updated");
    } catch (error) {
      console.error("Error updating service cost:", error);
    }
  };

  const addNewService = async () => {
    try {
      await addNewServiceApi(newService);
      setNewService({ name: "", vehicleType: "Car", cost: 0 });
      alert("New service added");
      const servicesData = await fetchAllServices();
      setServices(servicesData);
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-service-container">
        <h1>Existing Services</h1>
        <div className="service-table-container">
          <table className="service-table">
            <thead>
              <tr>
                <th style={{ color: "black" }}>Name</th>
                <th style={{ color: "black" }}>Type</th>
                <th style={{ color: "black" }}>Cost</th>
                <th style={{ color: "black" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td style={{ color: "black" }}>{service.name}</td>
                  <td style={{ color: "black" }}>{service.vehicleType}</td>
                  <td>
                    <input
                      type="number"
                      value={service.cost}
                      onChange={(e) =>
                        handleServiceCostChange(service._id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => updateServiceCost(service._id)}>
                      Update Cost
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ color: "orange" }}>Add New Service</h2>
        <div className="new-service-form">
          <label style={{ color: "black" }}>
            Name:
            <input
              type="text"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
          </label>
          <label style={{ color: "black" }}>
            Type:
            <select
              value={newService.vehicleType}
              onChange={(e) =>
                setNewService({ ...newService, vehicleType: e.target.value })
              }
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </select>
          </label>
          <label style={{ color: "black" }}>
            Cost:
            <input
              type="number"
              value={newService.cost}
              onChange={(e) =>
                setNewService({ ...newService, cost: e.target.value })
              }
            />
          </label>
          <button onClick={addNewService}>Add Service</button>
        </div>
      </div>
    </div>
  );
}

export default AdminServiceManagement;
