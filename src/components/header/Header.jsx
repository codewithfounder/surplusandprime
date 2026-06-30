import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BASE_URL from "../../config/api";
import "./header.css";

function Header({ logo }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = () => {
            const uid = localStorage.getItem("uid");
            setLoggedIn(!!uid); // true if uid exists
        };

        checkLogin();

        window.addEventListener("storage", checkLogin);

        return () => {
            window.removeEventListener("storage", checkLogin);
        };
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}/category/get_cat`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setCategories(data.data);
                }
            })
            .catch((err) => console.error("Category API Error:", err));
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("uid"); // ✅ important

        setLoggedIn(false);

        window.dispatchEvent(new Event("storage"));

        navigate("/login");
    };

    const toTitleCase = (text) => {
        return text
            ?.toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <>
            {/* 🔷 TOPBAR */}
            <div className="topbar">
                <div className="topbar-left text-center topbar-contnt">
                    <div className="dasktop">
                        <span><i className="fa fa-map-marker-alt"></i> FDR K-2058, Compass Bldg, Al Hamra, RAK, UAE</span>
                    </div>
                    <div className="phone">
                        <span><i className="fa fa-map-marker-alt"></i> FDR K-2058,Al Hamra, RAK, UAE</span>
                    </div>
                    <div className="topbar-leftcontent">
                        <span><i className="fa fa-envelope"></i> info@surplusandprime.com</span>
                        <span className="timeline"><i className="fa fa-clock"></i> Monday to Saturday - 9:00 AM to 5PM</span>
                    </div>
                </div>
            </div>

            {/* 🔷 NAVBAR */}
            <div className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                {/* HAMBURGER */}
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className="fa fa-bars"></i>
                </div>

                {/* NAV LINKS */}
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li
                        className="dropdown"

                    >
                        <span onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(
                                activeDropdown === "category"
                                    ? null
                                    : "category"
                            );
                        }}>Industry ▾</span>
                        <ul className={`submenu ${activeDropdown === "category" ? "show" : ""}`}>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <li key={cat.id} className="category-item">
                                        <Link to={`/product-category/${cat.slug}`} className="category-title">
                                            {cat.name}
                                        </Link>

                                        {cat.subcategories?.length > 0 && (
                                            <ul className="subcategory-list">
                                                {cat.subcategories.slice(0, 3).map((sub) => (
                                                    <li key={sub.id}>
                                                        <Link
                                                            to={`/product-category/${cat.slug}/${sub.slug}`}
                                                        >
                                                            {toTitleCase(sub.name)}
                                                        </Link>
                                                    </li>
                                                ))}

                                                {cat.subcategories.length > 4 && (
                                                    <li>
                                                        <Link to={`/product-category/${cat.slug}`}>
                                                            View All →
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No categories</li>
                            )}
                        </ul>
                    </li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li
                        className="dropdown"
                        onClick={() =>
                            setActiveDropdown(activeDropdown === "more" ? null : "more")
                        }
                    >
                        <span>Accounts ▾</span>

                        <ul className={`submenu ${activeDropdown === "more" ? "show" : ""}`}>
                            <li><Link to="/register">Buyer</Link></li>
                            <li><Link to="https://surplusandprime.com/SURPLUS/admin/auth/signin">Seller</Link></li>

                            {/* Example: Logout option */}
                            {loggedIn && (
                                <li>
                                    <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                                        Logout
                                    </span>
                                </li>
                            )}
                        </ul>
                    </li>

                    {/* Mobile Extra Links */}
                    <li className="mobile-extra">
                        {loggedIn ? (
                            <Link to="/dashboard">
                                <button className="pickup-btn"><i className="fa fa-user-shield admin-icon"></i>Login</button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button className="pickup-btn"><i className="fa fa-lock lock-icon"></i></button>
                            </Link>
                        )}

                        {/* <div className="contact-box">
                            <i className="fa fa-phone phone-icon"></i>
                            <div>
                                <h4 className="contact-tel">+91 9211018618</h4>
                                <p>Need assistance?</p>
                            </div>
                        </div> */}
                    </li>
                </ul>

                {/* Desktop Right */}
                <div className="nav-right desktop-only">
                    {/* <i className="fa fa-search search-icon"></i> */}

                    {loggedIn ? (
                        <Link to="/dashboard">
                            <button className="pickup-btn"><i className="fa fa-user-shield admin-icon"></i></button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className="pickup-btn"><i className="fa fa-lock lock-icon"></i> Login</button>
                        </Link>
                    )}

                    {/* <div className="contact-box">
                        <i className="fa fa-phone phone-icon"></i>
                        <div>
                            <p style={{ margin: 0 }}>Need assistance?</p>
                            <h4 style={{ margin: 0 }}>+91 </h4>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Header;