import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert from 'sweetalert-react';

const NavigationBar = () => {
  const auth = localStorage.getItem("user")
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const navigate = useNavigate();
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

const Logout = () => {
  localStorage.clear()
  if(SweetAlert(
    <div>
      <h3>Logout!</h3>
      <p>Logout was successful!</p>
    </div>
  ))
  navigate("/register")
}
  const getStartedFormRender = () => {
    navigate("/register");
  };
  const loginFormRender = () => {
    navigate("/login");
  };
  return (
    <div className="flex w-full top-0 sticky bg-white">
      <div className="flex w-full max-w-[90%] mx-auto justify-between items-center h-20 px-4 z-20 text-black">
        <div>
          <h1 onClick={handleNav} className={!Logo ? "hidden" : "block"}></h1>
          <Link to="/"><b className="text-4xl text-blue-500 font-bold">TECH<span className="text-orange-500">DESIGN</span></b></Link>
        </div>
        <ul className="hidden md:flex">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="hidden md:flex">
          {auth ?
        <Link onClick={Logout} to="/login" className="my-0">
        Logout (<BsPerson className="text-black inline" size={20} /> {JSON.parse(auth).email})
        </Link>
        :
<div>
  <Link className="px-4" to="/login">Login</Link>
<button onClick={getStartedFormRender} className="my-0">
Get Started
</button>

</div>
          }
        
        </div>

        {/* Hamburger */}
        <div onClick={handleNav} className="md:hidden z-10">
          {nav ? (
            <AiOutlineClose className="text-black" size={35} />
          ) : (
            <AiOutlineMenu size={30} />
          )}
        </div>

        {/* Mobile menu dropdown */}
        <div
          onClick={handleNav}
          className={
            nav
              ? "fixed left-0 top-0 w-[90%] md:w-[70%] h-full bg-white px-4 mt-20 flex flex-col transition-all ease-in-out duration-500 z-20 "
              : "absolute left-[-100%]"
          }
        >
          <ul className="pt-0">
            <li className="border-b text-2xl"><Link to="/">Home</Link></li>
            <li className="border-b  text-2xl"><Link to="/services">Services</Link></li>
            <li className="border-b  text-2xl"><Link to="/about">About</Link></li>
            <li className="border-b  text-2xl"><Link to="/contact">Contact</Link></li>
            <div className="flex flex-col">
              {
                auth ? 
                <Link onClick={Logout} to="/login" className="my-1">
                Logout (<BsPerson  className="text-black inline" size={20} /> {JSON.parse(auth).fullname})
                </Link> 
                :
                <div className="pt-3">
                  <button onClick={getStartedFormRender} className="my-0">
                  Get Started
                  </button>
                  
                    <button onClick={loginFormRender} className="my-0">
                    Login
                  </button>
            </div>
              }

            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
