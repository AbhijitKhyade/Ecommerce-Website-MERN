import React from "react";

import { useSearch } from "../context/search";
import Layout from "../components/Layout/Layout";
import { BASE_URL } from "../api";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap justify-content-evenly">
            {values?.results.map((p) => (
              <div className="card mb-4" style={{ width: "18rem" }}>
                <img
                  src={`${BASE_URL}/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{ objectFit: "cover" }}
                  alt={p.name}
                />
                <div className="card-body  ">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title ">{p.name}</h5>
                    <p className="card-text">₹{p.price}</p>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">More Details</button>
                    <button className="btn btn-secondary">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
