import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EnquirySuccess() {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Auto redirect to products page after 5 seconds
        const timer = setTimeout(() => {
            navigate("/products");
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [navigate]);
    
    return (
        <section className="success-section py-5">
            <div className="container" style={{ marginTop: "8rem", marginBottom: "6rem" }}>
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="success-card">
                            <div className="success-icon">
                                <i className="fas fa-check-circle" style={{ fontSize: "80px", color: "#21aa47" }}></i>
                            </div>
                            <h2 style={{ marginTop: "20px", fontWeight: "600" }}>
                                Enquiry Submitted Successfully!
                            </h2>
                            <p style={{ fontSize: "18px", color: "#666", marginTop: "15px" }}>
                                Thank you for your interest. Our team will get back to you within 24 hours.
                            </p>
                            <div className="success-details" style={{ marginTop: "30px" }}>
                                <p>
                                    <strong>What happens next?</strong>
                                </p>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    <li>✓ You will receive a confirmation email shortly</li>
                                    <li>✓ Our team will review your requirements</li>
                                    <li>✓ We'll contact you via phone or email within 24 hours</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <button 
                                    className="btn btn-success"
                                    onClick={() => navigate("/products")}
                                    style={{ padding: "10px 30px", marginRight: "10px" }}
                                >
                                    Continue Shopping
                                </button>
                                <button 
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate("/")}
                                    style={{ padding: "10px 30px" }}
                                >
                                    Go to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx="true">{`
                .success-card {
                    background: #fff;
                    padding: 50px;
                    border-radius: 8px;
                    border: 1px solid #eee;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                
                .success-details ul li {
                    margin: 10px 0;
                    font-size: 16px;
                }
                
                @media (max-width: 768px) {
                    .success-card {
                        padding: 30px 20px;
                    }
                }
            `}</style>
        </section>
    );
}

export default EnquirySuccess;