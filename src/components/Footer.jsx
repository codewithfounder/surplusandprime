import React, { useState, useEffect } from "react";
import BASE_URL from "../config/api";
import { Link } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Contact Us", path: "/contact" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/register" }
];

function Footer() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/category/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data.slice(0, 6));
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const formatCategoryName = (name) => {
    const formatted =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return formatted.length > 21
      ? `${formatted.slice(0, 21)}...`
      : formatted;
  };

  return (
    <footer className="site-footer fixed-footer">

      {/* Main Footer */}
      <div className="main-footer">
        <div className="container">
          <div className="row">

            {/* About */}
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="footer-widget about-widget">

                <Link to="/" className="footer-logo-content" style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                  <img src="/images/surplus.png" alt="Logo" style={{ width: '31rem' }} />
                </Link>

                <h3>About us</h3>

                <p>
                  Many of our SELC registered employees are requested as main
                  preferred temporary staff when a service.
                </p>

              </div>
            </div>

            {/* Links */}
            <div className="col-md-2 col-sm-6 col-xs-12">
              <div className="footer-widget links-widget">

                <div className="title">
                  <h3>Links</h3>
                </div>

                <ul className="links-list">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link to={`/${link.path}`}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            {/* Category */}
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="footer-widget services-widget">

                <div className="title">
                  <h3>Category</h3>
                </div>

                <ul className="links-list">
                  <ul className="links-list">
                    <ul className="links-list">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link to={`/category/${category.id}`}>
                            {formatCategoryName(category.Title)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ul>
                </ul>

              </div>
            </div>

            {/* Subscribe */}
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="footer-widget subscribe-widget">

                <h3>Subscribe Today</h3>

                <p>
                  Many of our SELC registered employees are requested as main
                </p>

                <form action="#" className="subscribe-form">

                  <input
                    type="text"
                    placeholder="Email Address"
                  />

                  <button
                    type="submit"
                    className="hvr-sweep-to-right"
                  >
                    Subscribe
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bottom-footer">
        <div className="container">

          <div className="left-text pull-left col-xs-12">
            <p className="text-center">© Copyright Surplus and Prime WorldWide FZ LLC.
              <span style={{ color: '#21aa47' }}>GREENER TOMORROW</span> 2026. All right reserved.</p>
          </div>

          {/* <div className="right-text pull-right">
            <p>Created by Surplus and Prime World</p>
          </div> */}

        </div>
      </div>

    </footer>
  );
}

export default Footer;