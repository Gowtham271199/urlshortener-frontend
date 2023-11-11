import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { REACT_APP_BASE_URL } from "../../URLData";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        axios
          .post(`${REACT_APP_BASE_URL}/api/signin`, {
            email: email,
            password: password,
          })
          .then((res) => {
            if (res) {
              setError(`Welcome Mrs/Mr.${res.data.user.name}`);
              localStorage.setItem("TOKEN", res.data.token);
              localStorage.setItem("NAME", res.data.user.name);
              localStorage.setItem("EMAIL", res.data.user.email);
              setTimeout(() => {
                navigate("/profile");
              }, 3000);
            }
          })
          .catch((error) => {
            const notify = () =>
              toast.error(`*${error.response.data.message}*`, {
                theme: "colored",
              });
            notify();
          });
      } else {
        const notify = () => toast.error("Invalid input", { theme: "colored" });
        notify();
      }
    } catch (error) {
      const notify = () => toast.error(" Input Error", { theme: "colored" });
      notify();
      console.log("Error:", error);
    }
  };

  return (
    <>
        <div className="login">
            <div className="loginContainer">
                <form onSubmit={handleSubmit}>
                    {error && <p className="alert alert-success">{error}</p>}
                    <p className="display-4 text-center">Login</p>
                    <div className="mb-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Email-ID"
                    />
                    </div>

                    <div className="mb-4">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter your Password"
                    />
                    </div>
                    <p className="text-center">
                    <Link to="/forgetPassword">Forget Password</Link>
                    </p>

                    <button className="btn btn-primary">Login</button>
                    <ToastContainer autoClose={3000} theme="colored" />

                    <p className="text-center">
                    If you don't have an account ? <Link to="/signup">Signup</Link>
                    </p>
                </form>
            </div>
            
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
        </div>
    </>
  );
};

export default Login;
