import React from "react";

const contactInfos = [
  {
    icon: "industrio-icon-phone-call",
    title: "WhatsApp",
    value: "+919068799470"
  },
  {
    icon: "industrio-icon-envelope",
    title: "Email us",
    value: "info@surplusandprime.com"
  }
];

function Contact_info() {
  return (
    <section className="contact-info-style-one">
      <div className="container">
        <div className="row">

          {/* Left Content */}
          <div className="col-md-6">
            <div className="title">
              <h3>
                Get in <span>touch</span>
              </h3>

              <p>
                You will find yourself working in a true partnership that results
                in an incredible experience, and an end product that is the best.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-6">
            <div className="contact-infos" style={{ display: "flex", justifyContent: "space-between", flexWrap: 'wrap' }}>

              {contactInfos.map((item, index) => (
                <div className="single-contact-infos" key={index} style={{ marginLeft: "0" }}>

                  <div className="icon-box">
                    <i className={item.icon}></i>
                  </div>

                  <div className="text-box">
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact_info;