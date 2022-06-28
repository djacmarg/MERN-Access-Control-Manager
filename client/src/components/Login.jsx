import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlashMessage from 'react-flash-message'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('')
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const baseURL = "http://localhost:3500/api/v1/auth"

  useEffect(() => {
    setTimeout(() => {
      setError(false)
    }, 5000)
  }, []); 

     
 

  const handleSubmit = async (req, res) => {
    //e.preventDefault();
    if (!email || !password) {
      setError(true);
      return false;
    }
    try {
      setBusy(true)
    let result = await fetch(`${baseURL}/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if(!result.success){
      return setError(result.error)
    }
  
    if(result.success) {
      console.log(result)
      return setSuccess(result.message)
    }
  } catch (error) {
        return setError(error.response)
    }
    navigate('/login')
  };


 

  return (
    <div className="w-full darkBG min-h-screen clear-both p-1">
      <div className="max-w-[95%] mt-[15%] mx-auto bg-white p-6 py-10 rounded-[10px] lg:mt-[5%] lg:max-w-[600px]">
        <div className="gradient-text-1 text-center pb-4">
          <h1>Login...</h1>
        </div>

        <div className="grid">
          <input
            className="inputStyle-2"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="text-center m-auto text-red-500">Please enter Email Address!</span>
          )}
           <input
            className="inputStyle-2"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="text-center m-auto text-red-500">Please enter your Password!</span>
          )}
        </div>
        <div>

      {error &&<FlashMessage duration={5000} ><p className="text-center mb-2 pt-2 text-red-500">{error}</p></FlashMessage> }
      {success &&<FlashMessage duration={5000} ><p className="text-center mb-2 pt-2 text-green-500">{success}</p></FlashMessage> }  
      { }
          <button
            className="w-[95%] border-md m-auto mt-3 lg:m-auto"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="w-full grid lg:flex m-auto mt-6 text-center">
        <div className="lg:ml-[5%] lg:pl-5 text-center">
         No Account? <Link to="/register">Register</Link>
        </div>
        <div className="lg:ml-[5%] lg:pl-5 text-center">
          Forgot Password? <Link to="/forgot-password">Reset</Link>
        </div>
        </div>
        <div className="w-[50px] h-[50px] bg-[#FFB27D] opacity-30 pb-0 rounded-full absolute z-[1] mt-[-72%] ml-[70%] lg:w-[150px] lg:h-[150px] lg:mt-[-30%] lg:ml-[-30%]"></div>
        <div className="w-[100px] h-[100px] bg-[#FFB27D] opacity-30 pb-0 rounded-full absolute z-[1] mt-[0%] ml-[30%] lg:mt-[-12%] lg:ml-[33%]"></div>
        <div className="w-[70px] h-[70px] bg-[#FFB27D] opacity-30 pb-0 rounded-full absolute z-[1] mt-[-100%] ml-[-5%] lg:w-[150px] lg:h-[150px] lg:mt-[-35%] lg:ml-[40%]"></div>
      </div>
    </div>
  );
};
export default Login;
