import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ViewVariantDetail = () => {
  const { variantId } = useParams(); // Get the variant ID from the URL params
  const [variantDetails, setVariantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVariantDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/variant/${variantId}`
        );
        setVariantDetails(response.data.variant);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching variant details:", error);
        toast.error("Failed to fetch variant details. Please try again later.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      }
    };

    fetchVariantDetails();
  }, [variantId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!variantDetails) {
    return <div>No variant details found.</div>;
  }

  // Convert isac to a boolean value
  const isACAvailable = variantDetails.isac ? "Yes" : "No";

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
              <h5 className="card-title">Variant Details</h5>
            </div>
            <div className="card-body text-color">
              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Variant Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={variantDetails.name}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Variant Description</b>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={variantDetails.description}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Company</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={variantDetails.company.name}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Model Number</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={variantDetails.modelNumber}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Year</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={variantDetails.year}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Fuel Type</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={variantDetails.fuelType}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Seating Capacity</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={variantDetails.seatingCapacity}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Price Per Day</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={variantDetails.pricePerDay}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>AC Available?</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={isACAvailable}
                    readOnly
                  />
                </div>

                <div className="col-md-12 mb-3 text-center">
                  <label className="form-label">
                    <b>Image</b>
                  </label>
                  <div>
                    {variantDetails.image && (
                      <img
                        src={variantDetails.image}
                        alt="Variant"
                        style={{ width: "300px", height: "200px" }}
                      />
                    )}
                    {!variantDetails.image && (
                      <div className="text-danger">No image available</div>
                    )}
                  </div>
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    className="btn custom-bg text-color"
                    onClick={() => window.history.back()}
                  >
                    Back to List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVariantDetail;
