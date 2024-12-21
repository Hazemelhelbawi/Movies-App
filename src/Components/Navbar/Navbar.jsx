import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ userData, logout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <h3>Noxe</h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="home">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item ">
                  <NavLink className="nav-link" to="movies">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="tvshow">
                    Tv Show
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="people">
                    People
                  </NavLink>
                </li>

              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData ? (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello {userData.first_name}
                    </a>
                    <ul className="dropdown-menu bg-dark text-white" aria-labelledby="navbarDropdown">
                      <li className="dropdown-item bg-transparent">
                        <NavLink className="nav-link" to="profile">
                          Profile
                        </NavLink>
                      </li>
                      <li className="dropdown-item bg-transparent">
                        <NavLink className="nav-link" onClick={logout}>
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>

                  <li className="nav-item ">
                    <NavLink className="nav-link" to="register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              <ul className="list-unstyled d-flex m-auto ">
                <li className="mx-2">

                  <i target="_blank" to="www.facebook.com" className="fab fa-facebook  "></i>
                </li>
                <li className="mx-2">

                  <i target="_blank" to="www.twitter.com" className="fab fa-twitter"></i>
                </li>
                <li className="mx-2  ">

                  <i target="_blank" to="https://www.linkedin.com/in/hazem-elhelbawi" className="fab fa-linkedin"></i>
                </li>
                <li className="mx-2">

                  <i target="_blank" to="https://github.com/Hazemelhelbawi" className="fab fa-github"></i>
                </li>
              </ul>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
