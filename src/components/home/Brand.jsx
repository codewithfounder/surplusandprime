import React from "react";
import Slider from "react-slick";

const brands = [
  "/images/brand/brand1.png",
  "/images/brand/brand2.png",
  "/images/brand/brand3.png",
  "/images/brand/brand4.png",
  "/images/brand/brand1.png",
  "/images/brand/brand2.png",
  "/images/brand/brand3.png"
  // "brands-icon-codecanyon",
  // "brands-icon-envato",
  // "brands-icon-graphicriver",
  // "brands-icon-photodune",
  // "brands-icon-themeforest",
  // "brands-icon-videohive",
  // "brands-icon-audiojungle",
];

function Brand() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4000,
    cssEase: "linear",
    pauseOnHover: false,
    swipe: false
  };

  return (
    <section className="brand-carousel-area home-three">
      <div className="container">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div className="item" key={index}>
              <img src={brand} className={brand} style={{width: '15rem'}}/>
            </div>
          ))}
        </Slider>
      </div>

      {/* Inline CSS */}
      <style>{`
        .brand-carousel-area .item {
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .brand-carousel-area .item i {
          font-size: 15rem; /* default desktop size */
          transition: transform 0.3s ease;
        }

        .brand-carousel-area .item:hover i {
          transform: scale(1.1);
        }

        .slick-slide {
          overflow: visible;
        }

        .slick-track {
          display: flex;
          align-items: center;
        }

        /* Only on phones: shrink font size */
        @media (max-width: 768px) {
          .brand-carousel-area .item i {
            font-size: 5rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Brand;