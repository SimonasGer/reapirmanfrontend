import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

const MainPage = ({ onLogout }) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const [repairmen, setRepairmen] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch repairmen ads from the backend
    axios
      .get("https://repairmanbackend.vercel.app//repairman", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((response) => setRepairmen(response.data.data.repairmen))
      .catch((error) => console.error("Error fetching repairmen:", error));

      if(!localStorage.getItem("token")){
        navigate("/login")
      }
  }, []);

  const handleAddRepairman = () => {
    navigate("/addrepairman");
  };

  const handleLike = (id) => {
    axios
      .post(`https://www.repairmanbackend.vercel.app/repairman/${id}`, {likes: userId}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .catch((error) => console.error("Error fetching repairmen:", error));
      console.log(repairmen)
  }

  return (
    <div>
      <Header pageTitle="Main Page" onLogout={onLogout} />
      <div className="container mt-5">
        <h2>Repairman Ads</h2>
        <div className="row">
          {repairmen.map((repairman) => (
            <div className="col-md-4" key={repairman._id}>
              <div className="card mb-4">
                <img
                  src={repairman.picture}
                  className="card-img-top"
                  alt={repairman.fname}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {repairman.fname} {repairman.lname}
                  </h5>
                  <p className="card-text">
                    <strong>Specialization:</strong> {repairman.spec}
                  </p>
                  <p className="card-text">
                    <strong>Service Name:</strong> {repairman.shop}
                  </p>
                  <p className="card-text">
                    <strong>City:</strong> {repairman.city}
                  </p>
                  <button onClick={() => handleLike(repairman._id)} className={`h2`}>
                  ♥ <span>{repairman.likes.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {localStorage.getItem("role") == "admin" && <button className="btn btn-primary mt-4" onClick={handleAddRepairman}>
          Add Repairman
        </button>}
      </div>
    </div>
  );
};

export default MainPage;
