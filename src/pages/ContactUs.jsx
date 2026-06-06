// import Banner from "../components/contact/Banner";
import Banner from "../components/Banner";
import ContactInfo from "../components/contact/ContactInfo";
import Feature from "../components/contact/Feature";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
function ContactUs(){
    return(
        <>
        <div className="page-wrapper mb0">
        <Navbar logo="images/surplus.png"/>
        <Banner title="Contact Us" />
        <ContactInfo/>
        <Feature/>
        <Contact_info/>
        <Footer/>
        </div>
        </>
    )
}

export default ContactUs;