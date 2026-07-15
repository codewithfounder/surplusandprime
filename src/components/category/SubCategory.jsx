import { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar/Sidebar";
import Pagination from "../layout/Paginagion";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";
import "./style.css";

function SubCategory({ categoryId }) {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const categoriesPerPage = 12;

    // Fetch API
    useEffect(() => {
        if (!categoryId) return;

        setLoading(true);
        fetch(`${BASE_URL}/product_category/view/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setCategories(data.data);
                } else {
                    setCategories([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [categoryId]);

    // Search filter
    const filteredCategories = categories.filter((item) =>
        item.Title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastIndex = currentPage * categoriesPerPage;
    const firstIndex = lastIndex - categoriesPerPage;

    const currentCategories = filteredCategories.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

    return (
        <section className="product-section py-5">
            <div className="container" style={{ marginTop: '10rem', marginBottom: '10rem' }}>
                <div className="row">

                    {/* Sidebar */}
                    <div className="col-md-3 sidebar-col">
                        <Sidebar setSearchTerm={setSearchTerm} />
                    </div>

                    {/* Categories */}
                    <div className="col-md-9 products-col">
                        <div className="product-header">
                            <h3>
                                Product <span>Categories</span>
                            </h3>
                            <p className="product-count">{filteredCategories.length} categories found</p>
                        </div>

                        {loading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Loading categories...</p>
                            </div>
                        ) : (
                            <>
                                <div className="row g-4">
                                    {currentCategories.length > 0 ? (
                                        currentCategories.map((item) => (
                                            <div
                                                className="col-12 col-md-6 col-lg-4"
                                                key={item.id}
                                            >
                                                <Link
                                                    to={`/product-category/${item.category_sluge}/${item.slug}`}
                                                    className="text-decoration-none"
                                                >
                                                    <div className="product-card">
                                                        <div className="product-image-wrapper">
                                                            <img
                                                                src={item.image_url}
                                                                className="product-img"
                                                                alt={item.Title}
                                                                onError={(e) => {
                                                                    e.target.src = "/images/default.jpg";
                                                                }}
                                                            />
                                                            <div className="product-overlay">
                                                                <span className="view-details">View Products</span>
                                                            </div>
                                                        </div>

                                                        <div className="product-content">
                                                            <h4 className="product-title">
                                                                {item.Title}
                                                            </h4>
                                                            {item.product_count !== undefined && (
                                                                <p className="product-count-badge">
                                                                    {item.product_count} Products
                                                                </p>
                                                            )}
                                                            <div className="product-footer">
                                                                <span className="shop-now">Explore Category →</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-products">
                                            <p>No Product categories found</p>
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

export default SubCategory;