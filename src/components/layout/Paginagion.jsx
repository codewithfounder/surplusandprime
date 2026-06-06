import "./pagination.css";

function Pagination({ totalPages, currentPage, setCurrentPage }) {

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate pagination numbers with dots
  const getPagination = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Left dots
    if (currentPage > 3) {
      pages.push("...");
    }

    // Middle pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // Right dots
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="custom-pagination">
      <ul>

        {/* Previous */}
        <li className={currentPage === 1 ? "disabled" : ""}>
          <button onClick={handlePrev}>‹</button>
        </li>

        {/* Dynamic Pagination */}
        {getPagination().map((item, index) => (
          <li key={index}>
            {item === "..." ? (
              <span className="dots">...</span>
            ) : (
              <button
                className={currentPage === item ? "active" : ""}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li className={currentPage === totalPages ? "disabled" : ""}>
          <button onClick={handleNext}>›</button>
        </li>

      </ul>
    </nav>
  );
}

export default Pagination;