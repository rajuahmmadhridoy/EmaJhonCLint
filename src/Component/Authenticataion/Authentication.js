import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import "./Authentication.scss";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Authentication = () => {

  const [logedIn, setLogedIn] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    islogedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    error: "",
    success: false,
    img: "",
  });
  
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" }}

  const googleprovider = new firebase.auth.GoogleAuthProvider();
  var fbProdvider = new firebase.auth.FacebookAuthProvider();
  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleprovider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const newUser = {
          name: displayName,
          email: email,
          img: photoURL,
          islogedIn: true,
        };
        setUser(newUser);
        setLogedIn(newUser);
        history.replace(from);
      })
      .catch((err) => {
        let newUser = {...user};
        newUser.error = err.message;
        setUser(newUser);
        setLogedIn(newUser);
      });
  };
  const googleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signOutUser = {
          name: "",
          email: "",
          img: "",
          islogedIn: false,
        };
        setUser(signOutUser);
        setLogedIn(signOutUser)
        history.replace(from);
      })
      .catch((err) => {
        // An error happened.
      });
  };
  //#######################
  //Facebook signin
  const facebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProdvider)
      .then((res) => {
        let newUser = {
          name:res.name,
          email:res.email
        }
        setUser(newUser)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        var email = error.email;
        console.log(email)
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };
  const facebookSignOut = () => {};
  // ######################
  // Passwoed Authentication
  const handleBlur = (e) => {
    e.target.style.color = 'red';
    // debugger;
    let isFildValid = true;
    if (e.target.name === "email") {
      isFildValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const pssLength = e.target.value.length > 6;
      const passTest =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          e.target.value
        );

      isFildValid = pssLength && passTest;
      if( isFildValid == true){
        const newUserInfo = { ...user };
        newUserInfo.success = true;
        setUser(newUserInfo)
        setLogedIn(newUserInfo)
      }else{
        const newUserInfo = { ...user };
        newUserInfo.success = false;
        newUserInfo.error = 'Give a valid Password'
        setUser(newUserInfo)
        setLogedIn(newUserInfo)
      }
    }
    if(e.target.name === 'confirmPassword'){
            let newUser = {...user};
            newUser[e.target.name] = e.target.value;
            setUser(newUser)
            setLogedIn(newUser)

    }
    if (isFildValid) {
      console.log("is form valid");
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      setLogedIn(newUserInfo)
    }
  };

  // const handleConfirmpss = (e)=>{
  //   const newUserInfo = { ...user };
  //   newUserInfo.confirmPassword = e.target.value;
  //   setUser(newUserInfo);
  // }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password && user.confirmPassword) {
      if(user.password === user.confirmPassword){
        
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            console.log(res.user, "created respons here");
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLogedIn(newUserInfo)
            updateUser(user.name);
            history.replace(from);
          })
          .catch((err) => {
            const newUserInfo = { ...user };
            newUserInfo.success = false;
            newUserInfo.error = err.message;
            setUser(newUserInfo);
            setLogedIn(newUserInfo);
          });
      }else{
        const newUserInfo = { ...user};
        newUserInfo.error = 'Password not match';
        setUser(newUserInfo);
        setLogedIn(newUserInfo)
      }
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          setLogedIn(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          setLogedIn(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const updateUser = (name) => {
    console.log(name, "from 24 num line");
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("user name updated");
      })
      .catch((error) => {
        console.log("user name error");
      });
  };

  const authToggle = () =>{
    setTimeout(()=>{
      setNewUser(!newUser)
    },1000)
  }
  return (
    <div className="formDiv text-center">
      <div className="formInner">
        <h3 className="register">Register</h3>
        <div className="form">
          <form className="customForm " onSubmit={handleSubmit}>
            {newUser && (
              <div className="tran">
                <p className="d-flex inputName ">Name</p>
                <input
                  name="name"
                  type="name"
                  // placeholder="your name"
                  onBlur={handleBlur}
                />
              </div>
            )}
            <div>
              <p className="d-flex inputName">Email</p>
              <input
                onBlur={handleBlur}
                type="email"
                name="email"
                // placeholder="your email"
              />
            </div>
            <div>
              <p className="d-flex inputName">Password</p>
              <input
                onBlur={handleBlur}
                type="password"
                name="password"
                // placeholder="your password"
              />
            </div>
            {
              newUser && <div className="tran">
              <p className="d-flex inputName">Confirm Password</p>
              <input
                onBlur={handleBlur}
                type="password"
                name="confirmPassword"
                // placeholder="your password"
              />
            </div>
            }
            <input
              className="customBtn"
              type="submit"
              value={newUser ? "Sign Up" : "Sign In"}
            />
          </form>
        </div>
        <p className="createAccounts">
          {!newUser ? "Don,t Have an Account?" : "Already Have an Account?"}
          <span className="loginLogOut" onClick={authToggle}>
            {!newUser ? "Create new account" : "Log In"}
          </span>
        </p>
        {user.success && (
          <p className="success">Successfully Created Account</p>
        )}
        <p className="error">{user.error}</p>
        <h4>or</h4>
        {user.islogedIn ? (
          <button className="signInSignOutBtn" onClick={googleSignOut}>
            {" "}
            Sign out With Google
          </button>
        ) : (
          <button className="signInSignOutBtn" onClick={googleSignIn}>
            {" "}
            Sign In With Google
          </button>
        )}
        {user.islogedIn ? (
          <button className="signInSignOutBtn" onClick={facebookSignOut}>
            {" "}
            Sign out With Facebook
          </button>
        ) : (
          <button className="fbsignin signInSignOutBtn" onClick={facebookSignIn}>
            {" "}
            Sign In With Facebook
          </button>
        )}
      </div>
    </div>
  );
};

export default Authentication;
