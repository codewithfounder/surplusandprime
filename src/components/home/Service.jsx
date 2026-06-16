import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";

const services = [
  {
    img: "images/oilgas.png",
    icon: "industrio-icon-gas-station-1",
    title1: "Oil & Gas",
    title2: "Products",
    slug: "oil-gas",
    color: "#21aa47"
  },
  {
    img: "images/service-3-2.jpg",
    icon: "industrio-icon-flasks",
    title1: "Chemical",
    title2: "Products",
    slug: "chemical",
    color: "#31DAF9"
  },
  {
    img: "images/hq.jpg",
    icon: "industrio-icon-industry",
    title1: "Heavy Equipments",
    title2: "Products",
    slug: "heavy-equipments",
    coor: "white"
  },
];

function Service() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/category/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  // Match services with categories by slug
  const matchedServices = services
    .map((service) => {
      const category = categories.find(
        (cat) => cat.slug === service.slug
      );

      return category
        ? {
          ...service,
          categoryId: category.id, // Change to category.categoryId if your API uses a different key
        }
        : null;
    })
    .filter(Boolean);

  return (
    <section className="service-style-four">
      <div className="container">
        <div className="row">
          {matchedServices.map((service, index) => (
            <div
              className="col-md-4 col-sm-6 col-xs-12"
              key={index}
            >
              <div className="single-service-style-four">
                <div className="img-box">
                  <img
                    src={service.img}
                    alt={service.title1}
                  />

                  <div className="box">
                    <div className="content">
                      <i className={service.icon}></i>

                      <h3>
                        <span style={{ color: "#21aa47 !important" }}>{service.title1}</span>
                        <br />
                        {service.title2}
                      </h3>

                      <Link
                        to={`/category/${service.categoryId}`}
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