// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import BASE_URL from "../../config/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("profile");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [enquiries, setEnquiries] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]); // New state for recent enquiries
  const navigate = useNavigate();

  // 🔐 Check login
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/login");
    }
  }, [navigate]);

  // Decode UID
  const getUserId = () => {
    const uid = localStorage.getItem("uid");
    if (!uid) return null;
    try {
      return atob(uid);
    } catch (e) {
      return null;
    }
  };

  // Fetch user from backend
  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const res = await fetch(
          `${BASE_URL}/auth/get_user?id=${userId}`
        );
        const data = await res.json();
        if (data.status) {
          setUser(data.user);
          setEditData(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Fetch enquiries and transform to recent orders format
  useEffect(() => {
    const fetchEnquiries = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) return;

      const userId = atob(uid);

      try {
        const res = await fetch(
          `${BASE_URL}/enquiry/get_user_enquiries?user_id=${userId}`
        );

        const data = await res.json();
        if (data.status) {
          setEnquiries(data.data);

          // Transform enquiries to recent orders format
          const transformedEnquiries = transformEnquiriesToOrders(data.data);
          setRecentEnquiries(transformedEnquiries);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchEnquiries();
  }, []);

  // Function to transform enquiries to orders format
  const transformEnquiriesToOrders = (enquiriesData) => {
    if (!enquiriesData || enquiriesData.length === 0) {
      return [];
    }

    // Get only the 5 most recent enquiries
    const recentEnquiriesList = enquiriesData.slice(0, 5);

    return recentEnquiriesList.map((enquiry) => {
      // Get first product for display
      const firstProduct = enquiry.products && enquiry.products[0];
      const productName = firstProduct?.title || firstProduct?.product_details?.title || 'Multiple Products';
      const productCount = enquiry.products?.length || 0;

      // Format the product display
      const productDisplay = productCount > 1
        ? `${productName} + ${productCount - 1} more`
        : productName;

      // Format amount (you might need to adjust this based on your actual data structure)
      const amount = firstProduct?.price
        ? `$${parseFloat(firstProduct.price).toFixed(2)}`
        : 'N/A';

      // Map status to appropriate styling
      let status = enquiry.status || 'pending';
      status = status.charAt(0).toUpperCase() + status.slice(1);

      return {
        id: enquiry.enquiry_no || `ENQ${enquiry.id}`,
        customer: enquiry.customer_info?.name || user?.full_name || 'N/A',
        product: productDisplay,
        amount: amount,
        status: status,
        enquiryDate: enquiry.submitted_at || enquiry.created_at,
        totalProducts: productCount,
        originalEnquiry: enquiry // Keep original data for details view
      };
    });
  };

  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`, { state: product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const userId = atob(uid);

      const res = await fetch(
        `${BASE_URL}/auth/update_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            ...editData,
          }),
        }
      );

      const text = await res.text();

      const data = JSON.parse(text);

      if (data.status) {
        alert("Updated successfully");
        setIsEditing(false);
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("ERROR:", err);
      alert("Server error - check console");
    }
  };

  const handleCancel = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setEditData(storedUser);
    setIsEditing(false);
  };

  // Handle order row click to view enquiry details
  const handleOrderClick = (order) => {
    if (order.originalEnquiry) {
      // Navigate to enquiry details or show modal
      // You can implement a modal or navigate to a details page
      // console.log("View enquiry details:", order.originalEnquiry);
      console.log("View enquiry details:");
      // Optionally, set active to show enquiry details
      // setActive("enquiryDetails");
      // setSelectedEnquiry(order.originalEnquiry);
    }
  };

  // SVG Icons
  const Icons = {
    Dashboard: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    Package: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-2zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    ShoppingCart: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    Users: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    Analytics: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
    Settings: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    Menu: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    X: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    DollarSign: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    TrendingUp: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    ArrowUpRight: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    ),
    ArrowDownRight: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="7" y1="7" x2="17" y2="17" />
        <polyline points="17 7 17 17 7 17" />
      </svg>
    ),
    UserPlus: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  };

  const SimpleBarChart = () => {

    return (
      <div className="bar-chart-container">
        <div className="user-profile">{user?.full_name?.charAt(0) || 'U'}</div>
        <div className="bar-chart-item">
          <p><strong>Name:</strong> {user?.full_name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Mobile:</strong> {user?.mobile}</p>
          <p><strong>Company:</strong> {user?.company}</p>
          <p><strong>Industry:</strong> {user?.industry}</p>
        </div>
      </div>
    );
  };

  // Updated Order Table to show real enquiry data
  const OrderTable = () => {
    const displayOrders = recentEnquiries;

    return (
      <div className="order-table-container">
        <div className="order-table-header">
          <h3 className="order-table-title">
            Recent {recentEnquiries.length > 0 ? 'Enquiries' : 'Orders'}
          </h3>
          {recentEnquiries.length > 0 && (
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
              Showing your {recentEnquiries.length} most recent enquiries
            </p>
          )}
        </div>
        <div className="order-table-wrapper">
          <table className="order-table">
            <thead className="order-table-thead">
              <tr>
                <th className="order-table-th">Enquiry No.</th>
                <th className="order-table-th">Customer</th>
                <th className="order-table-th">Product(s)</th>
                <th className="order-table-th">Amount</th>
                <th className="order-table-th">Status</th>
              </tr>
            </thead>
            <tbody className="order-table-tbody">
              {displayOrders.map((order) => (
                <tr
                  key={order.id}
                  className="order-table-row"
                  onClick={() => handleOrderClick(order)}
                  style={{ cursor: recentEnquiries.length > 0 ? 'pointer' : 'default' }}
                >
                  <td className="order-table-td order-table-td-id">{order.id}</td>
                  <td className="order-table-td">{order.customer}</td>
                  <td className="order-table-td">
                    {order.product}
                    {order.totalProducts && order.totalProducts > 1 && (
                      <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '5px' }}>
                        ({order.totalProducts} items)
                      </span>
                    )}
                  </td>
                  <td className="order-table-td order-table-td-amount">{order.amount}</td>
                  <td className="order-table-td">
                    <span className={`order-status order-status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayOrders.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
              No enquiries found
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderProfileContent = () => (
    <div className="dashboard-content-box">
      <h2>My Profile</h2>
      {!isEditing ? (
        <>
          <p><strong>Name:</strong> {user?.full_name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Mobile:</strong> {user?.mobile}</p>
          <p><strong>Company:</strong> {user?.company}</p>
          <p><strong>Industry:</strong> {user?.industry}</p>
          <p><strong>Region:</strong> {user?.regions}</p>
          <button className="dashboard-edit-btn" onClick={() => setIsEditing(true)}>
            <Icons.Analytics /> Edit Profile
          </button>
        </>
      ) : (
        <>
          {["full_name", "email", "mobile", "company", "industry", "regions"].map((field) => (
            <div className="dashboard-form-group" key={field}>
              <label>{field.replace('_', ' ').toUpperCase()}</label>
              {field === "industry" ? (
                <select
                  name="industry"
                  value={editData.industry || ""}
                  onChange={handleEditChange}
                >
                  <option value="">Select Industry</option>
                  <option value="Chemical & Petrochemicals">Chemical & Petrochemicals</option>
                  <option value="Commercial Equipment">Commercial Equipment</option>
                  <option value="Computer & Peripherals">Computer & Peripherals</option>
                  <option value="Electrical Utilities & Downstream">Electrical Utilities & Downstream</option>
                  <option value="Marine">Marine</option>
                  <option value="Oil & Gas">Oil & Gas</option>
                  <option value="Solar">Solar</option>
                  <option value="Transportation/Vehicles/Mobile Assets">Transportation/Vehicles/Mobile Assets</option>
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Building Materials">Building Materials</option>
                </select>
              ) : (
                <input
                  name={field}
                  value={editData[field] || ""}
                  onChange={handleEditChange}
                  readOnly={field === "email" || field === "mobile"}
                  className={field === "email" || field === "mobile" ? "readonly-input" : ""}
                />
              )}
            </div>
          ))}
          <div className="dashboard-edit-actions">
            <button className="dashboard-save-btn" onClick={handleSave}><Icons.UserPlus /> Save</button>
            <button className="dashboard-cancel-btn" onClick={handleCancel}><Icons.X /> Cancel</button>
          </div>
        </>
      )}
    </div>
  );

  const renderProductsContent = () => (
    <div className="dashboard-content-box">
      <h2>Enquiry Products</h2>
      <div className="enquiry-card">

        {enquiries.length === 0 ? (
          <p>No enquiries found.</p>
        ) : (
          enquiries.map((enquiry) => (
            <div key={enquiry.id} style={{ marginBottom: "30px", width: "27rem" }}>
              {enquiry.products.map((item, index) => (
                <div
                  className="user-product-card"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(item)}
                >
                  <img
                    src={
                      item.product_details?.image_url ||
                      "https://via.placeholder.com/300x180?text=No+Image"
                    }
                    className="product-card-image"
                    alt={item.title}
                  />

                  <div className="product-card-body">
                    {/* Enquiry Details inside the card */}
                    <div className="enquiry-details-badge">
                      <span className="enquiry-no">{enquiry.enquiry_no}</span>
                      <span className={`enquiry-status status-${enquiry.status}`}>
                        {enquiry.status}
                      </span>
                    </div>

                    <h3>{item.title}</h3>
                    <p><strong>Qty:</strong> {item.quantity}</p>
                    {/* <p><strong>Price:</strong> {item.price}</p> */}
                    <p><strong>Seller:</strong> Surplusandprime</p>
                    {/* <p><strong>Total Products in Enquiry:</strong> {enquiry.total_products}</p> */}
                  </div>
                </div>
              ))}
              {/* <div className="product-card-container">
              dfj
            </div> */}
              {/* <hr /> */}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderDashboardHome = () => (
    <>
      <div className="bottom-grid">
        <div className="orders-section">
          <OrderTable />
        </div>
        <div className="bar-chart-card">
          <h3 className="chart-card-title">User Profile</h3>
          <div className="chart-container">
            <SimpleBarChart />
          </div>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (active) {
      case "profile":
        return renderProfileContent();
      case "buy":
        return renderProductsContent();
      case "dashboard":
        return renderDashboardHome();
      default:
        return renderDashboardHome();
    }
  };

  return (
    <div className="dashboard-app">
      <div className={`dashboard-sidebar-new ${isOpen ? 'dashboard-sidebar-open' : ''}`}>
        <div className="sidebar-header-new">
          <h1 className="sidebar-title">User Dashboard</h1>
          <button className="sidebar-close-btn" onClick={() => setIsOpen(false)}>
            <Icons.X />
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className={`sidebar-nav-item ${active === "dashboard" ? 'sidebar-nav-item-active' : ''}`} onClick={() => { setActive("dashboard"); setIsOpen(false); }}>
            <Icons.Dashboard /> <span>Dashboard</span>
          </a>
          <a href="#" className={`sidebar-nav-item ${active === "profile" ? 'sidebar-nav-item-active' : ''}`} onClick={() => { setActive("profile"); setIsOpen(false); }}>
            <Icons.Users /> <span>Profile</span>
          </a>
          <a href="#" className={`sidebar-nav-item ${active === "buy" ? 'sidebar-nav-item-active' : ''}`} onClick={() => { setActive("buy"); setIsOpen(false); }}>
            <Icons.ShoppingCart /> <span>Orders</span>
          </a>
          <button
            className="dashboard-logout-btn-sidebar"
            onClick={() => {
              localStorage.removeItem("uid");
              setUser(null);
              window.dispatchEvent(new Event("storage"));
              navigate("/login");
            }}
          >
            <Icons.Analytics /> Logout
          </button>
        </nav>
      </div>

      {isOpen && <div className="dashboard-overlay-new" onClick={() => setIsOpen(false)}></div>}

      <div className="dashboard-main-new">
        <header className="dashboard-header-new">
          <div className="header-content-new">
            <button className="menu-btn-new" onClick={() => setIsOpen(true)}>
              <Icons.Menu />
            </button>
            <h2 className="header-title-new">Dashboard</h2>
            <div className="header-actions-new">
              <Link to="/" className="home-btn">Home</Link>
              <div className="avatar-new">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content-new">
          <h1 className="welcome-title">Welcome, {user?.full_name || 'User'}!</h1>
          {user ? renderContent() : <p>Loading...</p>}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;