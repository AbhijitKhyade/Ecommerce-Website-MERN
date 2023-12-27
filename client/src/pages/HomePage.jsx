import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "./../components/Layout/Layout";
import { Prices } from "../components/prices";
import { useCart } from "../context/cart";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //handling filters by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/category/get-categories"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  //get all filters
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"All Products - Shop Now!"}>
      <div className="row m-3">
        <div className="col-md-2 mx-1">
          <h5>Filter by Category</h5>
          <div className="d-flex flex-column gap-2">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h5 className="mt-4">Filter by Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="mt-2">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9" style={{ width: "82%" }}>
          <h1 className="text-center">All Products</h1>
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
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
