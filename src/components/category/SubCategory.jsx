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

    const categoriesPerPage = 12;

    // ✅ Fetch API
    useEffect(() => {
        fetch(`${BASE_URL}/product_category/view/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setCategories(data.data);
                } else {
                    setCategories([]);
                }
            })
            .catch(err => console.error("API Error:", err));
    }, [categoryId]);

    // 🔎 Search filter
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
                    <div className="col-md-3">
                        <Sidebar setSearchTerm={setSearchTerm} />
                    </div>

                    {/* Products */}
                    <div className="col-md-9">

                        <h3>
                            Product Categories
                        </h3>

                        <div className="row g-4">

                            {currentCategories.map((item) => (
                                <div
                                    className="col-lg-3 col-md-4 col-sm-6 col-12" // Add col-12 for small screens
                                    key={item.id}
                                >
                                    <Link to={`/products/${item.id}`}>
                                        <div className="category-box">
                                            {/* ✅ Correct Image */}
                                            <img
                                                src={item.image_url}
                                                className="product-img img-fluid" // Added img-fluid class for responsiveness
                                                alt={item.Title}
                                            />
                                            <p className="product-title">
                                                {item.Title}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        </div>

                        {/* Pagination */}
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}

export default SubCategory;