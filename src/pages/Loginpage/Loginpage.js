import "./Loginpage.scss";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Loginpage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div className="d-flex justify-content align-items-center bg-primary">
      <div className="p-3 bg-white w-25">
        <form className="login-page">
          <div className="login-page__user mb-3">
            <label htmlFor="userName">UserName:</label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter Username"
              className="login-page__user-input form-control"
            />
          </div>
          <div className="login-page__pass mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="login-page__pass-input form-control"
            />
          </div>
          <button onClick={handleSubmit} className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
