import React from "react";

const links = [
  "Home",
  "About Us",
  "Shop",
  "Contact Us",
  "Login",
  "Sign Up"
];

const category = [
  "Chemical & Petrochemicals",
  "Commercial Equipment",
  "Computer & Peripherals",
  "Electrical Utilities & Downstream",
  "Marine",
  "Oil & Gas",
  "Transportation / Vehicles/Mobile Assets",
  "Heavy Equipment",
  "Building Materials"
];

function Footer() {
  return (
    <footer className="site-footer fixed-footer">

      {/* Main Footer */}
      <div className="main-footer">
        <div className="container">
          <div className="row">

            {/* About */}
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="footer-widget about-widget">

                <a href="index.html" className="footer-logo-content" style={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
                  <img src="images/surplus.png" alt="Logo" style={{width: '31rem'}}/>
                </a>

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
                      <a href="#">{link}</a>
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
                  {category.map((category, index) => (
                    <li key={index}>
                      <a href="#">{category}</a>
                    </li>
                  ))}
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
<span style={{color: '#21aa47'}}>GREENER TOMORROW</span> 2026. All right reserved.</p>
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