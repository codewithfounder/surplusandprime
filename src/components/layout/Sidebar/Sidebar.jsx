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
            title: item.Title || "Untitled Product",
          }));

          // Get latest 2 (assuming latest = last items)
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
    <div className="sidebar sidebar-right">

      <div className="single-sidebar search-widget">
        <form action="#">
          <input type="text" placeholder="Search..." onChange={handleSearch} />
          <button type="submit" className="fa fa-search"></button>
        </form>
      </div>

      <div className="single-sidebar recent-post-widget" >
        <div className="title">
          <h3>Recent <span style={{ fontSize: '1.7rem', color: '#21aa47' }}>Product</span></h3>
        </div>
        <div className="recent-post-list">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <div className="single-recent-post" key={product.id}>
                <Link to={`/product-details/${product.slug}`}>
                  <h3>
                    {product.title.length > 50
                      ? product.title.substring(0, 50) + "..."
                      : product.title}
                  </h3>
                </Link>
              </div>
            ))
          ) : (
            <p>No recent products</p>
          )}
        </div>
      </div>

      <div className="single-sidebar category-widget">
        <div className="title">
          <h3>Categories</h3>
        </div>
        <ul className="category-list" style={{ paddingLeft: "1rem" }}>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat.id}>
                <a
                  className="clearfix"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleCategory(cat.id)}
                >
                  {cat.name}
                  <span className="count">({cat.subcategories?.length || 0})</span>
                </a>

                {openCategory === cat.id && (
                  <ul className="subcategory-list">
                    {cat.subcategories && cat.subcategories.length > 0 ? (
                      cat.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            to={`/products/${sub.slug}`}
                            className="clearfi" style={{ color: "green" }}
                          >
                            {sub.name}

                            <span className="count">
                              ({sub.product_count || 0})
                            </span>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>No subcategories</li>
                    )}
                  </ul>
                )}
              </li>
            ))
          ) : (
            <li>No categories found</li>
          )}
        </ul>
      </div>

    </div>
  );
}

export default Sidebar;