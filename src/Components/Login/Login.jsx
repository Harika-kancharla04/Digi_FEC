import "./Login.css";
import logo from "../../assets/Digital You BG.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const validatePassword = (password) => {
        const rules = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const isValid = Object.values(rules).every(rule => rule === true);

        if (!isValid) {
            let errorMessage = "Password must:";
            if (!rules.minLength) errorMessage += "\n- Be at least 8 characters long";
            if (!rules.hasUppercase) errorMessage += "\n- Contain at least one uppercase letter";
            if (!rules.hasLowercase) errorMessage += "\n- Contain at least one lowercase letter";
            if (!rules.hasNumber) errorMessage += "\n- Contain at least one number";
            if (!rules.hasSpecialChar) errorMessage += "\n- Contain at least one special character (!@#$%^&*(),.?\":{}|<>)";

            return {
                isValid: false,
                errorMessage
            };
        }

        return {
            isValid: true,
            errorMessage: ""
        };
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (isSignup) {
            const passwordValidation = validatePassword(formData.password);
            if (!passwordValidation.isValid) {
                setError(passwordValidation.errorMessage);
                return;
            }
        }

        try {
            if (isSignup) {
                const res = await axios.post("https://digi-be.onrender.com/api/signup", formData);
                toast.success(res.data.message);
                setIsSignup(false);
            } else {
                const res = await axios.post("https://digi-be.onrender.com/api/login", formData);
                toast.success(res.data.message);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("currentUser", JSON.stringify(res.data.user));
                localStorage.setItem("userId", res.data.user._id); 
                setTimeout(() => navigate("/home"), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    const handleGuestLogin = async () => {
        try {
            const res = await axios.post("https://digi-be.onrender.com/api/guest-login");
            toast.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("currentUser", JSON.stringify(res.data.user));
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem('userId', 'guest');
            setTimeout(() => navigate("/home"), 1500);
        } catch (err) {
            toast.error("Guest login failed.");
        }
    };

    return (
        <div className="maindiv">
            <div className="logo">
                <img src={logo} alt="Digital You Logo" />
            </div>
            <form className="loginform" onSubmit={handleSubmit}>
                <h2>{isSignup ? "Sign Up" : "Login"}</h2>

                {error && <p className="error" style={{
                    color: 'red', 
                    whiteSpace: 'pre-line', 
                    textAlign: 'left'
                }}>{error}</p>}

                {isSignup && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">{isSignup ? "Sign Up" : "Login"}</button><br />

                <button type="button" className="guest-btn" onClick={handleGuestLogin}>
                    Continue as Guest
                </button>

                <p onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
                </p>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
        </div>
    );
};

export default Login;