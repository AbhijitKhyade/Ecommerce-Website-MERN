import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Badge } from "antd";

import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import SearchInput from "./../Form/SearchInput";
import useCategory from "../../hooks/useCategory";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  //handle logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand text-dark">
            🛒Ecommerce
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className="nav-link custom-hover-border">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item" style={{ paddingTop: "5px" }}>
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link custom-hover-border">
                  Cart
                </NavLink>
              </Badge>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link custom-hover-border"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link custom-hover-border">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginRight: "40px" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item nav-link"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="nav-link dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;