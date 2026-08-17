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
            setLoggedIn(!!uid);
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
        localStorage.removeItem("uid");
        setLoggedIn(false);
        window.dispatchEvent(new Event("storage"));
        navigate("/login");
    };

    const toTitleCase = (text) => {
        return text
            ?.toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Toggle dropdown for mobile
    const toggleMobileDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    // Navigation links configuration
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About Us" },
        { to: "/shop", label: "Shop" },
        { to: "/contact", label: "Contact Us" },
    ];

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

                {/* NAV LINKS - Desktop */}
                <ul className={`nav-links desktop-nav ${menuOpen ? "active" : ""}`}>
                    {/* Regular Navigation Links - Desktop */}
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to}>{link.label}</Link>
                        </li>
                    ))}

                    {/* Categories Dropdown - Desktop */}
                    <li className="dropdown">
                        <span >Categories ▾</span>
                        <ul className={`submenu ${activeDropdown === "category" ? "show" : ""}`}>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <li key={cat.id} className="category-items">
                                        <Link to={`/product-category/${cat.slug}`} className="category-title">
                                            {cat.name}
                                        </Link>

                                        {cat.subcategories?.length > 0 && (
                                            <ul className="subcategory-lists">
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

                    {/* Accounts Dropdown - Desktop */}
                    <li className="dropdown">
                        <span >Accounts ▾</span>
                        <ul className={`submenu ${activeDropdown === "more" ? "show" : ""}`} style={{ width: "fit-content", background: "#ffffff", transform: "translate(0%)" }}>
                            <li className="acc"><Link to="/register">Buyer</Link></li>
                            <li className="acc"><Link to="https://surplusandprime.com/SURPLUS/admin/auth/signin">Seller</Link></li>
                            {loggedIn && (
                                <li style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem", borderRadius: '1rem' }}>
                                    <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                                        Logout
                                    </span>
                                </li>
                            )}
                        </ul>
                    </li>

                    {/* Desktop Right Actions */}
                    <li className="desktop-actions">
                        {loggedIn ? (
                            <Link to="/dashboard">
                                <button className="pickup-btn"><i className="fa fa-user-shield admin-icon"></i></button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button className="pickup-btn"><i className="fa fa-lock lock-icon"></i> Login</button>
                            </Link>
                        )}
                    </li>
                </ul>

                {/* NAV LINKS - Mobile */}
                <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>
                    {/* Regular Navigation Links - Mobile */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="mobile-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Industry Dropdown - Mobile */}
                    <div className="mobile-dropdown">
                        <div
                            className="mobile-dropdown-toggle"
                            onClick={() => toggleMobileDropdown("category-mobile")}
                        >
                            Categories <span className="dropdown-arrow">▾</span>
                        </div>
                        <div className={`mobile-submenu ${activeDropdown === "category-mobile" ? "show" : ""}`}>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <div key={cat.id} className="mobile-category-item">
                                        <Link
                                            to={`/product-category/${cat.slug}`}
                                            className="mobile-category-title"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {cat.name}
                                        </Link>

                                        {cat.subcategories?.length > 0 && (
                                            <div className="mobile-subcategory-list">
                                                {cat.subcategories.slice(0, 3).map((sub) => (
                                                    <Link
                                                        key={sub.id}
                                                        to={`/product-category/${cat.slug}/${sub.slug}`}
                                                        className="mobile-subcategory-link"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        {toTitleCase(sub.name)}
                                                    </Link>
                                                ))}

                                                {cat.subcategories.length > 4 && (
                                                    <Link
                                                        to={`/product-category/${cat.slug}`}
                                                        className="mobile-view-all"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        View All →
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="mobile-no-categories">No categories</div>
                            )}
                        </div>
                    </div>

                    {/* Accounts Dropdown - Mobile */}
                    <div className="mobile-dropdown">
                        <div
                            className="mobile-dropdown-toggle"
                            onClick={() => toggleMobileDropdown("more-mobile")}
                        >
                            Accounts <span className="dropdown-arrow">▾</span>
                        </div>
                        <div className={`mobile-submenu ${activeDropdown === "more-mobile" ? "show" : ""}`}>
                            <Link to="/register" className="mobile-link" onClick={() => setMenuOpen(false)}>
                                Buyer
                            </Link>
                            <Link to="https://surplusandprime.com/SURPLUS/admin/auth/signin" className="mobile-link" onClick={() => setMenuOpen(false)}>
                                Seller
                            </Link>
                            {loggedIn && (
                                <span onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }} className="mobile-link" style={{ cursor: "pointer" }}>
                                    Logout
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="mobile-actions">
                        {loggedIn ? (
                            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                                <button className="pickup-btn"><i className="fa fa-user-shield admin-icon"></i> Dashboard</button>
                            </Link>
                        ) : (
                            <Link to="/login" onClick={() => setMenuOpen(false)}>
                                <button className="pickup-btn"><i className="fa fa-lock lock-icon"></i> Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;