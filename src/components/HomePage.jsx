import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-end">
          <h2>Welcome to the home page</h2>
          <div className="col-auto">
            <button onClick={handleLogout} class="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
