import React, { useState, useEffect } from "react";
import BASE_URL from "../../config/api";
import { Link } from "react-router-dom";

function Products() {
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/category/get_cat`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {

          // if (data.data.length > 0) {
          //   console.log(
          //     "First Category:",
          //     JSON.stringify(data.data[0], null, 2)
          //   );
          // }

          setCategories(data.data);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/product/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {

          // if (data.data.length > 0) {
          //   console.log(
          //     "First Product:",
          //     JSON.stringify(data.data[0], null, 2)
          //   );
          // }

          setProducts(data.data);
        }
      });
  }, []);

  const getCategoryData = (categoryName = "") => {
    const name = categoryName.toLowerCase().trim();

    if (name.includes("oilfield")) {
      return {
        label: "Oil & Gas",
        icon: "industrio-icon-drop-of-liquid",
      };
    }

    if (name.includes("heavy equipment")) {
      return {
        label: "Heavy Equipments",
        icon: "industrio-icon-safety",
      };
    }

    if (name.includes("chemical")) {
      return {
        label: "Chemical",
        icon: "industrio-icon-atom",
      };
    }

    if (name.includes("metals")) {
      return {
        label: "Metals",
        icon: "industrio-icon-settings",
      };
    }

    return null;
  };

  const filters = [
    {
      id: "all",
      label: "All Cases",
      icon: "industrio-icon-layers",
    },
    ...categories
      .map((cat) => {
        const categoryData = getCategoryData(
          cat.name || cat.Title || ""
        );

        if (!categoryData) return null;

        return {
          id: cat.id,
          label: categoryData.label,
          icon: categoryData.icon,
        };
      })
      .filter(Boolean),
  ];

  // TEMPORARY
  // Until category field is confirmed in product API
  const categoryIds = filters
    .filter((f) => f.id !== "all")
    .map((f) => Number(f.id));

  const filteredProjects =
    activeFilter === "all"
      ? categoryIds.flatMap((categoryId) =>
        products
          .filter(
            (product) =>
              Number(product.CategoryID) === categoryId
          )
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 2)
      )
      : products
        .filter(
          (product) =>
            Number(product.CategoryID) === Number(activeFilter)
        )
        .sort((a, b) => Number(b.id) - Number(a.id))
        .slice(0, 2);

  return (
    <section className="portfolio-style-two sec-pad">
      <div className="container">
        <div className="sec-title text-center">
          <h3>
            Products for <span>inspirations</span>
          </h3>

          <p>
            Heavy industrial equipment, turbines, generators,
            compressors, cranes, pipes & oilfield tools—new and
            surplus for energy projects.
          </p>
        </div>

        <div className="gallery-filter">
          <ul className="post-filter masonary text-center">
            {filters.map((item) => (
              <li
                key={item.id}
                className={`filter ${activeFilter === item.id ? "active" : ""
                  }`}
                onClick={() => setActiveFilter(item.id)}
                style={{ cursor: "pointer" }}
              >
                <span>
                  <i className={item.icon}></i>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="row">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="col-md-3 col-sm-6 col-xs-12"
            >
              <div className="single-portfolio-style-two">
                <div className="img-box">
                  <img
                    src={project.image_url}
                    alt={project.Title}
                  />

                  <div className="overlay">
                    <div className="box">
                      <div className="content">
                        <span>Shop Now</span>

                        <Link to={`/product-details/${project.slug}`}>
                          <h3>{project.Title}</h3>
                        </Link>

                        <a
                          href={project.image_url}
                          className="img-popup industrio-icon-next"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;