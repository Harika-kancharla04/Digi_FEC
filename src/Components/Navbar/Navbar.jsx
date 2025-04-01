import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css"; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear stored token
        navigate("/", { replace: true }); // Redirect and replace history
        window.location.reload(); // Optional: force reload to clear any cached state
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <h2>Digital You</h2>
                </div>
                <button className="hamburger" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <nav className={`sidebar-links ${isOpen ? "show" : ""}`}>
                <NavLink to="/home" className="sidebar-item" onClick={() => setIsOpen(false)}>
                    <FaHome className="icon" /> Home
                </NavLink>
                <NavLink to="/profile" className="sidebar-item" onClick={() => setIsOpen(false)}>
                    <FaUser className="icon" /> Profile
                </NavLink>
                <NavLink to="/resume" className="sidebar-item" onClick={() => setIsOpen(false)}>
                    <FaUser className="icon" /> Resume
                </NavLink>
                <NavLink to="/settings" className="sidebar-item" onClick={() => setIsOpen(false)}>
                    <FaCog className="icon" /> Settings
                </NavLink>
                <div className="logout-mobile">
                    <button className="sidebar-item" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" /> Logout
                    </button>
                </div>
            </nav>
            <div className="logout">
                <button className="sidebar-item" onClick={handleLogout}>
                    <FaSignOutAlt className="icon" style={{color:"black"}}/> Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
