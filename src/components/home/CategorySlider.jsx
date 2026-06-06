import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./category.css";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/category/view`) // 🔥 change URL
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 👈 default mobile
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  return (
    <section className="category-slider">
      <div className="container">

        <div className="sec-title section-title text-center">
          <h3>Our <span>Category</span></h3>
          <p>Connecting Global Industries Through Trusted Surplus Equipment Solutions</p>
        </div>

        <Slider {...settings}>
          {categories.map((item) => (
            <div key={item.id} className="category-card">

              <div className="card">
                {/* API Image */}
                <img src={`${item.image_url}${item.Image}`} alt={item.name} />

                <div className="overlay-bottom">
                  <h3>{item.Title}</h3>
                </div>

                <div className="overlay-hover">
                  <h3 style={{ fontSize: '10px !important' }}>{item.Title}</h3>
                  {/* <p dangerouslySetInnerHTML={{ __html: item.Short_description }} style={{ lineHeight: '1px' }} /> */}
                  <div
                    dangerouslySetInnerHTML={{ __html: item.Short_description }}
                    style={{
                      color: '#333',
                      fontSize: '11px',
                      lineHeight: '1px'
                    }}
                  />
                  <Link to={`/category/${item.id}`} className="btn btn-light">
                    View More
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
}