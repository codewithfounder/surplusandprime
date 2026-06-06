import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Service() {
  const services = [
    {
      img: "images/service-1.png",
      icon: "industrio-icon-gas-station-1",
      title1: "Oil & Gas",
      title2: "Products",
    },
    {
      img: "images/service-3-2.jpg",
      icon: "industrio-icon-flasks",
      title1: "Chemical",
      title2: "Products",
    },
    {
      img: "images/service-3.png",
      icon: "industrio-icon-atomic",
      title1: "Heavy Equipments",
      title2: "Products",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick", // 🔥 disables slider on mobile
      },
    ],
  };

  return (
    <>
      <section className="service-style-four about-page">
        <div className="container">
          <div className="sec-title">
            <div className="row">
              <div className="col-md-4">
                <h3>
                  Why choose <span>Industrio</span> for your business
                </h3>
              </div>
              <div className="col-md-8">
                <p>
                  Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                  et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                  ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione vol.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {services.map((service, index) => (
              <div key={index} className="col-md-4 col-sm-6 col-xs-12">
                <div className="single-service-style-four">
                  <div className="img-box">
                    <img src={service.img} alt={service.title1} />

                    <div className="box">
                      <div className="content">
                        <i className={service.icon}></i>

                        <h3>
                          <span>{service.title1}</span> <br />
                          {service.title2}
                        </h3>

                        <Link to="/shop" className="more hvr-sweep-to-right">
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
    </>
  );
}

export default Service;