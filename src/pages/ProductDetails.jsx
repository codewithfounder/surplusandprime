import Banner from "../components/Banner";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Details from "../components/Product/Details";

function ProductDetails() {
    const { productId } = useParams();
    const bannerTitle = productId
        ?.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return (
        <>
            <Navbar logo="../images/surplus.png" />
            <Banner title={bannerTitle} />
            <Details productId={productId} />
            <Contact_info />
            <Footer />
        </>
    )
}

export default ProductDetails;