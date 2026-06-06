import Banner from "../components/Banner";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Product from "../components/shop/Products";
function Shop(){
    return(
        <>
        <div className="page-wrapper mb0">
        <Navbar logo="../images/surplus.png"/>
        <Banner title="Shop Now"/>
        <Product/>
        <Contact_info/>
        <Footer/>
        </div>
        </>
    )
}

export default Shop;