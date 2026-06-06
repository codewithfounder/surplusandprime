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

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch(`${BASE_URL}/product/all`) // 🔁 change URL
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const formatted = data.data.map((item) => ({
            id: item.id,
            name: item.Title,
            img: item.image_url || "/images/default.jpg",
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

  // ✅ Search filter
  const filteredProducts = products.filter((product) =>
  (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  // ✅ Pagination logic
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
          <div className="col-md-3">
            <Sidebar setSearchTerm={setSearchTerm} />
          </div>

          {/* Products */}
          <div className="col-md-9">
            <h3>
              Latest - <span>Products</span>
            </h3>

            {/* ✅ Loading */}
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <>
                <div className="row g-4">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div
                        className="col-12 col-md-4 col-lg-3"
                        key={product.id}
                      >
                        <Link
                          to={`/product-details/${product.id}`}
                          className="text-decoration-none"
                        >
                          <div className="product-box h-100">
                            <img
                              src={product.img}
                              className="product-img"
                              alt={product.name}
                              onError={(e) => {
                                e.target.src = "/images/default.jpg";
                              }}
                            />

                            <div className="product-content">
                              <p className="product-title">
                                {product.name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>No products found</p>
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