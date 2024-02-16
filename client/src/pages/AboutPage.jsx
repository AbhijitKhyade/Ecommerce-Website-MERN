import React from "react";

import Layout from "./../components/Layout/Layout";
import about from "../assets/images/about.jpeg";

const AboutPage = () => {
  return (
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={about} alt="contactus" style={{ width: "100%", height: "400px" }} />
        </div>
        <div className="col-md-4 ">
          <p className="mt-2 fs-5 text-justify">
            Welcome to our ecommerce platform! At our platform, we are
            passionate about providing you with a seamless and enjoyable online
            shopping experience. Our mission is to offer a wide range of
            high-quality products, from the latest fashion trends to
            cutting-edge electronics. We carefully curate our selection to
            ensure that you find exactly what you're looking for. Join us on
            this exciting journey of discovery and convenience. Happy shopping!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
