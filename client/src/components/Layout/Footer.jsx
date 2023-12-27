import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h3 className="text-center">All Right Reserved &copy; Abhi</h3>
      <p className="text-center mt-3">
        <Link to="/about" className="custom-hover-border-footer">
          About
        </Link>
        |
        <Link to={"/contact"} className="custom-hover-border-footer">
          Contact
        </Link>
        |
        <Link to="/policy" className="custom-hover-border-footer">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
