function OfficeLocations() {
    const cardStyle = {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "35px",
        height: "100%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0, 168, 150, 0.15)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden"
    };

    const iconStyle = {
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #21aa47, #21aa47)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "28px",
        marginBottom: "20px"
    };

    return (
        <section
            style={{
                background: "linear-gradient(180deg, #f8fdff 0%, #ffffff 100%)",
                padding: "90px 0"
            }}
        >
            <div className="container">
                {/* Heading */}
                <div className="text-center mb-5">
                    <span
                        style={{
                            background: "rgba(16,185,129,0.12)",
                            color: "#21aa47",
                            padding: "8px 18px",
                            borderRadius: "30px",
                            fontWeight: 600,
                            fontSize: "14px"
                        }}
                    >
                        OUR OFFICES
                    </span>

                    <h2
                        style={{
                            marginTop: "20px",
                            fontSize: "42px",
                            fontWeight: "700",
                            color: "#0f172a"
                        }}
                    >
                        Visit Our <span style={{ color: "#21aa47" }}>Locations</span>
                    </h2>

                    <p
                        style={{
                            maxWidth: "700px",
                            margin: "15px auto 0",
                            color: "#64748b",
                            fontSize: "16px",
                            lineHeight: "28px"
                        }}
                    >
                        We operate globally with offices in the UAE and India,
                        providing reliable support and business solutions for our
                        clients.
                    </p>
                </div>

                <div className="row g-4">
                    {/* UAE Office */}
                    <div className="col-lg-6 col-md-6 mb-4">
                        <div
                            style={cardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                                e.currentTarget.style.boxShadow =
                                    "0 20px 40px rgba(16,185,129,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 10px 30px rgba(0,0,0,0.08)";
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-60px",
                                    right: "-60px",
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    background:
                                        "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(16,185,129,0.12))"
                                }}
                            ></div>

                            <div style={iconStyle}>
                                <i className="fa fa-map-marker"></i>
                            </div>

                            <h4
                                style={{
                                    color: "#0f172a",
                                    fontWeight: "700",
                                    marginBottom: "10px"
                                }}
                            >
                                UAE Office
                            </h4>

                            <div
                                style={{
                                    width: "60px",
                                    height: "4px",
                                    background:
                                        "linear-gradient(90deg,#21aa47,#21aa47)",
                                    borderRadius: "10px",
                                    marginBottom: "20px"
                                }}
                            ></div>

                            <p
                                style={{
                                    color: "#475569",
                                    lineHeight: "30px",
                                    marginBottom: 0
                                }}
                            >
                                FDR K-2058, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZE, Ras Al Khaimah, United Arab Emirates
                            </p>
                        </div>
                    </div>

                    {/* India Office */}
                    <div className="col-lg-6 col-md-6 mb-4">
                        <div
                            style={cardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                                e.currentTarget.style.boxShadow =
                                    "0 20px 40px rgba(14,165,233,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 10px 30px rgba(0,0,0,0.08)";
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-60px",
                                    right: "-60px",
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    background:
                                        "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(16,185,129,0.12))"
                                }}
                            ></div>

                            <div style={iconStyle}>
                                <i className="fa fa-building"></i>
                            </div>

                            <h4
                                style={{
                                    color: "#0f172a",
                                    fontWeight: "700",
                                    marginBottom: "10px"
                                }}
                            >
                                India Office
                            </h4>

                            <div
                                style={{
                                    width: "60px",
                                    height: "4px",
                                    background:
                                        "linear-gradient(90deg,#21aa47,#21aa47)",
                                    borderRadius: "10px",
                                    marginBottom: "20px"
                                }}
                            ></div>

                            <p
                                style={{
                                    color: "#475569",
                                    lineHeight: "30px",
                                    marginBottom: 0
                                }}
                            >
                                G35 Third Floor, Abul Fazal Enclave II, Jamia Nagar, Okhla, New Delhi - 110025, India
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OfficeLocations;