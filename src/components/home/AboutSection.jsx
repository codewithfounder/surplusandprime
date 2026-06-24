import { Link } from "react-router-dom"
function AboutSection() {
    return (
        <>
            <section className="about-style-two sec-pad pt0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7" style={{ padding: '15px' }}>
                            <div className="about-content">
                                <h3 ><span>Welcome to Surplus & Prime Worldwide</span></h3>
                                <p className="tag-line"><span>Surplus and Prime Worldwide</span> FZ.LLC is an MNC company with its headquarters in the United Arab Emirates and a branch office in India.</p>
                                <p>Manufacturing and trading industries play a vital role in the global economy, connecting suppliers and buyers while enabling businesses to efficiently exchange surplus equipment, materials, and industrial resources worldwide.</p>
                                <div className="quote-box">
                                    <img src="images/quote.png" alt="Awesome Image" />
                                    <p>Many of our SELC-registered employees are frequently requested as preferred temporary staff for various services.</p>
                                    <h4>Tazeen Fatima, CEO</h4>
                                </div>
                                <p>Industries, the countries they reside in, and the economies of those countries are
                                    interlinked in a complex web of interdependence.</p>
                                <Link to="/about" className="view-more hvr-sweep-to-right">Learn about the services <i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="video-box">
                                <img src="images/16-copy.png" alt="Awesome Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="service-title">
                <div className="container">
                    <div className="sec-title light text-center">
                        <h3 className="phone"><span>Surplus & Prime Worldwide</span> provides the best products <br />for sustainable progress.</h3>
                    </div>
                </div>
            </section>
        </>
    )

}

export default AboutSection