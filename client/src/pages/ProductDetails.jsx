import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Layout from "./../components/Layout/Layout";
import { BASE_URL } from "../api";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    //get product
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getRelatedProducts(data?.product._id, data?.product?.category._id);
      } catch (error) {
        console.log(error);
      }
    };
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get relatedProduct products
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product- Details"}>
      <div className="d-flex justify-content-center mt-5 >">
        <div className="row container m-2 ">
          <div className="col-md-4 text-center">
            <img
              src={`${BASE_URL}/product/product-photo/${product._id}`}
              className="card-img-top border"
              style={{ objectFit: "cover", width: "300px", height: "300px" }}
              alt={product.name}
            />
          </div>
          <div className="col-md-8 border">
            <h1 className="text-center">Product Details</h1>
            <h4>Name: {product.name}</h4>
            <h4>Description: {product.description}</h4>
            <h4>Price: {product.price}</h4>
            <h4>Category: {product?.category?.name}</h4>
            <div className="p-2">
              <button className="btn btn-secondary w-100">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center w-100 mt-5">
        <div className="row container m-2">
          <h5>Similar Products</h5>
          {relatedProduct.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex justify-content-evenly flex-wrap">
            {relatedProduct?.map((p) => (
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

export default ProductDetails;
