import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/login/Login';
import HomePage from './components/home/HomePage';
import { AdminPage } from './components/Admin/DashBoard/AdminPage.jsx';
import { AboutUs } from './components/AboutUs/AboutUs.jsx';
import { Users } from './components/Admin/Users/Users.jsx';
import SearchParts from './components/SearchItems';
import { AdminParts } from './components/Admin/AdminParts/AdminParts.jsx';
import { AdminPartDetails } from './components/Admin/AdminParts/AdminPartDetails.jsx';
import { PartsProvider } from './components/Admin/PartsContext';

function App() {
  return (
    <PartsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/parts" element={<SearchParts />} />
          <Route path="/adminParts" element={<AdminParts />} />
          <Route path="/adminParts/details" element={<AdminPartDetails />} />
        </Routes>
      </Router>
    </PartsProvider>
  );
}

export default App;
