import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Register() {
  const [validationError, setValidationError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

  function getUserInfo(e) {
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }

  function validationUser() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      age: Joi.number().min(15).max(60).required(),
    });

    const res = schema.validate(user, { abortEarly: false });
    if (res.error) {
      setValidationError(res.error.details);
      return false;
    }
    setValidationError(null); // Clear validation errors if no issues
    return true;
  }

  function register(e) {
    e.preventDefault();
    if (validationUser()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some((u) => u.email === user.email);

      if (userExists) {
        setErrorMsg("Email is already registered.");
      } else {
        localStorage.setItem("users", JSON.stringify([...existingUsers, user]));
        navigate("/login");
      }
    }
  }

  return (
    <div className="container">
      <div className="w-75 mx-auto">
        <h3>Registration Form</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={register}>
          <div className="form-group">
            <label>First Name:</label>
            <input onChange={getUserInfo} className="form-control" type="text" name="first_name" />
            <div className="text-danger">
              {validationError &&
                validationError.find((ele) => ele.context.label === "first_name")?.message.replace(
                  /["]/g,
                  ""
                )}
            </div>
          </div>

          <div className="form-group">
            <label className="mt-3" htmlFor="last_name">
              Last Name:
            </label>
            <input
              onChange={getUserInfo}
              className="form-control"
              type="text"
              id="last_name"
              name="last_name"
            />
            <div className="text-danger">
              {validationError &&
                validationError.find((ele) => ele.context.label === "last_name")?.message.replace(
                  /["]/g,
                  ""
                )}
            </div>
          </div>

          <div className="form-group">
            <label className="mt-3" htmlFor="age">
              Age:
            </label>
            <input
              onChange={getUserInfo}
              className="form-control"
              type="number"
              id="age"
              name="age"
            />
            <div className="text-danger">
              {validationError &&
                validationError.find((ele) => ele.context.label === "age")?.message.replace(
                  /["]/g,
                  ""
                )}
            </div>
          </div>

          <div className="form-group">
            <label className="mt-3" htmlFor="email">
              Email:
            </label>
            <input
              onChange={getUserInfo}
              className="form-control"
              type="text"
              id="email"
              name="email"
            />
            <div className="text-danger">
              {validationError &&
                validationError.find((ele) => ele.context.label === "email")?.message.replace(
                  /["]/g,
                  ""
                )}
            </div>
          </div>

          <div className="form-group">
            <label className="mt-3" htmlFor="password">
              Password:
            </label>
            <input
              onChange={getUserInfo}
              className="form-control"
              type="password"
              id="password"
              name="password"
            />
            <div className="text-danger">
              {validationError &&
                validationError.find((ele) => ele.context.label === "password")?.message.replace(
                  /["]/g,
                  ""
                )}
            </div>
          </div>

          <div className="my-3">
            <button type="submit" className="d-flex ms-auto btn btn-info">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
