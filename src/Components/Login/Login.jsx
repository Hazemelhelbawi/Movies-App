import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Login({ saveUser }) {
  const [validationError, setValidationError] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });

  function getUserInfo(e) {
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }

  function validateUser() {
    const schema = Joi.object({
  email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });

    const res = schema.validate(user, { abortEarly: false });
    if (res.error) {
      setValidationError(res.error.details);
      return false;
    }
    return true;
  }

  function login(e) {
    e.preventDefault();
    if (validateUser()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const validUser = existingUsers.find(
        (u) => u.email === user.email && u.password === user.password
      );

      if (validUser) {
        localStorage.setItem("token", JSON.stringify(validUser)); // Store user data as "token"
        saveUser();
        navigate("/");
      } else {
        setErrorMsg("Invalid email or password.");
      }
    }
  }

  return (
    <>
    <div className="container">
      <div className="w-75 mx-auto">
        <h3>Login Form</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={login}>
          <div className="form-group">
            <label>Email:</label>
            <input onChange={getUserInfo} className="form-control" type="text" name="email" />
            <div className="text-danger">
              {validationError.find((ele) => ele.context.label === "email")?.message}
            </div>
          </div>
            <div className="form-group">
              <label className="mt-3" htmlFor="password">
                Password :
              </label>
              <input
                onChange={(e) => getUserInfo(e)}
                className="form-control"
                type="password"
                id="password"
                name="password"
              />
              <div className="text-danger">
                {
                  validationError.filter(
                    (ele) => ele.context.label === "password"
                  )[0]?.message
                }
              </div>
            </div>
            <div className="my-3">
              <button className=" d-flex ms-auto btn btn-info">
SignIn
                {/* {loading ? (
                  `SignIn`
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}