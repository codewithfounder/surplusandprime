import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Sidebar({ isOpen, closeSidebar }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [categories, setCategories] = useState([]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

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

    return (
        <>
            <section className={`hidden-sidebar side-navigation ${isOpen ? "open" : ""}`}>
                {/* <a href="#" className="close-button side-navigation-close-btn fa fa-times" onClick={closeSidebar}></a> */}
                <a
                    href="#"
                    className="close-button side-navigation-close-btn fa fa-times"
                    onClick={closeSidebar}
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        zIndex: 1000,
                        fontSize: "22px"
                    }}
                ></a>
                <div className="sidebar-content">

                    <div className="top-content" style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {/* <a href="index.html">
                            <img src="images/logo1.png" alt="Awesome Image" />
                        </a> */}
                        <a href="index.html" className="footer-logo-content" style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                            <img src="images/logo1.png" alt="Logo" style={{ height: '7rem' }} />
                            <h3 style={{ color: '#21aa47', margin: 0, fontSize: '2rem', textAlign: 'left' }}>Surplus and Prime <br /> Workdwide FZ LLC. <br /><span >GREENER TOMORROW</span></h3>
                        </a>
                        <a
                            href="#"
                            className="close-button side-navigation-close-btn fa fa-times"
                            onClick={closeSidebar}
                        ></a>
                    </div>

                    <nav className="nav-menu middle-content">
                        <ul className="navigation-box">

                            <li className="current">
                                <Link to="/">Home</Link>
                            </li>

                            <li>
                                <Link to="/about">About Us</Link>
                            </li>

                            <li>
                                <a href="project.html">Shop</a>
                            </li>
                            {/* SERVICES */}
                            <li>
                                <a href="#" onClick={() => toggleMenu("category")}>
                                    Category <span className="subnav-toggler fa fa-caret-down"></span>
                                </a>

                                <ul
                                    className="sub-menu"
                                    style={{ display: openMenu === "category" ? "block" : "none" }}
                                >
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

                            <li> <a href="contact.html">Contact Us</a> </li>

                            {/* Account */}
                            <li>
                                <a href="#" onClick={() => toggleMenu("account")}>
                                    Account <span className="subnav-toggler fa fa-caret-down"></span>
                                </a>

                                <ul
                                    className="sub-menu"
                                    style={{ display: openMenu === "account" ? "block" : "none" }}
                                >
                                        <li> <a href="404.html">Login</a> </li>
                                        <li> <a href="coming-soon.html">Register</a> </li>
                                        <li> <a href="project.html">Your Wishlist</a> </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    <div className="bottom-content">
                        <div className="social">
                            <a href="#" className="fab fa-facebook-f"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-google-plus-g"></a>
                            <a href="#" className="fab fa-instagram"></a>
                            <a href="#" className="fab fa-behance"></a>
                        </div>

                        <p className="copy-text">
                            © 2018 Industrio. <br />
                            made with <i className="fa fa-heart"></i> by themexriver
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Sidebar;
