import React from "react";

import Layout from "../components/Layout/Layout";
import contactUs from "../assets/images/contactus.jpeg";

const PolicyPage = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={contactUs} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4 text-wrap h-100">
          <h3>Information We Collect</h3>
          <h4>Personal Information:</h4>
          <li>
            When you visit our Site or make a purchase, we may collect personal
            information, such as your name, email address, postal address, phone
            number, and payment information.
          </li>
          <h4>Usage Information:</h4>
          <li>
            We automatically collect information about your use of the Site,
            including your IP address, browser type, and device information.
          </li>
          <h4>Cookies:</h4>
          <li>
            We use cookies and similar technologies to collect information about
            your browsing and purchasing behavior. How We Use Your Information
          </li>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPage;
