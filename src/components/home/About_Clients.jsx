import React from "react";
import Slider from "react-slick";

const testimonials = [
   {
    img: "images/team-2-1.jpg",
    text: "Manufacturing industry became a key sector of production and labour in European and North American countries during the Industrial Revolution, upsetting previous mercantile and feudal economies.",
    name: "Farnandoz Biki",
    role: "CEO"
  },
  {
    img: "images/team-2-2.jpg",
    text: "Manufacturing industry became a key sector of production and labour in European and North American countries during the Industrial Revolution, upsetting previous mercantile and feudal economies.",
    name: "Farnandoz Biki",
    role: "CEO"
  },
  {
    img: "images/team-2-3.jpg",
    text: "Manufacturing industry became a key sector of production and labour in European and North American countries during the Industrial Revolution, upsetting previous mercantile and feudal economies.",
    name: "Farnandoz Biki",
    role: "CEO"
  }
];

function About_Clients() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <section className="testimonials-style-three">
      <div className="container">

        <div className="sec-title light">
          <h3>
            Clients say <span>about us</span>
          </h3>
        </div>

        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div className="single-testimonials-style-three" key={index}>
              <div className="img-box">
                <img src={item.img} alt={item.name} />
              </div>

              <div className="text-box">
                <p>{item.text}</p>
                <div className="client-name">
                  - <span>{item.name},</span> {item.role}
                </div>
              </div>
            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
}

export default About_Clients;