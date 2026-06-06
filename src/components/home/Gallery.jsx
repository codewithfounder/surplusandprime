import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";

import "flickity/css/flickity.css";
import "./Gallery.css";

const flickityOptions = {
  wrapAround: true,
  autoPlay: 3000,
  pauseAutoPlayOnHover: false,
  pageDots: true,
  prevNextButtons: true,
  contain: true,

  // smooth movement
  selectedAttraction: 0.015,
  friction: 0.25,

  // better performance
  draggable: true,
  adaptiveHeight: false,
  imagesLoaded: true
};

const getCategoryText = (title) => {
  return `Explore our wide range of ${title} with premium quality and best prices.`;
};

export default function Gallery() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/category/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data.slice(0, 10));
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div className="category-container">
      <div className="container"> {/* 👈 added */}

        <div className="sec-title section-title text-center">
          <h3 style={{ color: 'blue' }}>Our Category</h3>
          <p style={{ marginTop: "5px" }}>Connecting Global Industries Through Trusted <br />Surplus Equipment Solutions</p>
        </div>

        <Flickity
          className="gallery"
          elementType="div"
          options={flickityOptions}
        >
          {categories.map((item) => (
            <div className="gallery-cell" key={item.id}>
              <Link to={`/category/${item.id}`}>
                <img
                  src={`${item.image_url}${item.Image}`}
                  alt={item.Title}
                />

                <div className="content">
                  <h3 style={{ fontSize: "1.6rem", fontWeight: "bold" }}>{item.Title}</h3>
                </div>

                <div className="hover-overlay">
                  <h3 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>{item.Title}</h3>
                  <p style={{ color: "#ffffff", padding: "10px", textAlign: "center", fontSize: '1.4rem', lineHeight: '1.6rem' }}>
                    {getCategoryText(item.Title)}
                  </p>
                  <span className="btn">View Details</span>
                </div>

              </Link>
            </div>
          ))}
        </Flickity>

      </div>
    </div>
  );
}