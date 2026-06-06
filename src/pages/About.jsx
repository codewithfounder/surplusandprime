import AboutContent from "../components/about/AboutContent";
import Banner from "../components/Banner";
import Service from "../components/about/Service";
import Testimonials from "../components/about/Testimonials";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Mission from "../components/about/Mission";
function About(){
    return(
        <>
        <div className="page-wrapper mb0">
        <Navbar logo="../images/surplus.png"/>
        <Banner title="About Us" />
        <AboutContent/>
        <Mission/>
        <Service/>
        <Testimonials/>
        <Contact_info/>
        <Footer/>
        </div>
        </>
    )
}

export default About;