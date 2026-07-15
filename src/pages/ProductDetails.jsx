// import Banner from "../components/Banner";
// import Contact_info from "../components/Contact_info";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { useParams } from "react-router-dom";
// import Details from "../components/Product/Details";

// function ProductDetails() {
//     const { productId } = useParams();
//     const bannerTitle = productId
//         ?.split("-")
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     return (
//         <>
//             <Navbar logo="../images/surplus.png" />
//             <Banner title={bannerTitle} />
//             <Details productId={productId} />
//             <Contact_info />
//             <Footer />
//         </>
//     )
// }

// export default ProductDetails;

// ProductDetails.js
// ProductDetails.js
import Banner from "../components/Banner";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams, useLocation } from "react-router-dom";
import Details from "../components/Product/Details";
import { useState, useEffect } from "react";
import BASE_URL from "../config/api";

function ProductDetails() {
    const { productId } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        setLoading(true);
        fetch(`${BASE_URL}/product/detail/${productId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setProduct(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [productId]);

    // Format title
    const formatTitle = (text) => {
        if (!text) return '';
        return text.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Build breadcrumbs using product data
    const buildBreadcrumbs = () => {
        const crumbs = [{ label: 'Home', path: '/' }];

        if (product) {
            // Add category from product.category_slug
            if (product.category_slug) {
                crumbs.push({
                    label: product.category_title || formatTitle(product.category_slug),
                    path: `/product-category/${product.category_slug}`
                });
            }

            // Add subcategory from product.product_category_slug
            if (product.product_category_slug) {
                crumbs.push({
                    label: product.product_category_title || formatTitle(product.product_category_slug),
                    path: `/product-category/${product.category_slug}/${product.product_category_slug}`
                });
            }

            // Add product
            crumbs.push({
                label: product.Title || formatTitle(productId),
                path: `/product/${productId}`
            });
        } else {
            // Fallback if product not loaded yet
            crumbs.push({
                label: formatTitle(productId) || 'Product',
                path: `/product/${productId}`
            });
        }

        return crumbs;
    };

    const breadcrumbs = buildBreadcrumbs();
    const bannerTitle = product?.Title || formatTitle(productId) || 'Product Details';

    if (loading) {
        return (
            <div className="loading-spinner" style={{ marginTop: "10rem" }}>
                <div className="spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="no-products" style={{ marginTop: "10rem" }}>
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <>
            <Navbar logo="/images/surplus.png" />
            <Banner title={bannerTitle} breadcrumbs={breadcrumbs} />
            <Details productId={productId} />
            <Contact_info />
            <Footer />
        </>
    );
}

export default ProductDetails;