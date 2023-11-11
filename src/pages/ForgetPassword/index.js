import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./ForgetPassword.css";
import 'react-toastify/dist/ReactToastify.css';
import { REACT_APP_BASE_URL } from "../../URLData";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
        e.preventDefault()
        try {
        if (email) {
            axios.post(`${REACT_APP_BASE_URL}/api/sendotp`, {
                email: email
            })
            .then(res => {
                console.log(`OTP : ${res.data.otp}`)
                if (res.data.code === 200) {
                setError(`${res.data.message}    ${res.data.otp}`)
                setTimeout(() => {
                    navigate('/newPassword')
                }, 4000)
                } else {
                const notify = () =>
                    toast.error(`*${res.data.message}*`, { theme: 'colored' })
                notify()
                }
            })
            .catch(err => {
                console.log(err)
                const notify = () =>
                toast.error(`*${err.response.data.message}*`, {
                    theme: 'colored'
                })
                notify()
                setError(`*${err.response.data.message}*`)
            })
        } else {
            const notify = () =>
            toast.error('* Invalid input *', { theme: 'colored' })
            notify()
        }
        } catch (err) {
        setError(' Input Error')
        console.log('Error:', err)
        };
    };




  return (
    <>
        <div className="forgetPassword">
            <div className="forgetPasswordContainer">
                <form onSubmit={handleSubmit}>
                    {error && <p className="alert alert-success">{error}</p>}
                    <p className="display-4 text-center">Forget Password</p>
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
                    <button className="btn btn-primary set">Send OTP</button>
                    <ToastContainer autoClose={3000} theme="colored" />
                </form>
            </div>

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
        </div>
    </>
  );
};

export default ForgetPassword;
