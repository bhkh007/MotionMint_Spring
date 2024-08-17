import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminRegisterForm = () => {
  let navigate = useNavigate();
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [registerRequest, setRegisterRequest] = useState({});
  const [errors, setErrors] = useState({});

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setRegisterRequest({ ...registerRequest, [name]: value });

    // Validation checks
    if (name === "emailId") {
      const validEmailDomains = [
        "@gmail.com",
        "@yahoo.com",
        "@outlook.com",
        "@rediff.com",
        "@hotmail.com",
      ];
      const isValidEmail = validEmailDomains.some((domain) =>
        value.endsWith(domain)
      );
      if (!isValidEmail) {
        setErrors({ ...errors, emailId: "Please enter a valid email" });
      } else {
        const { emailId, ...rest } = errors;
        setErrors(rest);
      }
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setErrors({
          ...errors,
          password:
            "Password must be at least 8 characters long, contain one letter, one digit, and one special character",
        });
      } else {
        const { password, ...rest } = errors;
        setErrors(rest);
      }
    }
  };

  const registerAdmin = (e) => {
    e.preventDefault();

    // Final validation check before submitting
    if (
      errors.emailId ||
      errors.password ||
      errors.firstName ||
      errors.lastName
    ) {
      toast.error("Please fix the validation errors before submitting.", {
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

    fetch("http://localhost:8080/api/user/admin/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(registerRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            toast.success("Admin Registered", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate("/home");
            }, 1000);
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
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
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="form-card border-color mb-2" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h4 className="card-title">Admin Register</h4>
            </div>
            <div className="card-body mt-3">
              <form> 
                <div className="mb-3 text-color">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={registerRequest.emailId || ""}
                  />
                  {errors.emailId && (
                    <small className="text-danger">{errors.emailId}</small>
                  )}
                </div>
                <div className="mb-3 text-color">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={registerRequest.password || ""}
                    autoComplete="on"
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#28a745", // Success green color
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                    onClick={registerAdmin}
                  >
                    <b>Register</b>
                  </button>
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterForm;
