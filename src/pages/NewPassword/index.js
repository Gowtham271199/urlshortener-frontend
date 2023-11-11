import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./NewPassword.css";
import 'react-toastify/dist/ReactToastify.css';
import { REACT_APP_BASE_URL } from "../../URLData";

const NewPassword = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
        e.preventDefault();
        try {
        if (otp && password) {
            axios.post(`${REACT_APP_BASE_URL}/api/submitotp`, { otp: otp, password: password })
            .then(res => {
                console.log(res.data);
                if (res.data.code === 200) {
                setError(res.data.message)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
                }else{
                const notify = () => toast.error(`*${res.data.message}*`, { theme: 'colored' });
                notify()
                }
            })
            .catch(err => {
                console.log(err);
                const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
                notify()
            })

        } else {
            const notify = () => toast.error("* Invalid input *", { theme: 'colored' });
            notify()
        }
        } catch (err) {
        console.log("Error:", err);
        };
    };


  return (
    <>
        <div className="newPassword">
            <div className="col-md-5">
                <div className="lottie">
                    <lottie-player
                        src="https://assets8.lottiefiles.com/packages/lf20_pprxh53t.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    ></lottie-player>
                </div>
            </div>

            <div className="newPasswordContainer">
                <form onSubmit={handleSubmit}>
                    {error && <p className="alert alert-success">{error}</p>}
                    <p className="display-4 text-center">Set New Password</p>
                    <div className="mb-3">
                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="otp"
                        className="form-control"
                        id="exampleInputOtp"
                        aria-describedby="emailHelp"
                        placeholder="Enter your OTP"
                    />
                    </div>

                    <div className="mb-3">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword"
                        aria-describedby="emailHelp"
                        placeholder="Enter your New Password"
                    />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                    <ToastContainer autoClose={3000} theme="colored" />
                </form>
            </div>
        </div>
    </>
  );
};

export default NewPassword;
