import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserRegister = () => {
  const navigate = useNavigate();
  
  // State to handle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (password) => {
      const strength = {
        value: 0,
        text: "Weak",
        color: "red",
      };

      const hasLetters = /[a-zA-Z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasCapitalLetters = /[A-Z]/.test(password);
      const hasSpecialCharacters = /[@$!%*#?&]/.test(password);

      if (hasLetters && hasNumbers && hasCapitalLetters && hasSpecialCharacters) {
        strength.value = 100;
        strength.text = "Strong";
        strength.color = "green";
      } else if (hasLetters && hasNumbers && hasCapitalLetters) {
        strength.value = 75;
        strength.text = "Good";
        strength.color = "blue";
      } else if (hasLetters && hasCapitalLetters) {
        strength.value = 50;
        strength.text = "Medium";
        strength.color = "yellow";
      } else if (hasLetters) {
        strength.value = 25;
        strength.text = "Weak";
        strength.color = "red";
      }

      return strength;
    };

    const { value, text, color } = getStrength(password);

    return (
      <div className="password-strength-meter">
        <div
          className="password-strength-bar"
          style={{
            width: "100%",
            height: "5px",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            marginTop: "5px",
            position: "relative",
          }}
        >
          <div
            className="password-strength-fill"
            style={{
              width: `${value}%`,
              height: "100%",
              backgroundColor: color,
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          className="password-strength-text"
          style={{
            marginTop: "5px",
            color: color,
            fontWeight: "bold",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      </div>
    );
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    pincode: "",
    city: "",
    street: "",
  });

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "Customer" }));
    }
  }, []);

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });

    // Validation logic
    let error = "";
    if (name === "emailId") {
      const validEmailDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@rediff.com", "@hotmail.com"];
      if (!validEmailDomains.some((domain) => value.endsWith(domain))) {
        error = "Please enter a valid email";
      }
    } else if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(value)) {
        error = "Password must be at least 8 characters";
      }
    } else if (name === "confirmPassword") {
      if (value !== user.password) {
        error = "Passwords do not match";
      }
    } else if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) {
        error = "Pincode must be exactly 6 digits";
      }
    } else if (name === "phoneNo") {
      if (!/^\d{1,10}$/.test(value)) {
        error = "Phone number must be exactly 10 digits";
      }
    } else if (name === "firstName" || name === "lastName") {
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(value)) {
        error = `${name === "firstName" ? "First Name" : "Last Name"} can only contain letters`;
      } else if (value && value[0] !== value[0].toUpperCase()) {
        error = `First letter of ${name === "firstName" ? "First Name" : "Last Name"} must be capitalized`;
      }
    } else if (name === "city") {
      const cityRegex = /^[A-Za-z\s]+$/;
      if (!cityRegex.test(value)) {
        error = "City can only contain letters and spaces";
      }
    } else if (name === "street") {
      const streetRegex = /^[A-Za-z0-9\s]+$/;
      if (!streetRegex.test(value)) {
        error = "Street can only contain letters, numbers, and spaces";
      }
    }

    setErrors({ ...errors, [name]: error });
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "") || Object.values(user).some((value) => value === "")) {
      toast.error("Please fix the errors in the form", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate("/user/login");
            }, 1000);
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Register Here!!!</h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                    required
                  />
                  {errors.firstName && (
                    <small className="text-danger">{errors.firstName}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="lastName" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                    required
                  />
                  {errors.lastName && (
                    <small className="text-danger">{errors.lastName}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                    required
                  />
                  {errors.emailId && (
                    <small className="text-danger">{errors.emailId}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Phone No</b>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                    required
                  />
                  {errors.phoneNo && (
                    <small className="text-danger">{errors.phoneNo}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={handleUserInput}
                      value={user.password}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <PasswordStrengthMeter password={user.password} />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="confirmPassword" className="form-label">
                    <b>Confirm Password</b>
                  </label>
                  <div className="input-group">
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleUserInput}
                      value={user.confirmPassword}
                      required
                    />
                    
                  </div>
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="street" className="form-label">
                    <b>Street</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    onChange={handleUserInput}
                    value={user.street}
                    required
                  />
                  {errors.street && (
                    <small className="text-danger">{errors.street}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                    required
                  />
                  {errors.city && (
                    <small className="text-danger">{errors.city}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                    required
                  />
                  {errors.pincode && (
                    <small className="text-danger">{errors.pincode}</small>
                  )}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success mt-2"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
