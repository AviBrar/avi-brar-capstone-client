import "./Loginpage.scss";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import LoginValidation from "../../components/Validation/Validation";
import axios from "axios";

export default function Loginpage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(LoginValidation(userName, password));
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:8080/auth/login", {
          username: userName,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
            Login
          </button>
          <button onClick={handleRegistration} className="btn btn-success">
            Ceate Account
          </button>
        </form>
      </div>
    </div>
  );
}
