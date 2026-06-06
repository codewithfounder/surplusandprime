import { useState } from "react";
import BASE_URL from "../../config/api";
import Swal from "sweetalert2";

function ContactInfo() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        location: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/contact/save_contact_message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.status) {
                // ✅ Success Alert
                Swal.fire({
                    title: "Success!",
                    text: data.message,
                    icon: "success",
                    confirmButtonColor: "#3085d6"
                });

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    location: "",
                    message: ""
                });
            } else {
                // ❌ Error Alert
                Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: "error"
                });
            }

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Server Error",
                text: "Something went wrong!",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="contact-page sec-pad">
                <div className="container">
                    <div className="sec-title text-center">
                        <h3>
                            Get in <span>touch</span>
                        </h3>
                        <p>
                            You will find yourself working in a true partnership that results
                            in an incredible <br /> experience, and an end product that is the
                            best.
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="contact-image">
                                <img
                                    src="/images/contact2.jpg"
                                    alt="Contact"
                                    style={{ width: "100%", borderRadius: "10px" }}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <form onSubmit={handleSubmit} className="contact-form">
                                <h3>Send Mail</h3>

                                <input
                                    type="text"
                                    placeholder="Contact Person.."
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Your email address.."
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder="Your mobile number.."
                                    name="mobile"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Your Location.."
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />

                                <textarea
                                    placeholder="Write..."
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                <button
                                    type="submit"
                                    className="hvr-sweep-to-right"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send"}
                                </button>

                                <div className="sec-title" style={{ marginTop: '2rem' }}>
                                    <p>
                                        You will find yourself working in a true partnership that results
                                        in an incredible <br /> experience, and an end product that is the
                                        best.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactInfo;