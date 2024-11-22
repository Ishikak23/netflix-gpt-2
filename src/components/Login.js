import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    // validate the form data
    const nameData = name?.current?.value;
    const emailData = email?.current?.value;
    const passwordData = password?.current?.value;
    const message = checkValidData(
      isSignInForm,
      emailData,
      passwordData,
      nameData
    );
    setErrorMessage(message);
    if (message) return;

    // Sign in / Sign up
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailData, passwordData)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameData,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailData, passwordData)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_large.jpg"
          alt="bg-image"
        />
      </div>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="w-3/12 absolute my-36 mx-auto left-0 right-0 p-12 bg-black text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            ref={name}
            className="my-2 p-4 w-full bg-gray-600"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          ref={email} //reference to input
          className="my-2 p-4 w-full bg-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="my-2 p-4 w-full bg-slate-600"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now!"
            : "Already registered? Sign In now!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
