import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

import Layout from "../components/Layout/Layout";
import contactUs from "../assets/images/contact.jpeg";

const ContactUsPage = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div className="col-md-6 ">
          <img src={contactUs} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any query and information about product feel free to call
            anytime we 24X7 available
          </p>
          <p className="mt-3">
            <BiMailSend /> : abhi@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 91-1234567899
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUsPage;
