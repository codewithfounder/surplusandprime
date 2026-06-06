import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL, { IMG_URL, PDF_URL } from "../../config/api";

function Details({ productId }) {

    const navigate = useNavigate();
    const productimg = `${IMG_URL}/product/`;
    const [latestProducts, setLatestProducts] = useState([]);

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

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

    // Latest 5 products
    useEffect(() => {
        fetch(`${BASE_URL}/product/all`)
            .then((res) => res.json())
            .then((data) => {

                if (data.status) {

                    // Latest 5 products
                    const latest = data.data.slice(0, 5);
                    setLatestProducts(latest);
                }

            })
            .catch((err) =>
                console.error("Latest Products API Error:", err)
            );
    }, []);

    // Fetch API
    useEffect(() => {
        fetch(`${BASE_URL}/product/detail/${productId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setProduct(data.data);
                    setSelectedImage(data.data.image_url);
                }
            })
            .catch(err => console.error("API Error:", err));
    }, [productId]);

    // Enquiry
    const handleEnquiryClick = () => {
        if (!product) return;

        // Check if user is logged in
        const uid = localStorage.getItem("uid");

        if (!uid) {

            // Not logged in, save current product and redirect to login
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

            // Save redirect URL
            localStorage.setItem(
                "redirectAfterLogin",
                `/enquiry/${product.id}`
            );

            navigate("/login");
            return;
        }

        // Logged in
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
    if (!product) {
        return (
            <h3 style={{ textAlign: "center", marginTop: "10rem" }}>
                Loading...
            </h3>
        );
    }

    // Images
    const images = [
        product.image_url,

        product.image2 && product.image2 !== "0"
            ? `${productimg}${product.image2}`
            : null,

        product.image3 && product.image3 !== "0"
            ? `${productimg}${product.image3}`
            : null,

        product.image4 && product.image4 !== "0"
            ? `${productimg}${product.image4}`
            : null,

        product.image5 && product.image5 !== "0"
            ? `${productimg}${product.image5}`
            : null,

        product.image6 && product.image6 !== "0"
            ? `${productimg}${product.image6}`
            : null

    ].filter(Boolean);

    // Extract content
    const tableHTML = extractTable(product.Long_description || "");
    const descriptionHTML = extractWithoutTable(product.Long_description || "");

    // Parse PDFs
    let pdfs = [];

    if (product.Pdf_upload && product.Pdf_upload !== "0") {
        try {
            pdfs = JSON.parse(product.Pdf_upload);

            // If backend sends single string instead of array
            if (!Array.isArray(pdfs)) {
                pdfs = [pdfs];
            }

        } catch (e) {
            pdfs = [product.Pdf_upload];
        }
    }

    return (
        <section className="product-details-section py-5">

            <div
                className="container"
                style={{ marginTop: "8rem", marginBottom: "6rem" }}
            >

                <div className="row">

                    {/* LEFT IMAGE */}
                    <div className="col-md-5">

                        <img
                            src={selectedImage}
                            alt=""
                            style={{
                                width: "100%",
                                height: "420px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginBottom: "15px"
                            }}
                        />

                        <div className="d-flex gap-2 flex-wrap">

                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    onClick={() => setSelectedImage(img)}
                                    style={{
                                        width: "80px",
                                        height: "70px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                        borderRadius: "6px",
                                        border:
                                            selectedImage === img
                                                ? "2px solid #21aa47"
                                                : "1px solid #ddd"
                                    }}
                                />
                            ))}

                        </div>

                    </div>

                    {/* RIGHT DETAILS */}
                    <div className="col-md-7">

                        <h3
                            style={{
                                marginBottom: "25px",
                                fontWeight: "600"
                            }}
                        >
                            {product.Title}
                        </h3>

                        <div className="detail-box">

                            <div className="detail-row">
                                <span className="label">Product ID</span>
                                <span className="value">
                                    : {product.id}
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Category</span>
                                <span className="value">
                                    : {product.category_title}
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Sub Category</span>
                                <span className="value">
                                    : {product.product_category_title}
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Seller</span>
                                <span className="value">
                                    : Surplusandprime
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Date</span>
                                <span className="value">
                                    : {product.Date}
                                </span>
                            </div>

                            <div className="navbar-btn text-center">

                                <button
                                    className="btn btn-success"
                                    style={{
                                        padding: "10px 25px",
                                        border: "none"
                                    }}
                                    onClick={handleEnquiryClick}
                                >
                                    Enquire Now
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* SHORT DESCRIPTION */}
                {product.Short_description &&
                    product.Short_description !== "0" &&
                    product.Short_description !== "<p>.</p>" && (

                        <div className="row mt-5">

                            <div
                                className="col-12"
                                style={{ padding: "2rem" }}
                            >

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.Short_description
                                    }}
                                />

                            </div>

                        </div>
                    )}

                {/* PDF DOWNLOAD */}
                {pdfs.length > 0 && (

                    <div className="row mt-3">

                        <div
                            className="col-12"
                            style={{ padding: "0 2rem" }}
                        >

                            {pdfs.map((pdf, index) => (

                                <div
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                >

                                    <a
                                        href={`${PDF_URL}/pdf/${pdf}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: "#21aa47",
                                            textDecoration: "none",
                                            fontWeight: "500"
                                        }}
                                    >
                                        Download PDF {index + 1}
                                    </a>

                                </div>

                            ))}

                        </div>

                    </div>
                )}

                {/* FULL DESCRIPTION */}
                {((tableHTML && tableHTML !== "0") ||
                    (descriptionHTML && descriptionHTML !== "0")) && (

                        <div className="row mt-4">

                            <div
                                className="col-12"
                                style={{ padding: "2rem" }}
                            >

                                {/* TABLE */}
                                {tableHTML && tableHTML !== "0" ? (

                                    <div className="mt-4">

                                        <h5>Specifications</h5>

                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: tableHTML
                                            }}
                                        />

                                    </div>

                                ) : (

                                    descriptionHTML &&
                                    descriptionHTML !== "0" && (

                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: descriptionHTML
                                            }}
                                        />

                                    )

                                )}

                            </div>

                        </div>
                    )}
            </div>

            {/* LATEST PRODUCTS */}
            <div className="container mb-5">

                <h3
                    style={{
                        marginBottom: "25px",
                        fontWeight: "600"
                    }}
                >
                    Latest Products
                </h3>

                <div className="row">

                    {latestProducts.map((item) => (

                        <div
                            className="col-md-3 col-sm-6 mb-4"
                            key={item.id}
                        >

                            <div
                                className="latest-product-card"
                                onClick={() => navigate(`/product-details/${item.id}`)}
                                style={{ cursor: "pointer" }}
                            >

                                <img
                                    src={item.image_url}
                                    alt={item.Title}
                                    style={{
                                        width: "100%",
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div style={{ padding: "15px" }}>

                                    <h6
                                        style={{
                                            fontWeight: "600",
                                            minHeight: "50px"
                                        }}
                                    >
                                        {item.Title}
                                    </h6>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#21aa47",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {item.category_title}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* STYLES */}
            <style jsx="true">{`

                .detail-box {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #eee;
                }

                .detail-row {
                    display: flex;
                    padding: 12px 0;
                    border-bottom: 1px solid #f1f1f1;
                }

                .label {
                    width: 150px;
                    font-weight: 600;
                    color: #000;
                    display: flex;
                    justify-content: space-between;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }

                table td,
                table th {
                    border: 1px solid #ddd;
                    padding: 8px;
                }

                table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                table th {
                    background-color: #21aa47;
                    color: white;
                }

            `}</style>

        </section>
    );
}

export default Details;