import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import "./style.css";
import BASE_URL from "../../../config/api"

const ContactInfo = ({ formData, setFormData, handleChange, errors }) => {
  const [industry, setIndustry] = useState([]);
  const countries = Country.getAllCountries();
  const states = formData.country
    ? State.getStatesOfCountry(formData.country)
    : [];

  // Fetch Industry
  useEffect(() => {
    fetch(`${BASE_URL}/category/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setIndustry(data.data);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  // Custom change handler for country reset logic
  const handleCountryChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      country: value,
      state: "", // reset state when country changes
    }));
  };

  return (
    <div
      className="contact-info-container"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* Entity Type */}
      <div className="form-group">
        <label>Select</label>
        <div
          className="radio-group"
          style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
        >
          <label>
            <input
              type="radio"
              name="entityType"
              value="company"
              checked={formData.entityType === "company"}
              onChange={handleChange}
            />
            Entity/Company
          </label>

          <label>
            <input
              type="radio"
              name="entityType"
              value="individual"
              checked={formData.entityType === "individual"}
              onChange={handleChange}
            />
            Individual
          </label>
        </div>
      </div>

      {/* Industry */}
      <div
        className="form-row"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        <div className="form-group" style={{ flex: "1 1 200px" }}>
          <label>Industry *</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={errors.industry ? "error" : ""}
            style={{ width: "100%" }}
          >
            <option value="">Select Industry</option>
            {industry.map((industry) => (
              <option
                key={industry.id}
                value={industry.Title}
              >
                {industry.Title}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="error-text">{errors.industry}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="form-group">
        <label>Address *</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "error" : ""}
          style={{ width: "100%" }}
        />
        {errors.address && (
          <p className="error-text">{errors.address}</p>
        )}
      </div>

      {/* City & Zip */}
      <div
        className="form-row"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        <div className="form-group" style={{ flex: "1 1 200px" }}>
          <label>City *</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "error" : ""}
            style={{ width: "100%" }}
          />
          {errors.city && (
            <p className="error-text">{errors.city}</p>
          )}
        </div>

        <div className="form-group" style={{ flex: "1 1 200px" }}>
          <label>Zip Code *</label>
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className={errors.zip ? "error" : ""}
            style={{ width: "100%" }}
          />
          {errors.zip && (
            <p className="error-text">{errors.zip}</p>
          )}
        </div>
      </div>

      {/* Country & State */}
      <div
        className="form-row"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        <div className="form-group" style={{ flex: "1 1 200px" }}>
          <label>Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className={errors.country ? "error" : ""}
            style={{ padding: "10px 0", width: "100%" }}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="error-text">{errors.country}</p>
          )}
        </div>

        <div className="form-group" style={{ flex: "1 1 200px" }}>
          <label>State *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? "error" : ""}
            style={{ padding: "10px 0", width: "100%" }}
            disabled={!formData.country}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="error-text">{errors.state}</p>
          )}
        </div>
      </div>

      {/* Phone & Website */}
      <div
        className="form-row"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        <div className="form-group" style={{ flex: "1 1 200px" }}>
          <label>Business Phone</label>
          <div
            className="phone-group"
            style={{ display: "flex", gap: "1rem" }}
          >
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ flex: 2 }}
            />
            <input
              name="ext"
              placeholder="Ext"
              value={formData.ext}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div className="form-group" style={{ flex: "1 1 200px" }}>
          <label>Website</label>
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;