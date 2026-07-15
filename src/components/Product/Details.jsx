import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL, { IMG_URL, PDF_URL } from "../../config/api";
import "./style.css";

function Details({ productId }) {
    const navigate = useNavigate();
    const productimg = `${IMG_URL}/product/`;
    const [latestProducts, setLatestProducts] = useState([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);

    // Extract table
    const extractTable = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const table = div.querySelector("table");
        return table ? table.outerHTML : "";
    };

    // Remove table from description
    const extractWithoutTable = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const table = div.querySelector("table");
        if (table) table.remove();
        return div.innerHTML;
    };

    // Fetch all products and filter by category
    const fetchLatestProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/all`);
            const data = await response.json();

            if (data.status) {
                let products = data.data;

                // Filter products by CategoryID if product exists
                if (product && product.CategoryID) {
                    products = products.filter(item =>
                        item.CategoryID === product.CategoryID &&
                        item.id !== product.id // Exclude current product
                    );
                }

                // Get first 6 products
                const latest = products.slice(0, 6);
                setLatestProducts(latest);
            }
        } catch (err) {
            console.error("Latest Products API Error:", err);
        }
    };

    // Fetch API
    useEffect(() => {
        if (!productId) return;

        setLoading(true);
        fetch(`${BASE_URL}/product/detail/${productId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setProduct(data.data);
                    setSelectedImage(data.data.image_url);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [productId]);

    // Fetch latest products when product is loaded
    useEffect(() => {
        if (product) {
            fetchLatestProducts();
        }
    }, [product]);

    // Enquiry
    const handleEnquiryClick = () => {
        if (!product) return;

        const uid = localStorage.getItem("uid");

        if (!uid) {
            const existingProducts =
                JSON.parse(localStorage.getItem("enquiryProduct")) || [];

            const alreadyExists = existingProducts.find(
                (item) => item.id === product.id
            );

            if (!alreadyExists) {
                existingProducts.push(product);
                localStorage.setItem(
                    "enquiryProduct",
                    JSON.stringify(existingProducts)
                );
            }

            localStorage.setItem(
                "redirectAfterLogin",
                `/enquiry/${product.id}`
            );

            navigate("/login");
            return;
        }

        const existingProducts =
            JSON.parse(localStorage.getItem("enquiryProduct")) || [];

        const alreadyExists = existingProducts.find(
            (item) => item.id === product.id
        );

        if (!alreadyExists) {
            existingProducts.push(product);
            localStorage.setItem(
                "enquiryProduct",
                JSON.stringify(existingProducts)
            );
        }

        navigate(`/enquiry/${product.id}`);
    };

    // Loading
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

    // Images
    const images = [
        product.image_url,
        product.image2 && product.image2 !== "0" ? `${productimg}${product.image2}` : null,
        product.image3 && product.image3 !== "0" ? `${productimg}${product.image3}` : null,
        product.image4 && product.image4 !== "0" ? `${productimg}${product.image4}` : null,
        product.image5 && product.image5 !== "0" ? `${productimg}${product.image5}` : null,
        product.image6 && product.image6 !== "0" ? `${productimg}${product.image6}` : null
    ].filter(Boolean);

    // Extract content
    const tableHTML = extractTable(product.Long_description || "");
    const descriptionHTML = extractWithoutTable(product.Long_description || "");

    // Parse PDFs
    let pdfs = [];
    if (product.Pdf_upload && product.Pdf_upload !== "0") {
        try {
            pdfs = JSON.parse(product.Pdf_upload);
            if (!Array.isArray(pdfs)) {
                pdfs = [pdfs];
            }
        } catch (e) {
            pdfs = [product.Pdf_upload];
        }
    }

    return (
        <section className="product-details-section">
            <div className="container" style={{ marginTop: "8rem", marginBottom: "6rem" }}>
                <div className="row" style={{ marginBottom: "3rem" }}>

                    {/* LEFT IMAGE */}
                    <div className="col-md-5">
                        <div className="selected-image-wrapper">
                            <img
                                src={selectedImage}
                                alt={product.Title}
                                className="selected-image"
                                onClick={() => setShowImageModal(true)}
                                onError={(e) => {
                                    e.target.src = "/images/default.jpg";
                                }}
                            />
                        </div>

                        <div className="thumbnail-container">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail-item ${selectedImage === img ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`Product ${index + 1}`}
                                        onError={(e) => {
                                            e.target.src = "/images/default.jpg";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT DETAILS */}
                    <div className="col-md-7">
                        <div className="product-info">
                            <h1 className="product-title-main">{product.Title}</h1>

                            <div className="detail-box">
                                <div className="detail-row">
                                    <span className="label">Product ID</span>
                                    <span className="value">{product.id}</span>
                                </div>

                                <div className="detail-row">
                                    <span className="label">Category</span>
                                    <span className="value">{product.category_title}</span>
                                </div>

                                <div className="detail-row">
                                    <span className="label">Sub Category</span>
                                    <span className="value">{product.product_category_title}</span>
                                </div>

                                <div className="detail-row">
                                    <span className="label">Date Added</span>
                                    <span className="value">{product.Date}</span>
                                </div>

                                <div className="enquiry-section">
                                    <button
                                        className="enquiry-btn"
                                        onClick={handleEnquiryClick}
                                    >
                                        <i className="fa fa-paper-plane"></i> Enquire Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SHORT DESCRIPTION */}
                {product.Short_description &&
                    product.Short_description !== "0" &&
                    product.Short_description !== "<p>.</p>" && (
                        <div className="row mt-5" style={{ marginTop: "3rem" }}>
                            <div className="col-12">
                                <div className="description-section">
                                    <h3 className="section-title">Description</h3>
                                    <div
                                        className="description-content"
                                        dangerouslySetInnerHTML={{
                                            __html: product.Short_description
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                {/* PDF DOWNLOAD */}
                {pdfs.length > 0 && (
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="pdf-section">
                                <h3 className="section-title">Downloads</h3>
                                <div className="pdf-list">
                                    {pdfs.map((pdf, index) => (
                                        <a
                                            key={index}
                                            href={`${PDF_URL}/pdf/${pdf}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pdf-link"
                                        >
                                            <i className="fa fa-file-pdf-o"></i>
                                            Download PDF {index + 1}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FULL DESCRIPTION */}
                {((tableHTML && tableHTML !== "0") ||
                    (descriptionHTML && descriptionHTML !== "0")) && (
                        <div className="row mt-4" style={{ marginTop: '3rem' }}>
                            <div className="col-12">
                                <div className="description-section">
                                    {tableHTML && tableHTML !== "0" ? (
                                        <>
                                            <h3 className="section-title">Specifications</h3>
                                            <div
                                                className="table-container"
                                                dangerouslySetInnerHTML={{
                                                    __html: tableHTML
                                                }}
                                            />
                                        </>
                                    ) : (
                                        descriptionHTML &&
                                        descriptionHTML !== "0" && (
                                            <>
                                                <h3 className="section-title">Details</h3>
                                                <div
                                                    className="description-content"
                                                    dangerouslySetInnerHTML={{
                                                        __html: descriptionHTML
                                                    }}
                                                />
                                            </>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* LATEST PRODUCTS - FIXED ALIGNMENT */}
            {latestProducts.length > 0 && (
                <div className="container mb-5" style={{ marginBottom: "3rem" }}>
                    <div className="product-header">
                        <h3>Latest <span>Products</span></h3>
                        <p className="product-count">Explore more products in this category</p>
                    </div>

                    <div className="latest-products-grid">
                        {latestProducts.map((item) => (
                            <div className="latest-product-item" key={item.id}>
                                <div
                                    className="latest-product-card"
                                    onClick={() => navigate(`/product/${item.slug}`)}
                                >
                                    <div className="latest-product-image-wrapper">
                                        <img
                                            src={item.image_url}
                                            className="latest-product-img"
                                            alt={item.Title}
                                            onError={(e) => {
                                                e.target.src = "/images/default.jpg";
                                            }}
                                        />
                                        <div className="latest-product-overlay">
                                            <span className="view-details">View Product</span>
                                        </div>
                                    </div>

                                    <div className="latest-product-content">
                                        <h4 className="latest-product-title">{item.Title}</h4>
                                        {item.category_title && (
                                            <span className="latest-category-tag">{item.category_title}</span>
                                        )}
                                        <div className="latest-product-footer">
                                            <span className="shop-now">View Details →</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* IMAGE MODAL */}
            {showImageModal && (
                <div className="image-modal" onClick={() => setShowImageModal(false)}>
                    <img
                        src={selectedImage}
                        alt={product.Title}
                        className="modal-image"
                        onError={(e) => {
                            e.target.src = "/images/default.jpg";
                        }}
                    />
                    <button className="modal-close" onClick={() => setShowImageModal(false)}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            )}
        </section>
    );
}

export default Details;