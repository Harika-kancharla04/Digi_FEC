import React, { useState } from "react";
import "./styles.css";
import logo from "./assets/Digital You logo.jpeg.jpg";
import logo1 from "./assets/Digital You BG.png";
import vdo from "./assets/WC vdo.mp4";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const dynamicContent = {

    brandName: "Digital You",
    tagline: "Your gateway to a powerful digital presence.",
    description: "Build, manage, and showcase your professional identity — all in one powerful, beautifully designed dashboard.Whether youre a student, a professional, or a freelancer, Digital You gives you the tools to present your journey with confidence.Your digital presence is more than just a resume — it’s your personal brand. With Digital You, make sure it always looks polished, professional, and up to date.",
    navLinks: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Why Digital You", href: "#why" },
        { label: "Contact", href: "#contact" }
    ],
    services: [
        {
            title: "Dynamic Profile Management",
            description: "Easily add and update personal information, experience, education, and projects — all organized in a modern, user-friendly interface."
        },
        {
            title: "Professional Resume Builder",
            description: "Instantly generate and download resumes in multiple clean, professional templates directly from your saved profile data."
        },
        {
            title: "Adaptive UI Preferences",
            description: "Make your dashboard truly yours — toggle between display modes and enjoy a smooth, tailored user interface."
        },
        {
            title: "Real-Time Data Storage",
            description: "Save your profile securely in local storage with live edit features — your information is always safe and readily accessible."
        },
        {
            title: "Smooth, Responsive Design",
            description: "Enjoy a fully responsive layout with smooth animations and seamless navigation, optimized for both desktop and mobile devices."
        }
    ],
    whyChooseUs: [
        {
            title:"Dynamic Resume Generation",
            description: "No more formatting struggles. We transform your profile data into ready-to-use, customizable resume templates."
        },
        {
            title: "All-in-One Profile Management",
            description: "About, Experience, Education, and Projects — manage everything from one intuitive dashboard."
        },
        {
            title: "Smart Design, Smooth Experience",
            description: "Clean UI, modern animations, dark mode, and seamless navigation make personal branding feel premium and effortless."
        },
        {
            title: "Your Data, Your Control",
            description: "Store your information securely and locally. Update and download whenever you want — we respect your privacy."
        },
        {
            title: "Built for Learners, Professionals & Dreamers",
            description: "Whether you’re applying for internships, your first job, or your next big opportunity — Digital You evolves with you."
        }
    ],
    aboutUs: [
        "Build, manage, and showcase your personal and professional profile from a single, dynamic dashboard.",
        "Create professional resumes in multiple templates directly from your profile data — ready to download in one click.",
        "Enjoy smooth navigation, animated transitions, dark mode, and a clean, responsive design.",
        "Your data stays secure in local storage. Edit, update, and manage your profile anytime — no third-party sharing.",
        "Whether you're a student, professional, or freelancer, Digital You evolves with you and helps you present your best self to the world."
    ]
};

const ServiceCard = ({ title, description }) => (
    <div className="service-card">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate=useNavigate();

    const navigateToLogin=()=>{
        navigate("/login")
    }


    return (
        <div className="container">
            <nav className="navbar" id="home">
                <div className="logo">
                    <img src={logo1} alt={`${dynamicContent.brandName} Logo`} />
                </div>
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {dynamicContent.navLinks.map((link, index) => (
                        <li key={index}><a href={link.href}>{link.label}</a></li>
                    ))}
                </ul>
            </nav>
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>{dynamicContent.brandName}</h1>
                        <p>{dynamicContent.tagline}</p>
                        <p>{dynamicContent.description}</p>
                        <button 
                            className="hero-cta-btn" 
                            onClick={navigateToLogin}
                        >
                            Get Started
                        </button>
                    </div>
                    <div className="hero-image">
                        <img src={logo} alt={`${dynamicContent.brandName} Logo`} />
                    </div>
                </div>
            </section>
         
            <section id="about" className="aboutsection">
                <video autoPlay loop muted playsInline>
                    <source src={vdo} type="video/mp4" />
                </video>
                <div className="aboutContent">
                    <h1>About Us</h1>
                    {dynamicContent.aboutUs.map((paragraph, index) => (
                        <p key={index}>&#10148; {paragraph}</p>
                    ))}
                </div>
            </section>
            <div className="scrolling-container">
                <div className="scrolling-text">
                    <strong>* Track Your Brand Like a Pro! * Insights That Make You Shine! *</strong>
                </div>
            </div>
            <section id="services" className="section">
                <h1>Our Services</h1>
                <div className="services">
                    {dynamicContent.services.map((service, index) => (
                        <ServiceCard key={index} title={service.title} description={service.description} />
                    ))}
                </div>
            </section>
            <section id="why">
                <div className="WhyChooseUs">
                    <div className="head">
                        <h1>Why Digital You</h1>
                    </div>
                    <div className="content">
                        {dynamicContent.whyChooseUs.map((item, index) => (
                            <div key={index} style={{ margin: "15px", padding: "15px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "white" }}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="contact" className="contact-section">
                <h2>Contact Us</h2>
                <p>We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>
                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="4" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
                <div className="social-media-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="icon" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="icon" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="icon" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="icon" />
                    </a>
                </div>
            </section>
            <footer className="footer">
                &copy; {new Date().getFullYear()} {dynamicContent.brandName}. All Rights Reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
