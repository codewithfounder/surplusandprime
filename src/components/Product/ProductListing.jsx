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

    const productsPerPage = 12;

    // ✅ Fetch API
    useEffect(() => {
        if (!categoryId) return;

        fetch(`${BASE_URL}/product/view/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setProducts(data.data);
                } else {
                    setProducts([]);
                }
            })
            .catch(err => console.error("API Error:", err));
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
                    <div className="col-md-3">
                        <Sidebar setSearchTerm={setSearchTerm} />
                    </div>

                    {/* Products */}
                    <div className="col-md-9">

                        <h3>Products</h3>

                        <div className="row g-4">

                            {currentProducts.map((product) => (
                                <div
                                    className="col-lg-3 col-md-4 col-sm-6 col-12"
                                    key={product.id}
                                    style={{ marginBottom: '2rem' }}
                                >
                                    <Link to={`/product-details/${product.id}`}>

                                        <div className="product-box">

                                            {/* ✅ API Image */}
                                            <img
                                                src={product.image_url}
                                                className="product-img"
                                                alt={product.Title}
                                            />

                                            <div className="product-content">
                                                <p className="product-title">
                                                    {product.Title}
                                                </p>
                                            </div>

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

export default ProductListing;