import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className=" absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d253acf4-a1e2-4462-a416-f78802dc2d85/f04bf88c-f71c-4d02-82ed-adb870b8f8db/IN-en-20240429-POP_SIGNUP_TWO_WEEKS-perspective_WEB_658a042e-62cf-473d-8da0-7b875f23e2ef_small.jpg"
          alt=""
        />
      </div>
      <form className=" absolute w-3/12 my-36 right-0 left-0 mx-auto text-white  p-12 bg-black rounded-lg bg-opacity-85">
        <h1 className=" font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text "
            placeholder="Full Name"
            className=" p-4 my-4 w-full bg-[#101112] border "
          />
        )}
        <input
          type="text "
          placeholder=" Email Address"
          className=" p-4 my-4 w-full bg-[#101112] border "
        />
        <input
          type="password "
          placeholder=" Password"
          className=" p-4 my-4 w-full bg-[#101112] border"
        />
        <button className=" py-4 my-6 bg-[#E50914] w-full font-semibold rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className=" py-4 cursor-pointer" onClick={toggleSignInform}>
          {isSignInForm
            ? "New to Netflix? SignUp Now"
            : "Already Registered SignIn Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
