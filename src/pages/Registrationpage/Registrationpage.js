import "../Loginpage/Loginpage.scss";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function Registrationpage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  function registrationValidation(name, userName, password) {
    let errors = {};
    const name_pattern = /^[a-zA-Z]{3,}$/;
    const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const password_pattern = /^[a-zA-Z0-9]{6,}$/;

    if (!name.trim()) {
      errors.name = "Name required";
    } else if (!name_pattern.test(name)) {
      errors.name = "Name needs to be at least 3 characters";
    }

    if (!userName.trim()) {
      errors.userName = "Username required";
    } else if (!email_pattern.test(userName)) {
      errors.userName = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password required";
    } else if (!password_pattern.test(password)) {
      errors.password = "Password needs to be at least 6 characters";
    }

    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(registrationValidation(name, userName, password));
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="login">
      <div className="login__container">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form__user mb-3">
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className="login-form__user-input form-control"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="login-form__user--danger">{errors.name}</span>
            )}
          </div>
          <div className="login-form__user mb-3">
            <label htmlFor="userName">
              <strong>UserName:</strong>
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter Username"
              className="login-form__user-input form-control"
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && (
              <span className="login-form__user--danger">
                {errors.userName}
              </span>
            )}
          </div>
          <div className="login-form__pass mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="login-form__pass-input form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="login-form__pass--danger">
                {errors.password}
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
          <button onClick={handleLogin} className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registrationpage;
