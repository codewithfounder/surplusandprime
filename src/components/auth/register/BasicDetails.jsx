import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const BasicDetails = ({
  formData,
  handleChange,
  errors,
  setErrors,
  handleSubmitFinal,
  setFormData,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [isMobileDisabled, setIsMobileDisabled] = useState(true);
  const [mobileValid, setMobileValid] = useState(false);

  // CAPTCHA STATES
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const mobileInputRef = useRef(null);

  // GENERATE CAPTCHA
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

    let result = "";

    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setCaptcha(result);
  };

  // Fetch countries on mount
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=cca2,name,flags,idd")
      .then((res) => res.json())
      .then((data) => {
        const countries = data
          .map((c) => ({
            name: c.name.common,
            code: c.cca2,
            dialCode: c.idd.root
              ? c.idd.root +
              (c.idd.suffixes ? c.idd.suffixes[0] : "")
              : "",
          }))
          .filter((c) => c.dialCode)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountryList(countries);
      })
      .catch((err) => console.error(err));

    // Generate captcha on load
    generateCaptcha();
  }, []);

  // Handle country code change
  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;

    setFormData((prev) => ({
      ...prev,
      countryCode: selectedCode,
      mobile: "",
    }));

    setErrors((prev) => ({ ...prev, mobile: "" }));
    setMobileValid(false);

    if (selectedCode) {
      setIsMobileDisabled(false);

      setTimeout(() => {
        if (mobileInputRef.current) {
          mobileInputRef.current.focus();
        }
      }, 100);
    } else {
      setIsMobileDisabled(true);
    }
  };

  // Remove plus sign
  const getCountryCodeWithoutPlus = (dialCode) => {
    return dialCode.replace("+", "");
  };

  // Validate mobile number
  const validateMobile = (mobileNumber, countryCode) => {
    if (!countryCode) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Please select a country code first",
      }));

      setMobileValid(false);
      return false;
    }

    if (!mobileNumber) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number is required",
      }));

      setMobileValid(false);
      return false;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, "");

    if (cleanMobile.length === 0) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Please enter a valid mobile number",
      }));

      setMobileValid(false);
      return false;
    }

    const countryCodeWithoutPlus =
      getCountryCodeWithoutPlus(countryCode);

    let finalMobileNumber = cleanMobile;
    let isCountryCodeInNumber = false;

    if (cleanMobile.startsWith(countryCodeWithoutPlus)) {
      isCountryCodeInNumber = true;

      finalMobileNumber = cleanMobile.substring(
        countryCodeWithoutPlus.length
      );
    }

    let minLength = 7;
    let maxLength = 15;

    if (countryCodeWithoutPlus === "1") {
      minLength = 10;
      maxLength = 10;
    } else if (countryCodeWithoutPlus === "91") {
      minLength = 10;
      maxLength = 10;
    } else if (countryCodeWithoutPlus === "44") {
      minLength = 10;
      maxLength = 10;
    } else if (countryCodeWithoutPlus === "61") {
      minLength = 9;
      maxLength = 10;
    } else if (countryCodeWithoutPlus === "86") {
      minLength = 11;
      maxLength = 11;
    }

    const isValidLength =
      finalMobileNumber.length >= minLength &&
      finalMobileNumber.length <= maxLength;

    if (!isValidLength) {
      setErrors((prev) => ({
        ...prev,
        mobile: `Mobile number should be ${minLength} digits ${minLength !== maxLength ? `to ${maxLength}` : ""
          }`,
      }));

      setMobileValid(false);
      return false;
    }

    if (finalMobileNumber.startsWith("0")) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number should not start with 0",
      }));

      setMobileValid(false);
      return false;
    }

    setErrors((prev) => ({
      ...prev,
      mobile: "",
    }));

    setMobileValid(true);

    if (isCountryCodeInNumber) {
      setFormData((prev) => ({
        ...prev,
        mobile: finalMobileNumber,
      }));
    }

    return true;
  };

  // Handle mobile change
  const handleMobileChange = (e) => {
    let value = e.target.value;

    value = value.replace(/\s/g, "");

    setFormData((prev) => ({
      ...prev,
      mobile: value,
    }));

    if (formData.countryCode && value) {
      const cleanMobile = value.replace(/\D/g, "");

      const countryCodeWithoutPlus =
        getCountryCodeWithoutPlus(formData.countryCode);

      let minLength = 7;

      if (
        countryCodeWithoutPlus === "1" ||
        countryCodeWithoutPlus === "91" ||
        countryCodeWithoutPlus === "44"
      ) {
        minLength = 10;
      }

      if (cleanMobile.length >= minLength) {
        validateMobile(value, formData.countryCode);
      } else if (errors.mobile) {
        setErrors((prev) => ({
          ...prev,
          mobile: "",
        }));

        setMobileValid(false);
      }
    } else if (errors.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: "",
      }));

      setMobileValid(false);
    }
  };

  // Handle mobile blur
  const handleMobileBlur = () => {
    if (formData.mobile && formData.countryCode) {
      validateMobile(
        formData.mobile,
        formData.countryCode
      );
    } else if (!formData.countryCode && formData.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Please select a country code first",
      }));

      setMobileValid(false);
    }
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));

      return false;
    }

    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 6 characters long",
      }));

      return false;
    }

    setErrors((prev) => ({
      ...prev,
      password: "",
    }));

    return true;
  };

  // Validate confirm password
  const validateConfirmPassword = (
    confirmPassword,
    password
  ) => {
    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password",
      }));

      return false;
    }

    if (confirmPassword !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));

      return false;
    }

    setErrors((prev) => ({
      ...prev,
      confirmPassword: "",
    }));

    return true;
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);

      if (formData.confirmPassword) {
        validateConfirmPassword(
          formData.confirmPassword,
          value
        );
      }
    } else if (name === "confirmPassword") {
      validateConfirmPassword(
        value,
        formData.password
      );
    }
  };

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!formData.fullName.trim()) {
      setErrors((prev) => ({
        ...prev,
        fullName: "Full Name is required",
      }));

      isValid = false;
    }

    if (!formData.countryCode) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Please select a country code",
      }));

      isValid = false;
    }

    if (!formData.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number is required",
      }));

      isValid = false;
    } else if (formData.countryCode) {
      const mobileIsValid = validateMobile(
        formData.mobile,
        formData.countryCode
      );

      if (!mobileIsValid) isValid = false;
    }

    if (!formData.email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));

      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is invalid",
      }));

      isValid = false;
    }

    const passwordIsValid = validatePassword(
      formData.password
    );

    if (!passwordIsValid) isValid = false;

    const confirmPasswordIsValid =
      validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      );

    if (!confirmPasswordIsValid) isValid = false;

    // CAPTCHA VALIDATION
    if (!captchaInput.trim()) {
      setErrors((prev) => ({
        ...prev,
        captcha: "Captcha is required",
      }));

      isValid = false;
    } else if (captchaInput !== captcha) {
      setErrors((prev) => ({
        ...prev,
        captcha: "Captcha does not match",
      }));

      generateCaptcha();
      setCaptchaInput("");

      isValid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        captcha: "",
      }));
    }

    if (!isValid) {
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/virendra/SURPLUS/website/auth/register_step1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.status) {
        setFormData((prev) => ({
          ...prev,
          user_id: data.user_id,
        }));

        handleSubmitFinal();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="basic-details">

        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Full Name <span>*</span>
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error" : ""}
            />

            {errors.fullName && (
              <p className="error-text">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>
              Member Type <span>*</span>
            </label>

            <select
              name="memberType"
              value={formData.memberType}
              onChange={handleChange}
            >
              <option value="">
                Select your member type
              </option>

              <option value="Only Buyer">
                Buyer
              </option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Mobile Number <span>*</span>
            </label>

            <div
              className={`mobile-input-wrapper ${errors.mobile
                ? "error-wrapper"
                : ""
                }`}
            >
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleCountryChange}
                className="country-selector-button"
                style={{ width: "12rem" }}
              >
                <option value="">
                  Select Country Code
                </option>

                {countryList.map((c) => (
                  <option
                    key={c.code}
                    value={c.dialCode}
                  >
                    {c.name} ({c.dialCode})
                  </option>
                ))}
              </select>

              <input
                ref={mobileInputRef}
                type="tel"
                name="mobile"
                placeholder={
                  isMobileDisabled
                    ? "Select country code first"
                    : "Enter mobile number"
                }
                value={formData.mobile}
                onChange={handleMobileChange}
                onBlur={handleMobileBlur}
                disabled={isMobileDisabled}
                className={
                  errors.mobile ? "error" : ""
                }
              />
            </div>

            {errors.mobile && (
              <p className="error-text">
                {errors.mobile}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>
              Email <span>*</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Password <span>*</span>
            </label>

            <div className="password-box">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handlePasswordChange}
                className={
                  errors.password ? "error" : ""
                }
              />

              <span
                className="eye"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                <img
                  src={
                    showPassword
                      ? "./images/show.png"
                      : "./images/hide.png"
                  }
                  alt="toggle"
                />
              </span>
            </div>

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>
              Confirm Password <span>*</span>
            </label>

            <div className="password-box">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
                className={
                  errors.confirmPassword
                    ? "error"
                    : ""
                }
              />

              <span
                className="eye"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                <img
                  src={
                    showConfirmPassword
                      ? "./images/show.png"
                      : "./images/hide.png"
                  }
                  alt="toggle"
                />
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* CAPTCHA */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Enter Captcha <span>*</span>
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >

              {/* CAPTCHA INPUT */}
              <input
                type="text"
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);

                  if (errors.captcha) {
                    setErrors((prev) => ({
                      ...prev,
                      captcha: "",
                    }));
                  }
                }}
                className={
                  errors.captcha ? "error" : ""
                }
              />
              {/* CAPTCHA BOX */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #ececec, #dcdcdc)",
                  border: "1px solid #bbb",
                  padding: "10px 15px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  letterSpacing: "4px",
                  borderRadius: "6px",
                  userSelect: "none",
                  minWidth: "160px",
                  textAlign: "center",
                }}
              >
                {captcha}
              </div>

              {/* REFRESH BUTTON dfkd */}
              <button
                type="button"
                onClick={generateCaptcha}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                }}
              >
                ↻
              </button>
            </div>


            {errors.captcha && (
              <p className="error-text">
                {errors.captcha}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div style={{ marginTop: "20px" }}>
          <button
            type="submit"
            style={{ width: "100%" }}
          >
            Next
          </button>
        </div>

        <p className="terms">
          By clicking NEXT, you agree to our{" "}
          <span>Terms and Conditions</span>
        </p>

        <p className="login">
          Existing Account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default BasicDetails;

