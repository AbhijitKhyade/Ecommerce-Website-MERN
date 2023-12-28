import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Layout from "./../../components/Layout/Layout";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    try {
      const res = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while signing up");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container ">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h4 className="title">REGISTER FORM</h4>

          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control ${
                isFormSubmitted && !name ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Name"
              required
              autoFocus
            />
            {isFormSubmitted && !name && (
              <div className="invalid-feedback">Please enter your name</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${
                isFormSubmitted && !email ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Email"
              required
            />
            {isFormSubmitted && !email && (
              <div className="invalid-feedback">Please enter your email</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${
                isFormSubmitted && !password ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Password"
              required
            />
            {isFormSubmitted && !password && (
              <div className="invalid-feedback">Please enter your password</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`form-control ${
                isFormSubmitted && !phone ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Phone"
              required
            />
            {isFormSubmitted && !phone && (
              <div className="invalid-feedback">
                Please enter your phone number
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`form-control ${
                isFormSubmitted && !address ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Address"
              required
            />
            {isFormSubmitted && !address && (
              <div className="invalid-feedback">Please enter your address</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`form-control ${
                isFormSubmitted && !answer ? "is-invalid" : ""
              }`}
              placeholder="What is your favorite Sport?"
              required
            />
            {isFormSubmitted && !answer && (
              <div className="invalid-feedback">
                Please enter your favorite sport
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
