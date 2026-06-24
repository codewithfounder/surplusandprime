import SubCategory from "../components/category/SubCategory";
import Banner from "../components/Banner";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
function Category() {
    const { category_Id } = useParams();
    const bannerTitle = category_Id
        ?.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return (
        <>
            <Navbar logo="../images/surplus.png" />
            <Banner title={bannerTitle} />
            <SubCategory categoryId={category_Id} />
            <Contact_info />
            <Footer />
        </>
    )
}

export default Category;