import SubCategory from "../components/category/SubCategory";
import Banner from "../components/Banner";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
function Category(){
    const {category_Id} = useParams();
    return(
        <>
        <Navbar logo="../images/surplus.png"/>
        <Banner title="Categories"/>
         <SubCategory categoryId={category_Id}/>
          <Contact_info/>
        <Footer/>
        </>
    )
}

export default Category;