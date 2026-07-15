import { useState, useEffect } from "react";
import "./style.css";
import Sidebar from "../layout/Sidebar/Sidebar";
import Pagination from "../layout/Paginagion";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";

function ProductListing({ categoryId }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const productsPerPage = 12;

    // ✅ Fetch API
    useEffect(() => {
        if (!categoryId) return;

        setLoading(true);
        fetch(`${BASE_URL}/product/view/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setProducts(data.data);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [categoryId]);

    // 🔎 Search
    const filteredProducts = products.filter((product) =>
        product.Title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;

    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <section className="product-section py-5">
            <div className="container" style={{ marginTop: '10rem', marginBottom: '10rem' }}>
                <div className="row">

                    {/* Sidebar */}
                    <div className="col-md-3 sidebar-col">
                        <Sidebar setSearchTerm={setSearchTerm} />
                    </div>

                    {/* Products */}
                    <div className="col-md-9 products-col">
                        <div className="product-header">
                            <h3>
                                Products <span>Collection</span>
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
                                            <div
                                                className="col-12 col-md-6 col-lg-4"
                                                key={product.id}
                                            >
                                                <Link
                                                    to={`/product/${product.slug}`}
                                                    className="text-decoration-none"
                                                >
                                                    <div className="product-card">
                                                        <div className="product-image-wrapper">
                                                            <img
                                                                src={product.image_url}
                                                                className="product-img"
                                                                alt={product.Title}
                                                                onError={(e) => {
                                                                    e.target.src = "/images/default.jpg";
                                                                }}
                                                            />
                                                            <div className="product-overlay">
                                                                <span className="view-details">View Details</span>
                                                            </div>
                                                        </div>

                                                        <div className="product-content">
                                                            <h4 className="product-title">
                                                                {product.Title}
                                                            </h4>
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
                                            <p>No products found in this category</p>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination */}
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