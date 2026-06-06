import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    // ✅ Check if user is already logged in
    useEffect(() => {
        const uid = localStorage.getItem("uid");
        if (uid) {
            // User already logged in, redirect to dashboard or return URL
            const redirectUrl = localStorage.getItem("redirectAfterLogin");
            if (redirectUrl) {
                localStorage.removeItem("redirectAfterLogin");
                navigate(redirectUrl);
            } else {
                navigate("/dashboard");
            }
        }
    }, [navigate]);

    // ✅ Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    // ✅ Handle login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost/virendra/SURPLUS/website/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.status) {
                const encodedId = btoa(data.user.id.toString());
                localStorage.setItem("uid", encodedId);
                
                // Check if there's a redirect URL
                const redirectUrl = localStorage.getItem("redirectAfterLogin");
                if (redirectUrl) {
                    localStorage.removeItem("redirectAfterLogin");
                    navigate(redirectUrl);
                } else {
                    navigate("/dashboard");
                }
            } else {
                setError(data.message);
            }

        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-image" style={{ display: "flex", justifyContent: 'center' }}>
                    <img src="./images/logo.jpeg" alt="Login" style={{ width: '30rem' }} />
                </div>

                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Login to continue</p>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="input-group password-group">
                        <label>Password</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{ width: "100%" }}
                            />
                            <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer"
                                }}
                            >
                                {showPassword
                                    ? <img src="./images/show.png" alt="show" />
                                    : <img src="./images/hide.png" alt="hide" />}
                            </span>
                        </div>
                    </div>

                    {/* Button */}
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                {/* Register */}
                <p className="register-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="register-link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;