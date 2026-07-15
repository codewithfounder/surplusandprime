import "./style.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../config/api";

function Sidebar({ setSearchTerm }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/product/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const formatted = data.data.map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item.Title || "Untitled Product",
          }));

          const latestTwo = formatted.slice(-2).reverse();

          setRecentProducts(latestTwo);
        }
      })
      .catch((err) => console.error("Sidebar API Error:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/category/get_cat`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.error("Category API Error:", err));
  }, []);

  return (
    <div className="sidebar-wrapper">
      {/* Search Widget */}
      <div className="sidebar-widget search-widget">
        <div className="widget-header">
          <h3>Search Results</h3>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      {/* Recent Products Widget */}
      <div className="sidebar-widget recent-widget">
        <div className="widget-header">
          <h3>Recent <span>Products</span></h3>
        </div>
        <div className="recent-products">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <Link
                to={`/product/${product.slug}`}
                className="recent-product-item"
                key={product.id}
              >
                <div className="recent-product-content">
                  <h4>
                    {product.title.length > 50
                      ? product.title.substring(0, 50) + "..."
                      : product.title}
                  </h4>
                  <span className="view-link">View Product →</span>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-data">No recent products</p>
          )}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="sidebar-widget category-widget">
        <div className="widget-header">
          <h3>Categories</h3>
        </div>
        <ul className="category-list">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat.id} className="category-item">
                <div
                  className="category-toggle"
                  onClick={() => toggleCategory(cat.id)}
                >
                  <span className="category-name">{cat.name}</span>
                  <span className="category-count">({cat.subcategories?.length || 0})</span>
                  <span className="toggle-icon">
                    <i className={`fa ${openCategory === cat.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                  </span>
                </div>

                {openCategory === cat.id && (
                  <ul className="subcategory-list">
                    {cat.subcategories && cat.subcategories.length > 0 ? (
                      cat.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            to={`/product-category/${cat.slug}/${sub.slug}`}
                            className="subcategory-link"
                          >
                            <span className="sub-name">{sub.name}</span>
                            <span className="sub-count">
                              ({sub.product_count || 0})
                            </span>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="no-sub">No subcategories</li>
                    )}
                  </ul>
                )}
              </li>
            ))
          ) : (
            <li className="no-data">No categories found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;