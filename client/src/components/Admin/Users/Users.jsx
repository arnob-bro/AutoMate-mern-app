// src/components/Users.js

import React, { useState, useEffect } from "react";
import "./Users.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { FaSearch, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import {
  fetchAllUsers,
  updateUser,
  deleteUser,
  addUser,
} from "../../../api/adminPanel";

export const Users = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editingNewUserId, setEditingNewUserId] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserVehicle, setNewUserVehicle] = useState("");
  const [newUserBrand, setNewUserBrand] = useState("");
  const [newUserModel, setNewUserModel] = useState("");
  const [editValues, setEditValues] = useState({
    name: "",
    email: "",
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditValues({
      name: user.name,
      email: user.email,
      vehicleType: user.vehicleType,
      vehicleBrand: user.vehicleBrand,
      vehicleModel: user.vehicleModel,
    });
  };

  const handleSave = async (id) => {
    try {
      await updateUser(id, editValues);
      const updatedUsers = users.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            ...editValues,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setEditUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = () => {
    setEditingNewUserId(users.length + 1);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserVehicle("");
    setNewUserBrand("");
    setNewUserModel("");
  };

  const handleSaveNewUser = async () => {
    try {
      const newUser = {
        id: users.length + 1,
        name: newUserName,
        email: newUserEmail,
        vehicleType: newUserVehicle,
        vehicleBrand: newUserBrand,
        vehicleModel: newUserModel,
      };
      await addUser(newUser);
      setUsers([...users, newUser]);
      setEditingNewUserId(null);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    switch (selectedFilter) {
      case "name":
        return user.name.toLowerCase().includes(searchLower);
      case "email":
        return user.email.toLowerCase().includes(searchLower);
      case "vehicle":
        return user.vehicleType.toLowerCase().includes(searchLower);
      case "brand":
        return user.vehicleBrand.toLowerCase().includes(searchLower);
      case "model":
        return user.vehicleModel.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <div className="users">
      <AdminSidebar />
      <div className="usersContents">
        <h1>All Users</h1>
        <div className="UserSearch">
          <div className="searchWrapper">
            <span className="icon">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder={`Search by ${selectedFilter}`}
              className="searchInput"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filterSelectButton">
            <select
              className="filterSelect"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="vehicle">Vehicle</option>
              <option value="brand">Brand</option>
              <option value="model">Model</option>
            </select>
          </div>
        </div>
        <div className="usersTable">
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Vehicle</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {editUserId === user._id ? (
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editUserId === user._id ? (
                      <input
                        type="text"
                        value={editValues.email}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editUserId === user._id ? (
                      <input
                        type="text"
                        value={editValues.vehicleType}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            vehicleType: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.vehicleType
                    )}
                  </td>
                  <td>
                    {editUserId === user._id ? (
                      <input
                        type="text"
                        value={editValues.vehicleBrand}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            vehicleBrand: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.vehicleBrand
                    )}
                  </td>
                  <td>
                    {editUserId === user._id ? (
                      <input
                        type="text"
                        value={editValues.vehicleModel}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            vehicleModel: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.vehicleModel
                    )}
                  </td>
                  <td>
                    {editUserId === user._id ? (
                      <div className="button">
                        <button onClick={() => handleSave(user._id)}>
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <div className="button">
                        <button onClick={() => handleEdit(user)}>
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="button">
                      <button onClick={() => handleDelete(user._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {editingNewUserId && (
                <tr>
                  <td>{users.length + 1}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Vehicle"
                      value={newUserVehicle}
                      onChange={(e) => setNewUserVehicle(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Brand"
                      value={newUserBrand}
                      onChange={(e) => setNewUserBrand(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Model"
                      value={newUserModel}
                      onChange={(e) => setNewUserModel(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveNewUser}>
                      <FaSave />
                    </button>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="addUserButton">
          <button onClick={handleAddUser}>+ Add User</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
