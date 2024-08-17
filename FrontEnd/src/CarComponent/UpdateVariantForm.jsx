import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateVariantForm = () => {
  const location = useLocation();
  const variant = location.state;

  const [companies, setCompanies] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedImage, setSelectImage] = useState(null);
  const [error, setError] = useState(""); // State for error message
  const currentYear = new Date().getFullYear(); // Current year for validation
  const [variantRequest, setVariantRequest] = useState({
    id: variant.id,
    name: variant.name,
    description: variant.description,
    modelNumber: variant.modelNumber,
    year: variant.year,
    fuelType: variant.fuelType,
    isAC: variant.ac,
    seatingCapacity: variant.seatingCapacity,
    pricePerDay: variant.pricePerDay,
    companyId: variant.company.id,
  });
  const [errors, setErrors] = useState({
    nameError: "",
    modelNumberError: "",
    yearError: "",
  });

  let navigate = useNavigate();

  const retrieveAllCompany = async () => {
    const response = await axios.get("http://localhost:8080/api/company/fetch/all");
    return response.data;
  };

  const retrieveFuelTypes = async () => {
    const response = await axios.get("http://localhost:8080/api/car/rental/helper/fetch/fuel-type");
    return response.data;
  };

  useEffect(() => {
    const getAllCompany = async () => {
      const resCompany = await retrieveAllCompany();
      if (resCompany) {
        setCompanies(resCompany.companies);
      }
    };

    const getAllFuelTypes = async () => {
      const fuelTypes = await retrieveFuelTypes();
      if (fuelTypes) {
        setFuelTypes(fuelTypes);
      }
    };

    getAllFuelTypes();
    getAllCompany();
  }, []);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "isAC") {
      setVariantRequest({ ...variantRequest, [name]: checked });
    } else {
      setVariantRequest({ ...variantRequest, [name]: value });
    }

  
    if (name === "name" && value && value[0] !== value[0].toUpperCase()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError: "The first letter of the variant name must be capitalized.",
      }));
    } 

    // Handle year-specific validation
    if (name === "year") {
      // Allow up to 4 digits
      const trimmedValue = value.slice(0, 4);
      setVariantRequest({ ...variantRequest, [name]: trimmedValue });
  
      if (trimmedValue.length === 4) {
        const yearValue = parseInt(trimmedValue, 10);
        if (yearValue >= 1900 && yearValue <= currentYear) {
          setError(""); // Clear error if valid
        } else {
          setError(`Please enter a year between 1900 and ${currentYear}`);
        }
      } else {
        setError(""); // Clear error if less than 4 digits
      }
    } else {
      setVariantRequest({ ...variantRequest, [name]: value });
      setError(""); // Clear error for other fields
    }
  };
  

  const handleModelNumberInput = (e) => {
    // Allow only characters that match the model number format
    const value = e.target.value.toUpperCase(); // Convert to uppercase
    const regex = /^[0-9A-Z]*$/; // Allow digits and uppercase letters

    if (value === "" || regex.test(value)) {
      // Check length constraints based on character position
      const len = value.length;

      if (
        (len === 0 && value.match(/^[0-9]?$/)) || // 1st character should be digit
        (len > 0 && len <= 5 && value.match(/^[0-9][A-Z]{0,4}$/)) || // 2nd-5th capital letters
        (len > 5 && len <= 7 && value.match(/^[0-9][A-Z]{4}[0-9]{0,2}$/)) || // 6th-7th digits
        (len > 7 && len <= 11 && value.match(/^[0-9][A-Z]{4}[0-9]{2}[A-Z]{0,4}$/)) || // 8th-11th capital letters
        (len > 11 && len <= 17 && value.match(/^[0-9][A-Z]{4}[0-9]{2}[A-Z]{4}[0-9]{0,6}$/)) // rest digits
      ) {
        setVariantRequest({
          ...variantRequest,
          modelNumber: value,
        });
      }
    }
  };

  const saveVariant = (e) => {
    e.preventDefault();

    if (errors.nameError || errors.modelNumberError || errors.yearError) {
      toast.error("Please fix the validation errors before submitting.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (variantRequest === null) {
      toast.error("invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (
      variantRequest.companyId === "" ||
      variantRequest.isAC === "" ||
      variantRequest.fuelType === "" ||
      selectedImage === null
    ) {
      toast.error("Select Proper Details!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const formData = new FormData();
    formData.append("id", variantRequest.id);
    formData.append("name", variantRequest.name);
    formData.append("description", variantRequest.description);
    formData.append("modelNumber", variantRequest.modelNumber);
    formData.append("year", variantRequest.year);
    formData.append("fuelType", variantRequest.fuelType);
    formData.append("isAC", variantRequest.isAC); // Convert boolean to string
    formData.append("seatingCapacity", variantRequest.seatingCapacity);
    formData.append("pricePerDay", variantRequest.pricePerDay);
    formData.append("companyId", variantRequest.companyId);
    formData.append("image", selectedImage);

    axios
      .put("http://localhost:8080/api/variant/update", formData)
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
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
          }, 2000); // Redirect after 2 seconds
        } else {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
      <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div className="card form-card custom-bg" style={{ width: "60rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Update Variant</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    <b>Variant Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    value={variantRequest.name}
                  />
                  {errors.nameError && <div className="text-danger mt-2">{errors.nameError}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Variant Description</b>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={handleInput}
                    value={variantRequest.description}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Company</b>
                  </label>
                  <select
                    name="companyId"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option value={company.id} key={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Model Number</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="modelNumber"
                    placeholder="1ABCD12EFGH345678" // Placeholder according to the validation
                    onChange={handleModelNumberInput}
                    value={variantRequest.modelNumber}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="year" className="form-label">
                    <b>Year</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="year"
                    name="year"
                    onChange={handleInput}
                    value={variantRequest.year}
                  />
                  {errors.yearError && <div className="text-danger mt-2">{errors.yearError}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Fuel Type</b>
                  </label>
                  <select
                    name="fuelType"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Is AC</b>
                  </label>
                  <select
                    name="isAC"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Is AC</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="seatingCapacity" className="form-label">
                    <b>Seat Capacity</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="seatingCapacity"
                    name="seatingCapacity"
                    onChange={handleInput}
                    value={variantRequest.seatingCapacity}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="pricePerDay" className="form-label">
                    <b>Rent Per Day</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pricePerDay"
                    name="pricePerDay"
                    onChange={handleInput}
                    value={variantRequest.pricePerDay}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="image" className="form-label">
                    <b>Select Variant Image</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => setSelectImage(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    style={{
                      backgroundColor: "#28a745", // Success green color
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                    onClick={saveVariant}
                  >
                    <b>Update Variant</b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVariantForm;
