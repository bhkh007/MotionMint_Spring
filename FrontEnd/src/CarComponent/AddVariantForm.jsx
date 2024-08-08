import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddVariantForm = () => {
  const [companies, setCompanies] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedImage, setSelectImage] = useState(null);
  const [error, setError] = useState(""); // State for error message
  const currentYear = new Date().getFullYear(); // Current year for validation
  const navigate = useNavigate();

  const retrieveAllCompany = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/company/fetch/all"
    );
    return response.data;
  };

  const retrieveFuelTypes = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/car/rental/helper/fetch/fuel-type"
    );
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

  const [variantRequest, setVariantRequest] = useState({
    name: "",
    description: "",
    modelNumber: "",
    year: "",
    fuelType: "",
    isAC: true,
    seatingCapacity: "",
    pricePerDay: "",
    companyId: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
  
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
    if (!variantRequest.modelNumber || variantRequest.modelNumber.length !== 17) {
      toast.error("Invalid Model Number!!!", {
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
    
    if (error) {
      toast.error(error, {
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
    formData.append("name", variantRequest.name);
    formData.append("description", variantRequest.description);
    formData.append("modelNumber", variantRequest.modelNumber);
    formData.append("year", variantRequest.year);
    formData.append("fuelType", variantRequest.fuelType);
    formData.append("isAC", variantRequest.isAC);
    formData.append("seatingCapacity", variantRequest.seatingCapacity);
    formData.append("pricePerDay", variantRequest.pricePerDay);
    formData.append("companyId", variantRequest.companyId);
    formData.append("image", selectedImage);

    axios
      .post("http://localhost:8080/api/variant/add", formData)
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
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 2 seconds
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
              <h5 className="card-title">Add Variant</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
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

                    {companies.map((company) => {
                      return (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      );
                    })}
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
                    placeholder="Enter Year"
                    maxLength="4" // Limit to 4 digits
                  />
                  {error && <div className="text-danger mt-2">{error}</div>}
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

                    {fuelTypes.map((type) => {
                      return (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      );
                    })}
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
                  <label className="form-label">
                    <b>Seating Capacity</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="seatingCapacity"
                    onChange={handleInput}
                    value={variantRequest.seatingCapacity}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Price Per Day</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="pricePerDay"
                    onChange={handleInput}
                    value={variantRequest.pricePerDay}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Image</b>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={(e) => setSelectImage(e.target.files[0])}
                  />
                </div>

                <div className="col-12 mt-3" style={{ textAlign: 'center' }}>
                  <button
                    type="submit"
                    className="btn custom-bg-text custom-bg"
                    onClick={saveVariant}
                  >
                    Save Variant
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

export default AddVariantForm;
