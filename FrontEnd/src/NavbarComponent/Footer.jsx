import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-lg-start">
          <div className="container-fluid p-4 pb-0">
            <section>
              {/* Self Drive Cars in India Section */}
              <div className="row mb-4">
                <div className="col-lg-12">
                  <h5 className="text-uppercase text-color">Self Drive Cars in India</h5>
                  <div className="row">
                    {/* First Column */}
                    <div className="col-lg-4 col-md-6">
                      <ul className="list-unstyled">
                        <li><Link to="/bangalore" className="text-dark">Bangalore</Link></li>
                        <li><Link to="/pune" className="text-dark">Pune</Link></li>
                        <li><Link to="/delhi-ncr" className="text-dark">Delhi NCR</Link></li>
                        <li><Link to="/mumbai" className="text-dark">Mumbai</Link></li>
                        <li><Link to="/chennai" className="text-dark">Chennai</Link></li>
                        <li><Link to="/hyderabad" className="text-dark">Hyderabad</Link></li>
                        <li><Link to="/chandigarh" className="text-dark">Chandigarh</Link></li>
                        <li><Link to="/kolkata" className="text-dark">Kolkata</Link></li>
                        <li><Link to="/ahmedabad" className="text-dark">Ahmedabad</Link></li>
                        <li><Link to="/coimbatore" className="text-dark">Coimbatore</Link></li>
                      </ul>
                    </div>
                    {/* Second Column */}
                    <div className="col-lg-4 col-md-6">
                      <ul className="list-unstyled">
                        <li><Link to="/indore" className="text-dark">Indore</Link></li>
                        <li><Link to="/jaipur" className="text-dark">Jaipur</Link></li>
                        <li><Link to="/mangalore" className="text-dark">Mangalore</Link></li>
                        <li><Link to="/mysore" className="text-dark">Mysore</Link></li>
                        <li><Link to="/vizag" className="text-dark">Vizag</Link></li>
                        <li><Link to="/goa" className="text-dark">Goa</Link></li>
                        <li><Link to="/nagpur" className="text-dark">Nagpur</Link></li>
                        <li><Link to="/kochi" className="text-dark">Kochi</Link></li>
                        <li><Link to="/udaipur" className="text-dark">Udaipur</Link></li>
                        <li><Link to="/vijayawada" className="text-dark">Vijayawada</Link></li>
                      </ul>
                    </div>
                    {/* Third Column */}
                    <div className="col-lg-4 col-md-6">
                      <ul className="list-unstyled">
                        <li><Link to="/surat" className="text-dark">Surat</Link></li>
                        <li><Link to="/siliguri" className="text-dark">Siliguri</Link></li>
                        <li><Link to="/bhopal" className="text-dark">Bhopal</Link></li>
                        <li><Link to="/lucknow" className="text-dark">Lucknow</Link></li>
                        <li><Link to="/guwahati" className="text-dark">Guwahati</Link></li>
                        <li><Link to="/trivandrum" className="text-dark">Trivandrum</Link></li>
                        <li><Link to="/bhubaneswar" className="text-dark">Bhubaneswar</Link></li>
                        <li><Link to="/agra" className="text-dark">Agra</Link></li>
                        <li><Link to="/vadodara" className="text-dark">Vadodara</Link></li>
                        <li><Link to="/varanasi" className="text-dark">Varanasi</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Car Rentals at Airports Section */}
              <div className="row mb-4">
                <div className="col-lg-12">
                  <h5 className="text-uppercase text-color">Upcoming Car Rentals at Airports in India</h5>
                  <ul className="list-unstyled">
                    <li><Link to="/bangalore-airport" className="text-dark">Bangalore Airport</Link></li>
                    <li><Link to="/delhi-airport" className="text-dark">Delhi Airport</Link></li>
                    <li><Link to="/hyderabad-airport" className="text-dark">Hyderabad Airport</Link></li>
                    <li><Link to="/kochi-airport" className="text-dark">Kochi Airport</Link></li>
                    <li><Link to="/mumbai-airport" className="text-dark">Mumbai Airport</Link></li>
                    <li><Link to="/guwahati-airport" className="text-dark">Guwahati Airport</Link></li>
                    <li><Link to="/kolkata-airport" className="text-dark">Kolkata Airport</Link></li>
                    <li><Link to="/goa-airport" className="text-dark">Goa Airport</Link></li>
                    <li><Link to="/chennai-airport" className="text-dark">Chennai Airport</Link></li>
                    <li><Link to="/pune-airport" className="text-dark">Pune Airport</Link></li>
                  </ul>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="text-uppercase text-color">Additional Information</h5>
                  <p className="header-logo-color text-dark">
                    Let's keep in touch. Never Stop Living.
                  </p>
                  <a href="https://zoomcar.com" className="text-dark">Download Zoomcar App</a>
                  <p>We have incredible offers, discounts & much more in our app.</p>
                  <p>
                    By continuing past this page, you agree to our <a href="/terms" className="text-dark">Terms of Service</a>, <a href="/cookies" className="text-dark">Cookie Policy</a>, <a href="/privacy" className="text-dark">Privacy Policy</a>, and <a href="/content" className="text-dark">Content Policies</a>.
                  </p>
                  <p>All trademarks are properties of their respective owners. © 2012-2023 Zoomcar™ Ltd.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div>
          <h5 className="text-uppercase text-color">Connect With Us On:</h5>
            <p className="card-text " >
              <a href="https://www.facebook.com/motionmint" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} size="2x" style={{ marginRight: '10px' }} />
              </a>
               <a href="https://www.twitter.com/motionmint" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} size="2x" style={{ marginRight: '10px' }} />
              </a>
              <a href="https://www.instagram.com/motionmint" target="_blank" rel="noopener noreferrer">
                   <FontAwesomeIcon icon={faInstagram} size="2x" />
               </a>
          </p>
          </div>

          

          
          <div className="text-center text-color mt-4">
            © 2024 Copyright:
            <a className="text-color-3" href="https://motionmint.com/">
              motionmint.com
            </a>
            </div>
           



          



            
        </footer>
      </div>
    </div>
  );
};

export default Footer;
