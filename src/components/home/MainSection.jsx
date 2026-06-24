import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroSlider.css";

const slides = [
  {
    image: "/images/12.png",
    title: "We will provide the best Products World Wide.",
    description:
      "We are the best guarenteed company to serve you. We are dedicated to help you any time.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    image: "/images/4.jpeg",
    title: "We will provide the best Products World Wide.",
    description:
      "We are the best guarenteed company to serve you. We are dedicated to help you any time.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    image: "/images/1.jpeg",
    title: "We will provide the best Products World Wide.",
    description:
      "We are the best guarenteed company to serve you. We are dedicated to help you any time.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
];

function MainSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <>
      {/* Marquee */}
      <div className="spw-marquee-wrapper">
        <div className="spw-marquee-track">
          <span>
            Welcome to Surplus & Prime Worldwide | Our website is currently under construction and will be launching soon. For any inquiries, please contact us directly via phone, WhatsApp, or email. Thank you for your patience and support.
          </span>

          <span>
            Welcome to Surplus & Prime Worldwide | Our website is currently under construction and will be launching soon. For any inquiries, please contact us directly via phone, WhatsApp, or email. Thank you for your patience and support.
          </span>
        </div>
      </div>

      {/* Hero Slider */}
      <section className="vhb-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`vhb-slide ${index === currentSlide ? "vhb-active" : ""
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="vhb-slide-image"
            />

            <div className="vhb-overlay"></div>

            <div className="vhb-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>

              <Link
                to={slide.buttonLink}
                className="vhb-button"
              >
                {slide.buttonText}
                <i className="fa fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}

        <button
          className="vhb-nav vhb-prev"
          onClick={prevSlide}
        >
          &#10094;
        </button>

        <button
          className="vhb-nav vhb-next"
          onClick={nextSlide}
        >
          &#10095;
        </button>

        <div className="vhb-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`vhb-dot ${index === currentSlide ? "vhb-dot-active" : ""
                }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default MainSection;