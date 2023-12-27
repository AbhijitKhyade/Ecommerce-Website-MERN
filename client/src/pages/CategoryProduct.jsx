import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout/Layout";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductCategory();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center">Category - {category?.name}</h3>
        <p className="text-center fs-5">{products?.length} results found</p>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-evenly">
            {products?.map((p) => (
              <div className="card mb-4" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/product/product-photo/${p._id}`}
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
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
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

export default CategoryProduct;
