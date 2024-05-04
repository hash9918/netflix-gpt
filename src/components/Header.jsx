import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful then navigate to the login page and the user will be removed from the redux store from body useEffect
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className=" absolute w-full px-8 py-2 z-10 bg-gradient-to-b from-black flex justify-between">
      <img
        className=" w-44"
        src="src\assets\Netflix_Logo_RGB.png"
        alt="netflix logo"
      />
      {user && (
        <div className="flex p-2 space-x-2 ">
          <img
            className=" w-12 h-12"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt="user logo"
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign Out{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
