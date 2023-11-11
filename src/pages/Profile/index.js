import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { REACT_APP_BASE_URL } from "../../URLData";

import "./Profile.css";


const Profile = () => {
  const navigate = useNavigate();
  const [urlList, setUrlList] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('TOKEN')
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    getUrlList()
  }, []);

  const getUrlList = () => {
    axios.get(`${REACT_APP_BASE_URL}/api/getUrl`)
    .then(response => {
    setUrlList(response.data)
    })
    .catch(error => {
        console.log('Error:', error)
    })
  };

  const deleteUrl = urlId => {
    axios.delete(`${REACT_APP_BASE_URL}/api/deleteUrl/${urlId}`)
    .then(response => {
    if (response) {
        getUrlList()
    }
    })
    .catch(error => {
        console.log('Error:', error)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (longUrl) {
        axios.post(`${REACT_APP_BASE_URL}/api/create`, {
          longUrl: longUrl
        })
        .then(res => {
        setError(res.data.message)
        setLongUrl('')
        getUrlList()
        setTimeout(() => {
          setError('')
        }, 2000)
        })
        .catch(err => {
        setError(err.response.data.message)
        setTimeout(() => {
          setError('')
        }, 2000)
        })
      } else {
        setError('Invalid input')
        setTimeout(() => {
          setError('')
        }, 2000)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Navbar />
        {error && <p className="alert alert-success">{error}</p>}

        <div className="inputSession row">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Paste your long URL"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <input className="btn btn-success p-3" type="submit" />
              </div>
            </div>
            <br />
          </form>
        </div>

        <div className="row urlList">
          {urlList.map((url, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="card border-secondary mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">
                  <h5>Total Click : {url.clickCount}</h5>
                </div>
                <div className="card-body text-secondary">
                  <h6 className="card-title p-2">
                    Short URL :{" "}
                    <a
                      href={`${REACT_APP_BASE_URL}/api/${url.shortUrl}`}
                      className="urlHeading"
                      target="_blank"
                      without
                      rel="noreferrer"
                    >
                      {REACT_APP_BASE_URL}/api/{url.shortUrl}
                    </a>
                  </h6>
                  <h6 className="p-2">
                    Long URL :{" "}
                    <span className="card-text urlHeading">{url.longUrl}</span>
                  </h6>
                  <button
                    onClick={() => deleteUrl(url._id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
