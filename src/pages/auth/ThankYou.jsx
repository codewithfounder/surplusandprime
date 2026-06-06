import React, {useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ThankYou = () => {
     const navigate = useNavigate();
     const location = useLocation();

      useEffect(() => {
        if (!location.state?.fromRegister) {
            navigate("/login");
        }
    }, [location, navigate]);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center"
        }}>
            <img
                src='./images/thankyou.png'
                alt="Success"
            />

            <h1>🎉 Thank You!</h1>
            <p>Your registration has been completed successfully.</p>
            <p>You can now log in and access your dashboard.</p>
            <button
                onClick={() => navigate("/login")}
                style={{
                    marginTop: "20px",
                    padding: "0.5rem 25px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "0",
                    cursor: "pointer"
                }}
            >
                Go to Login
            </button>
        </div>
    );
};

export default ThankYou;