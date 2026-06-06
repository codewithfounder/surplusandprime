import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.css"

function Testimonials() {
  const testimonials = [
    {
      quoteImg: "images/quote.png",
      title: "Best Consulting Firm",
      text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidu laboreetde magnam aliquam quaerat voluptatem.",
      name: "Alexa Reid",
      position: "Synopsis",
      avatar: "images/team-2-1.jpg",
    },
    {
      quoteImg: "images/quote.png",
      title: "Nice People",
      text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidu laboreetde magnam aliquam quaerat voluptatem.",
      name: "Alva Goldhammer",
      position: "Synopsis",
      avatar: "images/team-2-2.jpg",
    },
    {
      quoteImg: "images/quote.png",
      title: "Best Consulting Firm",
      text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidu laboreetde magnam aliquam quaerat voluptatem.",
      name: "Alexa Reid",
      position: "Synopsis",
      avatar: "images/team-2-1.jpg",
    },
    {
      quoteImg: "images/quote.png",
      title: "Nice People",
      text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidu laboreetde magnam aliquam quaerat voluptatem.",
      name: "Alva Goldhammer",
      position: "Synopsis",
      avatar: "images/team-2-2.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,

    mobileFirst: true,

    slidesToShow: 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="tsm-testimonials">
      <div className="tsm-container">
        <div className="tsm-sec-title text-center">
          <h3>
            Review from <span>our clients</span>
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eius mod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <Slider {...settings}>
          {testimonials.map((testi, index) => (
            <div className="tsm-item" key={index}>
              <div className="tsm-card">
                <img
                  src={testi.quoteImg}
                  className="tsm-quote-img"
                  alt="Quote"
                />

                <h3>{testi.title}</h3>

                <p>{testi.text}</p>

                <div className="tsm-name-box">
                  <div className="tsm-img-box">
                    <img src={testi.avatar} alt={testi.name} />
                  </div>

                  <div className="tsm-text-box">
                    <h4>{testi.name}</h4>
                    <span>{testi.position}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;