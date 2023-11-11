import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REACT_APP_BASE_URL } from "../../URLData";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

    const handleLogout = () => {
        try {
        axios.get(`${REACT_APP_BASE_URL}/api/signout`)
            .then(res => {
            if (res) {
                setError(res.data.message)
                localStorage.removeItem('TOKEN')
                setTimeout(() => {
                navigate('/')
                }, 1000)
            }
            })
            .catch(err => setError(err.response.data.message))
        } catch (error) {
        console.log('Error:', error);
        };
    };


  return (
    <>
        <div className="row Navbar">
            <div className="logo">
                <h1 className="display-3 text-center">URL Shortner Application</h1>
            </div>
            <div className="col-md-3 NavbarLogout">
                <h5
                    className="text-center"
                    style={{ borderBottom: "1px solid white", paddingBottom: "5px", paddingTop: "5px" }}
                >
                    User Profile Information
                </h5>
                <h6>Name: {localStorage.getItem("NAME")}</h6>
                <h6>E-mail: {localStorage.getItem("EMAIL")}</h6>
                <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                </button>
            </div>
        </div>
      {error && <p className="alert alert-success">{error}</p>}
    </>
  );
};

export default Navbar;
