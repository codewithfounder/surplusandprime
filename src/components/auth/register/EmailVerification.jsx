import React, { useRef } from "react";

const EmailVerification = ({
  formData,
  setFormData,
  errors,
  setErrors,
  nextStep, // ✅ ADD THIS
}) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (!value) return;

    let newOtp = formData.otp.split("");
    newOtp[index] = value;
    const finalOtp = newOtp.join("");

    setFormData({ ...formData, otp: finalOtp });

    // Move next
    if (index < 3) {
      inputsRef.current[index + 1].focus();
    }

    // ✅ AUTO VERIFY when 4 digits entered
    if (finalOtp.length === 4) {
      handleVerifyOTP(finalOtp);
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      let otpArray = formData.otp.split("");

      // If current box has value → clear it
      if (otpArray[index]) {
        otpArray[index] = "";
        setFormData({ ...formData, otp: otpArray.join("") });
      }
      // If empty → move back and clear previous
      else if (index > 0) {
        inputsRef.current[index - 1].focus();

        otpArray[index - 1] = "";
        setFormData({ ...formData, otp: otpArray.join("") });
      }
    }
  };

  // ✅ SEND OTP API
  const handleSendOTP = async () => {
    if (!formData.user_id) {
      alert("User not found. Please complete Step 1.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/virendra/SURPLUS/website/auth/verify_otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: formData.user_id,
            email: formData.email,
          }),
        }
      );

      const data = await res.json();

      if (data.status) {
        setFormData(prev => ({
          ...prev,
          user_id: data.user_id,   // ✅ IMPORTANT
          otp: ""                  // reset OTP
        }));

        nextStep(); // go to OTP screen
      }

      if (data.status) {
        alert("OTP sent successfully");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ VERIFY OTP API
  const handleVerifyOTP = async (otpValue) => {
    if (!otpValue || otpValue.length < 4) {
      setErrors((prev) => ({ ...prev, otp: "Enter valid OTP" }));
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/virendra/SURPLUS/website/auth/verify_otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: formData.user_id,
            otp: otpValue,
          }),
        }
      );

      const data = await res.json();

      if (data.status) {
        nextStep(); // ✅ move to step 3
      } else {
        setErrors((prev) => ({
          ...prev,
          otp: data.message || "Invalid OTP",
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="email-verification">
      <p className="text-center">
        Enter the OTP sent to <strong>{formData.email || "your email"}</strong>
      </p>

      <div className="otp-container">
        <div>
        {[0, 1, 2, 3].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            value={formData.otp[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
        </div>
        <div className="text-center">
      {/* ✅ SEND OTP BUTTON */}
      <button type="button" onClick={handleSendOTP}>
        Re-Send OTP
      </button>
        </div>
      </div>

      {errors.otp && <p className="error-text text-center">{errors.otp}</p>}

    </div>
  );
};

export default EmailVerification;