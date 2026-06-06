import React from "react";
import { Link } from "react-router-dom";
const services = [
  {
    img: "images/oilgas.png",
    icon: "industrio-icon-gas-station-1",
    title1: "Oil & Gas",
    title2: "Products"
  },
  {
    img: "images/service-3-2.jpg",
    icon: "industrio-icon-flasks",
    title1: "Chemical",
    title2: "Products"
  },
  {
    img: "images/service-3.png",
    icon: "industrio-icon-industry",
    title1: "Heavy Equipments",
    title2: "Products"
  }
];

function Service() {
  return (
    <section className="service-style-four">
      <div className="container">
        <div className="row">

          {services.map((service, index) => (
            <div
              className="col-md-4 col-sm-6 col-xs-12"
              key={index}
            >
              <div className="single-service-style-four">
                <div className="img-box">

                  <img
                    src={service.img}
                    alt="Service"
                  />

                  <div className="box">
                    <div className="content">

                      <i className={service.icon}></i>

                      <h3>
                        <span>{service.title1}</span> <br />
                        {service.title2}
                      </h3>

                      <Link
                        to="/shop"
                        className="more hvr-sweep-to-right"
                      >
                        Shop Now <i className="fa fa-arrow-right"></i>
                      </Link>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Service;