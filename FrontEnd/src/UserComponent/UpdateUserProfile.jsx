import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    passwordError: "",
    confirmPasswordError: "",
    phoneNoError: "",
    pincodeError: "",
    emailError: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/fetch/user-id?userId=${id}`);
        if (response.data.success) {
          setUser(response.data.users[0]);
        } else {
          toast.error("Failed to fetch user details", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error("Server error", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    if (name === 'street' || name === 'city' || name === 'pincode') {
      setUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [name]: value,
        },
      }));
    } else {
      setUser({ ...user, [name]: value });
    }

    switch (name) {
      case "password":
        validatePassword(value);
        break;
      case "confirmPassword":
        validateConfirmPassword(value);
        break;
      case "phoneNo":
        validatePhoneNo(value);
        break;
      case "pincode":
        validatePincode(value);
        break;
      case "emailId":
        validateEmail(value);
        break;
      default:
        break;
    }
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrors({
        ...errors,
        passwordError: "Password must be at least 8 characters long, with at least one digit, one uppercase letter, and one special character.",
      });
    } else {
      setErrors({
        ...errors,
        passwordError: "",
      });
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== user.password) {
      setErrors({
        ...errors,
        confirmPasswordError: "Passwords do not match.",
      });
    } else {
      setErrors({
        ...errors,
        confirmPasswordError: "",
      });
    }
  };

  const validatePhoneNo = (phoneNo) => {
    const phoneNoPattern = /^\d{0,10}$/; // Allow max 10 digits
    if (!phoneNoPattern.test(phoneNo)) {
      setErrors({
        ...errors,
        phoneNoError: "Phone number must be up to 10 digits.",
      });
    } else {
      setErrors({
        ...errors,
        phoneNoError: "",
      });
    }
  };

  const validatePincode = (pincode) => {
    const pincodePattern = /^\d{0,6}$/; // Allow max 6 digits
    if (!pincodePattern.test(pincode)) {
      setErrors({
        ...errors,
        pincodeError: "Pincode must be up to 6 digits.",
      });
    } else {
      setErrors({
        ...errors,
        pincodeError: "",
      });
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|rediff\.com|hotmail\.com)$/;
    if (!emailPattern.test(email)) {
      setErrors({
        ...errors,
        emailError: "Please enter a valid email address.",
      });
    } else {
      setErrors({
        ...errors,
        emailError: "",
      });
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (errors.passwordError || errors.confirmPasswordError || errors.phoneNoError || errors.pincodeError || errors.emailError) {
      toast.error("Please correct the errors before updating.", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/user/profile/update/${id}`, {
        userId: id,
        emailId: user.emailId,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNo,
        street: user.street,
        city: user.city,
        pincode: user.pincode,
      });

      if (response.data.success) {
        toast.success(response.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        toast.error(response.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error('Server error', {
        position: 'top-center',
        autoClose: 1000,
      });
    }
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
              <h5 className="card-title">Update Profile</h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={updateUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    disabled
                  />
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
                    value={user.lastName}
                    disabled
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="role" className="form-label">
                    <b>Role</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    value={user.role}
                    disabled
                  />
                </div>
                
                <div className="col-md-6 mb-3 text-color">
                  <b>
                    <label className="form-label">Email Id</label>
                  </b>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                  />
                  {errors.emailError && <div className="text-danger mt-2">{errors.emailError}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                  />
                  {errors.passwordError && <div className="text-danger mt-2">{errors.passwordError}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    <b>Confirm Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleUserInput}
                    value={user.confirmPassword}
                  />
                  {errors.confirmPasswordError && <div className="text-danger mt-2">{errors.confirmPasswordError}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Phone Number</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                  />
                  {errors.phoneNoError && <div className="text-danger mt-2">{errors.phoneNoError}</div>}
                </div>

                <div className="col-md-6 mb-3">
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
                  />
                  {errors.pincodeError && <div className="text-danger mt-2">{errors.pincodeError}</div>}
                </div>

                <div className="col-md-6 mb-3">
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
                  />
                </div>

                <div className="col-md-6 mb-3">
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
                  />
                </div>

                

                <div className="col-12 text-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUserProfile;
