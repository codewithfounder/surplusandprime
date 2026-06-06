import React from "react";

const teamMembers = [
  {
    img: "images/team-2-1.jpg",
    name: "Clyde Ohayon",
    role: "Founder & CEO"
  },
  {
    img: "images/team-2-2.jpg",
    name: "Gregory Oransky",
    role: "Managing Director"
  },
  {
    img: "images/team-2-3.jpg",
    name: "Jordan Weyker",
    role: "Chief Technical Officer"
  },
  {
    img: "images/team-2-1.jpg",
    name: "Clyde Ohayon",
    role: "Founder & CEO"
  },
  {
    img: "images/team-2-2.jpg",
    name: "Gregory Oransky",
    role: "Managing Director"
  },
  {
    img: "images/team-2-3.jpg",
    name: "Jordan Weyker",
    role: "Chief Technical Officer"
  }
];

function Team() {
  return (
    <section className="team-style-two pt5 sec-pad">
      <div className="container">

        {/* Title */}
        <div className="sec-title text-center">
          <h3>
            <span>Team & Advisory</span> board
          </h3>

          <p>
            You will find yourself working in a true partnership that results in
            an incredible <br />
            experience, and an end product that is the best.
          </p>
        </div>

        {/* Team Carousel */}
        <div className="team-style-two-carousel owl-carousel owl-theme">

          {teamMembers.map((member, index) => (
            <div className="item" key={index}>
              <div className="single-team-style-two">

                <div className="img-box">
                  <img src={member.img} alt={member.name} />

                  <div className="social">
                    <div className="inner">
                      <a href="#" className="fab fa-facebook-f"></a>
                      <a href="#" className="fab fa-twitter"></a>
                      <a href="#" className="fab fa-linkedin-in"></a>
                    </div>
                  </div>

                </div>

                <div className="text-box">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Team;