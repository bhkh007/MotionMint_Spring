import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import logo from "../images/e_logo.png";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <img
            src={logo}
            height="50"
            width="auto"
            className="d-inline-block align-top"
            alt=""
          />
          <Link to="/" className="navbar-brand">
            <b className="header-logo-color ms-2" style={{ fontSize: '25px', fontFamily: 'sans-serif' }}>
              MotionMint
            </b>
          </Link>
          <Link to="/aboutus" className="navbar-brand">
            <i className="text-color">
              <b>AboutUs</b>
            </i>
          </Link>
          <Link to="/contactus" className="navbar-brand">
            <i className="text-color">
              <b>ContactUs</b>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
