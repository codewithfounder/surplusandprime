import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Enquiry() {
    const navigate = useNavigate();
    const { productId } = useParams();
    
    const [enquiryProducts, setEnquiryProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingLogin, setIsCheckingLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        quantity: 1
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    
    // ✅ Check login status on component mount
    useEffect(() => {
        const checkLogin = async () => {
            const uid = localStorage.getItem("uid");
            
            if (!uid) {
                // Not logged in, redirect to login with return URL
                localStorage.setItem("redirectAfterLogin", "/enquiry" + (productId ? `/${productId}` : ""));
                navigate("/login");
                return;
            }
            
            // Verify user with backend
            try {
                const userId = atob(uid);
                const response = await fetch(`http://localhost/virendra/SURPLUS/website/auth/get_user?id=${userId}`);
                const data = await response.json();
                
                if (data.status) {
                    setIsLoggedIn(true);
                    // Auto-fill form with user data
                    setFormData({
                        name: data.user.full_name || "",
                        email: data.user.email || "",
                        phone: data.user.mobile || "",
                        message: "",
                        quantity: 1
                    });
                } else {
                    // Invalid user, clear localStorage and redirect to login
                    localStorage.removeItem("uid");
                    localStorage.setItem("redirectAfterLogin", "/enquiry" + (productId ? `/${productId}` : ""));
                    navigate("/login");
                }
            } catch (error) {
                console.error("Login check error:", error);
                localStorage.setItem("redirectAfterLogin", "/enquiry" + (productId ? `/${productId}` : ""));
                navigate("/login");
            } finally {
                setIsCheckingLogin(false);
            }
        };
        
        checkLogin();
    }, [navigate, productId]);
    
    // Load products from localStorage
    useEffect(() => {
        if (isLoggedIn) {
            const storedProducts = JSON.parse(localStorage.getItem("enquiryProduct")) || [];
            
            // If productId is in URL, filter that specific product
            if (productId) {
                const specificProduct = storedProducts.find(p => p.id.toString() === productId);
                if (specificProduct) {
                    setEnquiryProducts([specificProduct]);
                } else {
                    setEnquiryProducts(storedProducts);
                }
            } else {
                setEnquiryProducts(storedProducts);
            }
        }
    }, [isLoggedIn, productId]);
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Remove product from enquiry list
    const removeProduct = (productIdToRemove) => {
        const updatedProducts = enquiryProducts.filter(p => p.id !== productIdToRemove);
        setEnquiryProducts(updatedProducts);
        localStorage.setItem("enquiryProduct", JSON.stringify(updatedProducts));
        
        // If no products left, show message
        if (updatedProducts.length === 0) {
            setSubmitStatus(null);
        }
    };
    
    // Update quantity for a product
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        const updatedProducts = enquiryProducts.map(p => 
            p.id === productId ? { ...p, quantity: newQuantity } : p
        );
        setEnquiryProducts(updatedProducts);
        localStorage.setItem("enquiryProduct", JSON.stringify(updatedProducts));
    };
    
    // Calculate total items
    const totalItems = enquiryProducts.reduce((sum, p) => sum + (p.quantity || 1), 0);
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (enquiryProducts.length === 0) {
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus(null), 3000);
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // Get user ID from localStorage
        const uid = localStorage.getItem("uid");
        const userId = uid ? atob(uid) : null;
        
        // Prepare enquiry data
        const enquiryData = {
            user_id: userId,
            customer_info: formData,
            products: enquiryProducts.map(p => ({
                id: p.id,
                title: p.Title || p.title || p.name,
                quantity: p.quantity || 1,
                price: p.price || "N/A",
                seller_name: p.saller || p.seller || "N/A"
            })),
            submitted_at: new Date().toISOString()
        };
        
        try {
            // Send to backend API
            const response = await fetch("http://localhost/virendra/SURPLUS/website/enquiry/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enquiryData)
            });
            
            const text = await response.text();

            const data = JSON.parse(text);
            if (data.status) {
                setSubmitStatus("success");
                // Clear localStorage after successful submission
                localStorage.removeItem("enquiryProduct");
                // Reset form
                setFormData(prev => ({
                    ...prev,
                    message: ""
                }));
                // Clear products after 2 seconds and redirect
                setTimeout(() => {
                    navigate("/enquiry-success");
                }, 2000);
            } else {
                setSubmitStatus("error");
                setTimeout(() => setSubmitStatus(null), 3000);
            }
        } catch (error) {
            console.error("Enquiry submission error:", error);
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Continue shopping
    const handleContinueShopping = () => {
        navigate("/products");
    };
    
    // Show loading while checking login
    if (isCheckingLogin) {
        return (
            <section className="enquiry-section py-5">
                <div className="container" style={{ marginTop: "8rem", marginBottom: "6rem" }}>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="loading-spinner">
                                <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Checking login status...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
    // If no products
    if (enquiryProducts.length === 0 && submitStatus !== "success") {
        return (
            <section className="enquiry-section py-5">
                <div className="container" style={{ marginTop: "8rem", marginBottom: "6rem" }}>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="empty-cart">
                                <i className="fas fa-shopping-cart" style={{ fontSize: "64px", color: "#ccc", marginBottom: "20px" }}></i>
                                <h3>No Products in Enquiry List</h3>
                                <p>You haven't added any products for enquiry yet.</p>
                                <button 
                                    className="btn btn-success" 
                                    onClick={handleContinueShopping}
                                    style={{ padding: "10px 30px", marginTop: "20px" }}
                                >
                                    Browse Products
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
    return (
        <section className="enquiry-section py-5">
            <div className="container" style={{ marginTop: "8rem", marginBottom: "6rem" }}>
                <div className="row">
                    <div className="col-12">
                        <h2 style={{ marginBottom: "30px", fontWeight: "600" }}>
                            Product Enquiry
                        </h2>
                    </div>
                </div>
                
                <div className="row">
                    {/* Products List - Left Column */}
                    <div className="col-md-7">
                        <div className="enquiry-products">
                            <h4 style={{ marginBottom: "20px" }}>
                                Products ({totalItems} items)
                            </h4>
                            
                            {enquiryProducts.map((product, index) => (
                                <div key={product.id} className="enquiry-product-item">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                            <img 
                                                src={product.image_url || product.images?.[0] || "https://via.placeholder.com/300x180?text=No+Image"} 
                                                alt={product.Title || product.title || product.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px"
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <h6 style={{ fontWeight: "600", marginBottom: "5px" }}>
                                                {product.Title || product.title || product.name}
                                            </h6>
                                            <small className="text-muted">
                                                Product ID: {product.id}
                                            </small>
                                            <br />
                                            <small className="text-muted">
                                                {/* Seller: {product.saller || product.seller || "N/A"} */}
                                                Seller: Surplusandprime
                                            </small>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="quantity-control">
                                                <label style={{ fontSize: "14px", marginRight: "10px" }}>Qty:</label>
                                                <input 
                                                    type="number" 
                                                    min="1"
                                                    value={product.quantity || 1}
                                                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                                    style={{
                                                        width: "60px",
                                                        padding: "5px",
                                                        borderRadius: "4px",
                                                        border: "1px solid #ddd"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-end">
                                            <button 
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeProduct(product.id)}
                                                style={{ padding: "5px 15px" }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    {index < enquiryProducts.length - 1 && <hr />}
                                </div>
                            ))}
                            
                            <div className="mt-4">
                                <button 
                                    className="btn btn-outline-secondary"
                                    onClick={handleContinueShopping}
                                >
                                    ← Add More Products
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Enquiry Form - Right Column */}
                    <div className="col-md-5">
                        <div className="enquiry-form">
                            <h4 style={{ marginBottom: "20px" }}>
                                Your Information
                            </h4>
                            
                            {submitStatus === "success" && (
                                <div className="alert alert-success">
                                    <strong>Success!</strong> Your enquiry has been submitted successfully. Redirecting...
                                </div>
                            )}
                            
                            {submitStatus === "error" && (
                                <div className="alert alert-danger">
                                    <strong>Error!</strong> Failed to submit enquiry. Please try again.
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        style={{ padding: "10px" }}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        style={{ padding: "10px" }}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        style={{ padding: "10px" }}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">
                                        Message / Special Requirements
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Please provide any additional information about your requirements..."
                                        style={{ padding: "10px" }}
                                    ></textarea>
                                </div>
                                
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="terms"
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="terms">
                                            I agree to the terms and conditions *
                                        </label>
                                    </div>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-success w-100"
                                    disabled={isSubmitting}
                                    style={{ padding: "12px", fontSize: "16px" }}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Styles */}
            <style jsx="true">{`
                .enquiry-products {
                    background: #fff;
                    padding: 25px;
                    border-radius: 8px;
                    border: 1px solid #eee;
                    margin-bottom: 20px;
                }
                
                .enquiry-product-item {
                    padding: 15px 0;
                }
                
                .enquiry-form {
                    background: #fff;
                    padding: 25px;
                    border-radius: 8px;
                    border: 1px solid #eee;
                }
                
                .form-control:focus {
                    border-color: #21aa47;
                    box-shadow: 0 0 0 0.2rem rgba(33, 170, 71, 0.25);
                }
                
                .quantity-control input {
                    text-align: center;
                }
                
                .quantity-control input:focus {
                    outline: none;
                    border-color: #21aa47;
                }
                
                .empty-cart {
                    padding: 60px 20px;
                    background: #fff;
                    border-radius: 8px;
                    border: 1px solid #eee;
                }
                
                .loading-spinner {
                    padding: 60px 20px;
                    background: #fff;
                    border-radius: 8px;
                    border: 1px solid #eee;
                }
                
                @media (max-width: 768px) {
                    .enquiry-product-item .row > div {
                        margin-bottom: 10px;
                    }
                    
                    .enquiry-product-item .text-end {
                        text-align: left !important;
                    }
                }
            `}</style>
        </section>
    );
}

export default Enquiry;