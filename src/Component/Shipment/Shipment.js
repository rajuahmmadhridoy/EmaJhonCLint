import React, { useContext, useRef } from "react";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Authenticataion/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Shipment = () => {
  let [logedIn, setLogedIn] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  console.log(watch("example"));
  const onSubmit = (data) => {
    const { email, password } = data;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="email"
          placeholder="Enter Your Email"
          ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Please Enter Your Email</span>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({
            required: true,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            minLength: {
              value: 8,
              message:
                "password must contain at least 1 number, 1 uppercase, 1 lowercase letter and at least 8 or more characters ",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label>Repeat password</label>
        <input
          name="password_repeat"
          type="password"
          ref={register({
            required: true,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

        <input type="submit" onClick={handleSubmit(onSubmit)} />
      </form>
    </>
  );
};

export default Shipment;
