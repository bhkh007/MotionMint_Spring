import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import creditcard from "../images/credit-card.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingPayment = () => {
  const location = useLocation();
  const booking = location.state;

  const sessionCustomer = JSON.parse(sessionStorage.getItem("active-customer"));
  let navigate = useNavigate();

  const [paymentRequest, setPaymentRequest] = useState({
    bookingId: booking.id,
    nameOnCard: "",
    cardNo: "",
    cvv: "",
    expiryDate: null, // Using Date object
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    if (name === "cardNo") {
      let formattedValue = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();
      setPaymentRequest({ ...paymentRequest, [name]: formattedValue });
    } else if (name === "cvv") {
      const cvvValue = value.replace(/\D/g, "").substring(0, 3); // Only digits and max length 3
      setPaymentRequest({ ...paymentRequest, [name]: cvvValue });
    } else {
      setPaymentRequest({ ...paymentRequest, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setPaymentRequest({ ...paymentRequest, expiryDate: date });
  };

  const payAndConfirmBooking = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    if (paymentRequest.expiryDate <= currentDate) {
      toast.error("Expiry date cannot be in the past", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    axios
      .put("http://localhost:8080/api/booking/customer/payment", paymentRequest, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.responseMessage, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/customer/bookings");
          }, 2000); // Redirect after 2 seconds
        } else {
          toast.error(response.data.responseMessage, {
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
      <div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
        <div
          className="card form-card rounded-card h-100 custom-bg"
          style={{
            maxWidth: "900px",
          }}
        >
          <div className="card-body header-logo-color ">
            <h4 className="card-title text-color text-center ">Payment Details</h4>

            <div className="row mt-4">
              <div className="col-sm-1 mt-2"></div>
              <div className="col-sm-4 mt-2">
                <img
                  src={creditcard}
                  className="card-img-top rounded img-fluid"
                  alt="img"
                  style={{
                    maxWidth: "500px",
                  }}
                />
              </div>
              <div className="col-sm-4 mt-2">
                <form className="row g-3" onSubmit={payAndConfirmBooking}>
                  <div className="text-color">
                    <label htmlFor="nameOnCard" className="form-label">
                      <b>Name on Card</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameOnCard"
                      name="nameOnCard"
                      onChange={handleUserInput}
                      value={paymentRequest.nameOnCard}
                      placeholder="Name Surname"
                      required
                    />
                  </div>
                  <div className="mb-3 text-color">
                    <label htmlFor="cardNo" className="form-label">
                      <b>Card Number</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNo"
                      name="cardNo"
                      onChange={handleUserInput}
                      value={paymentRequest.cardNo}
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </div>

                  <div className="col text-color">
                    <label htmlFor="expiryDate" className="form-label">
                      <b>Valid Through</b>
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={paymentRequest.expiryDate}
                      onChange={handleDateChange}
                      dateFormat="MM/yyyy"
                      minDate={new Date(new Date().setDate(1))} // Set minimum date to the current month
                      showMonthYearPicker
                      placeholderText="MM/YYYY"
                      required
                    />
                  </div>

                  <div className="col text-color">
                    <label htmlFor="cvv" className="form-label">
                      <b>CVV</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      onChange={handleUserInput}
                      value={paymentRequest.cvv}
                      placeholder="123"
                      maxLength="3"
                      required
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text ms-2"
                    value={`PAY ₹ ${booking.totalPrice}`}
                  />
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
