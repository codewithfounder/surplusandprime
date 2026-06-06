import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BASE_URL from "../../config/api";

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

    return (
        <>
            {/* 🔷 TOPBAR */}
            <div className="topbar">
                <div className="topbar-left text-center topbar-contnt">
                    <div>
                        <span><i className="fa fa-map-marker-alt"></i> FDR K-2058, Compass Bldg, Al Hamra, RAK, UAE</span>
                    </div>
                    <div className="topbar-leftcontent">
                        <span><i className="fa fa-envelope"></i> info@surplusandprime.com</span>
                        <span><i className="fa fa-clock"></i> Monday to Saturday - 9:00 AM to 5PM</span>
                    </div>
                </div>
            </div>

            {/* 🔷 NAVBAR */}
            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt="logo" />
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
                        onClick={() =>
                            setActiveDropdown(activeDropdown === "category" ? null : "category")
                        }
                    >
                        <span>Industry ▾</span>
                        <ul className={`submenu ${activeDropdown === "category" ? "show" : ""}`}>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <li key={cat.id}>
                                        <Link to={`/category/${cat.id}`}>
                                            {cat.name}
                                        </Link>
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
                            <li><Link to="http://localhost/virendra/SURPLUS/admin/auth/signin">Seller</Link></li>

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

                        <div className="contact-box">
                            <i className="fa fa-phone phone-icon"></i>
                            <div>
                                <h4 className="contact-tel">+91 9211018618</h4>
                                <p>Need assistance?</p>
                            </div>
                        </div>
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

                    <div className="contact-box">
                        <i className="fa fa-phone phone-icon"></i>
                        <div>
                            <p style={{ margin: 0 }}>Need assistance?</p>
                            <h4 style={{margin:0}}>+91 9211018618</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;