import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import './App.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/forgetpassword' element={<ForgetPassword />}/>
          <Route path='/newpassword' element={<NewPassword />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
