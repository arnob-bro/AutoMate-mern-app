// src/components/AdminSidebar/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

export const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">


      <div className='sideBarLogo'>
        <h2 className='logo'>LOGO</h2>
        <h1 className='name'>Automate</h1>
      </div>

    <div className="underline"></div>

      <ul>
        <li>
          <NavLink to="/admin-page" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
        </li>
        <div className="underline" ></div>
        <li>
          <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>All Users</NavLink>
        </li>
         <div className="underline"></div>
         <li>
          <NavLink to="/items" className={({ isActive }) => (isActive ? 'active' : '')}>Parts</NavLink>
        </li>
         <div className="underline"></div>
        <li>
          <NavLink to="/Settings" className={({ isActive }) => (isActive ? 'active' : '')}>Settings</NavLink>
        </li>
         <div className="underline"></div>
      </ul>



    </div>
  );
};
