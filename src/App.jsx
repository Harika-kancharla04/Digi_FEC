import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Login/Login";
import LandingPage from "./LandingPage";
import Navbar from "./Components/Navbar/Navbar"; 
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/Settings/Settings";
import Home from "./Components/Dashboard/Home";
import NotFound from "./NotFound";
import Resume from "./Components/Resume/Resume";


function App() {
    const location = useLocation(); 

    
    const hideNavbar = location.pathname === "/login" || location.pathname === "/";

    return (
        <>
            {!hideNavbar && <Navbar />}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/resume" element={<Resume />} />
            </Routes>
        </>
    );
}

export default App;
