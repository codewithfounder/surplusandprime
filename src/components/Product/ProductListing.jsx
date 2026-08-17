import { useState, useEffect } from "react";
import "./style.css";
import Sidebar from "../layout/Sidebar/Sidebar";
import Pagination from "../layout/Paginagion";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";

function ProductListing() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const productsPerPage = 12;

    useEffect(() => {
        fetch(`${BASE_URL}/product/all`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    const formatted = data.data.map((item) => ({
                        id: item.id,
                        name: item.Title,
                        img: item.image_url || "/images/default.jpg",
                        slug: item.slug,
                        sku: item.sku,
                        price: item.price || null,
                        category: item.category || null,
                    }));

                    setProducts(formatted);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, []);

    // Updated filter function - search by name OR SKU (exact or partial match)
    const filteredProducts = products.filter((product) => {
        const searchLower = searchTerm.toLowerCase().trim();
        if (!searchLower) return true;

        // Check if search term matches product name (partial match)
        const nameMatch = (product.name || "").toLowerCase().includes(searchLower);

        // Check if search term matches product SKU (partial match)
        // Convert SKU to string and check if it includes the search term
        const skuMatch = product.sku && product.sku.toString().toLowerCase().includes(searchLower);

        return nameMatch || skuMatch;
    });

    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;

    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <section className="product-section py-5">
            <div
                className="container"
                style={{ marginTop: "10rem", marginBottom: "10rem" }}
            >
                <div className="row">

                    {/* Sidebar */}
                    <div className="col-md-3 sidebar-col">
                        <Sidebar setSearchTerm={setSearchTerm} />
                    </div>

                    {/* Products */}
                    <div className="col-md-9 products-col">
                        <div className="product-header">
                            <h3>
                                Latest <span>Products</span>
                            </h3>
                            <p className="product-count">{filteredProducts.length} products found</p>
                        </div>

                        {loading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Loading products...</p>
                            </div>
                        ) : (
                            <>
                                <div className="row g-4">
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map((product) => (
                                            <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                                                <Link
                                                    to={`/product/${product.slug}`}
                                                    className="text-decoration-none"
                                                >
                                                    <div className="product-card">
                                                        <div className="product-image-wrapper">
                                                            <img
                                                                src={product.img}
                                                                className="product-img"
                                                                alt={product.name}
                                                                onError={(e) => {
                                                                    e.target.src = "/images/default.jpg";
                                                                }}
                                                            />
                                                            {product.price && (
                                                                <span className="product-badge">New</span>
                                                            )}
                                                            <div className="product-overlay">
                                                                <span className="view-details">View Details</span>
                                                            </div>
                                                        </div>

                                                        <div className="product-content">
                                                            <h4 className="product-title">
                                                                {product.name}
                                                            </h4>
                                                            {product.price && (
                                                                <p className="product-price">${product.price}</p>
                                                            )}
                                                            {/* Display SKU for reference */}
                                                            <p className="product-sku" style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                                                                SKU: {product.sku}
                                                            </p>
                                                            <div className="product-footer">
                                                                <span className="shop-now">Shop Now →</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-products">
                                            <p>No products found matching "{searchTerm}"</p>
                                        </div>
                                    )}
                                </div>

                                {totalPages > 1 && (
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductListing;