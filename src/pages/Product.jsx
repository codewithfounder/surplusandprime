import Banner from "../components/Banner";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductListing from "../components/Product/ProductListing";
import { useParams } from "react-router-dom";

function Product(){
    const { categoryId } = useParams();
    return(
        <>
        <Navbar logo="../images/surplus.png"/>
        <Banner title="Products"/>
        <ProductListing categoryId={categoryId}/>
        <Contact_info/>
        <Footer/>
        </>
    )
}

export default Product;