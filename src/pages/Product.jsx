import Banner from "../components/Banner";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductListing from "../components/Product/ProductListing";
import { useParams } from "react-router-dom";

function Product() {
    const { categorySlug, subcategorySlug } = useParams();
    const bannerTitle = subcategorySlug
        ?.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return (
        <>
            <Navbar logo="/images/surplus.png" />
            <Banner title={bannerTitle} />
            <ProductListing categoryId={subcategorySlug} />
            <Contact_info />
            <Footer />
        </>
    )
}

export default Product;