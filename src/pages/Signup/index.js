import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./SignUp.css";
import 'react-toastify/dist/ReactToastify.css';
import { REACT_APP_BASE_URL } from "../../URLData";

const SignUp = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (name && email && password) {
        axios.post(`${REACT_APP_BASE_URL}/api/signup`, {
            name: name,
            email: email,
            password: password
          })
          .then(res => {
            if (res) {
              setError(res.data.message);
              setTimeout(() => {
                navigate('/')
              }, 3000)
            }
          })
          .catch(error => {
            const notify = () =>
              toast.error(`*${error.response.data.message}*`, {
                theme: 'colored'
              })
            notify()
          })
      } else {
        const notify = () => toast.error('Invalid input', { theme: 'colored' })
        notify()
      }
    } catch (error) {
      const notify = () => toast.error(' Input Error', { theme: 'colored' })
      notify()
      console.log('Error:', error)
    }
  }
  return (
    <>
        <div className="signup">
            <div className="col-md-5">
                <div className="lottie">
                    <lottie-player
                        src="https://assets3.lottiefiles.com/packages/lf20_qpsnmykx.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    ></lottie-player>
                </div>
            </div>
            <div className="signupContainer">
                <form onSubmit={handleSubmit}>
                    {error && <p className="alert alert-success">{error}</p>}
                    <p className="display-4 text-center">Signup</p>
                    <div className="mb-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="name"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Enter your Name"
                    />
                    </div>

                    <div className="mb-3">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter your Email"
                    />
                    </div>

                    <div className="mb-3">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="Password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter your Password"
                    />
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Signup
                    </button>
                    <ToastContainer hideProgressBar={true} />
                </form>
            </div>
        </div>
    </>
  );
};

export default SignUp;
