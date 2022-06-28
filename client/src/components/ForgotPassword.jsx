import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlashMessage from 'react-flash-message'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState('')
  const navigate = useNavigate();

  const baseURL = "http://localhost:3500/api/v1/auth"

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (req, res) => {
    if (!email) {
      setError(true);
      return false;
    }
   
    try {
      let result = await fetch(`${baseURL}/forgot-password`, {
        method: "post",
        body: JSON.stringify({
          email
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if(!result.success){
        return setError(result.error)
      }
    
      if(result.success) {
        return setSuccess(result.message)
      }
    } catch (error) {
      if(error) return setError(error.response)
    }
    navigate('/forgot-password')
  };
  return (
    <div className="w-full darkBG min-h-screen clear-both p-1">
      <div className="max-w-[95%] mt-[15%] mx-auto bg-white p-6 py-10 rounded-[10px] lg:mt-[5%] lg:max-w-[600px]">
        <div className="gradient-text-1 text-center pb-4">
          <h1>Forgot Password?!</h1>
        </div>

        <div className="grid">
         
          <input
            className="inputStyle-2"
            type="email"
            name="email"
            placeholder="Enter the email associated with your account"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="p-2 mx-auto text-red-700">Please enter Email to reset password</span>
          )}
         
      {error &&<FlashMessage duration={5000} ><p className="text-center mb-2 pt-2 text-red-500">{error}</p></FlashMessage> }
      
      {success &&<FlashMessage duration={5000} ><p className="text-center mb-2 pt-2 text-green-500">{success}</p></FlashMessage> } 
        </div>

        <div>
          <button
            className="w-[95%] border-md m-auto mt-3 lg:m-auto"
            onClick={handleSubmit}
          >
            Request Link
          </button>{" "}
        </div>
        <div className="pt-5 text-center">
        Remember Password? <Link to="/login">Login</Link>
        </div>

        <div className="w-[50px] h-[50px] bg-[#FFB27D] opacity-30 pb-0 rounded-full absolute z-[1] mt-[-72%] ml-[70%] lg:w-[150px] lg:h-[150px] lg:mt-[-30%] lg:ml-[-30%]"></div>
        <div className="w-[100px] h-[100px] bg-[#FFB27D] opacity-30 pb-0 rounded-full absolute z-[1] mt-[0%] ml-[30%] lg:mt-[-12%] lg:ml-[33%]"></div>
        <div className="w-[70px] h-[70px] bg-[#FFB27D] opacity-30 pb-0 rounded-full absolute z-[1] mt-[-100%] ml-[-5%] lg:w-[150px] lg:h-[150px] lg:mt-[-35%] lg:ml-[40%]"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
