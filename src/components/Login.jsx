import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidate } from "../utils/validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  //for navigating to next page after signup/signin
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //used to change the page type from sign in to sign up viceversa
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  //here useRef acts as a refrence to that object
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validate the form data

    // console.log(email.current.value);
    const message = checkValidate(email.current.value, password.current.value);
    console.log(message);
    setErrorMsg(message);

    // if no error then null is returned
    if (message) return;

    if (!isSignInForm) {
      //sign up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          //update the name of the user also
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              //here when updateprofile is done after the user is login/signup therefore we again update the redux store
              const { uid, email, displayName } = auth.currentUser;

              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );

              // if successful then navigate from here
              navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMsg(errorCode + "-" + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          //if successful then navigate from here
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }

    //sign in /sign up
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" absolute w-3/12 my-36 right-0 left-0 mx-auto text-white  p-12 bg-black rounded-lg bg-opacity-85"
      >
        <h1 className=" font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text "
            placeholder="Full Name"
            ref={name}
            className=" p-4 my-4 w-full bg-[#101112] border "
          />
        )}
        <input
          type="text "
          placeholder="Email Address"
          //here the useRef hook is refrenced to this object
          ref={email}
          className=" p-4 my-4 w-full bg-[#101112] border "
        />
        <input
          type=" password"
          placeholder="Password"
          ref={password}
          className=" p-4 my-4 w-full bg-[#101112] border"
        />
        <p className=" text-red-600 font-bold text-lg py-2"> {errorMsg}</p>
        <button
          onClick={handleButtonClick}
          className=" py-4 my-6 bg-[#E50914] w-full font-semibold rounded-lg"
        >
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
