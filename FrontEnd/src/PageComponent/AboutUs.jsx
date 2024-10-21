import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <div className="container mt-5">
       <h4 
        className="mb-3"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2em',
          color: '#333',
          transition: 'color 0.3s',
          fontWeight: 'bold',
        }}
        onMouseEnter={(e) => e.target.style.color = '#007bff'}
        onMouseLeave={(e) => e.target.style.color = '#333'}
      >
        About Us
      </h4>
      <p style={{ fontWeight: 'bold', lineHeight: '1.6', fontSize: '1.2em', fontFamily: 'Arial, sans-serif' }}>
        Welcome to Motion Mint, your premier destination for car rental services.
        At Motion Mint, we are dedicated to providing our customers with an exceptional
        car rental experience. Whether you need a car for a business trip, a family
        vacation, or any other occasion, we have a wide range of vehicles to suit your needs.
      </p>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                Wide Range of Vehicles <span className="badge bg-success">New</span>
              </h5>
              <p className="card-text">
                Choose from a variety of cars, from compact to luxury SUVs, all well-maintained and ready for your journey.
              </p>
              <p className="card-text">
                We regularly update our fleet to ensure you have access to the latest models and features for a comfortable ride.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                Customer Satisfaction <span className="badge bg-primary">Top Rated</span>
              </h5>
              <p className="card-text">
                Our user-friendly online booking system allows you to reserve a car in just a few clicks.
              </p>
              <p className="card-text">
                Enjoy the convenience of booking from anywhere at any time, with instant confirmation and secure payment options.
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                Flexible Rental Options <span className="badge bg-warning">Popular</span>
              </h5>
              <p className="card-text">
                We offer daily, weekly, and monthly rates to accommodate your specific needs.
              </p>
              <p className="card-text">
                Whether you need a car for a short trip or an extended stay, we have options to fit your schedule and budget.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                Online Booking <span className="badge bg-info">Easy</span>
              </h5>
              <p className="card-text">
                Our top priority is to ensure customer satisfaction with a seamless rental experience.
              </p>
              <p className="card-text">
                We strive to provide exceptional service and value, ensuring our customers return time and again.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                Reliable Service <span className="badge bg-danger">24/7</span>
              </h5>
              <p className="card-text">
                All our vehicles are regularly serviced and inspected to ensure safety and reliability.
              </p>
              <p className="card-text">
                Our dedicated team is available around the clock to assist with any issues or emergencies, providing peace of mind on the road.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                Customer Support <span className="badge bg-secondary">Support</span>
              </h5>
              <p className="card-text">
                Our friendly staff are always ready to assist you with any questions or concerns.
              </p>
              <p className="card-text">
                We offer comprehensive support before, during, and after your rental to ensure a hassle-free experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontWeight: 'bold', lineHeight: '1.6', fontSize: '1.2em', fontFamily: 'Arial, sans-serif', marginTop: '20px', textAlign: 'center' }}>
        <p>Thank you for choosing Motion Mint. </p>
        <p>We look forward to serving you and making your car rental experience a pleasant one.</p>
      </p>
    </div>
  );
};

export default AboutUs;
