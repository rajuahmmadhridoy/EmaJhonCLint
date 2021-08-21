import React from "react";
import logo from "../../images/logo.png";
import "./Header.scss";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../App';
const Header = () => {
  let [logedIn, setLogedIn] = useContext(UserContext);
  // let history = useHistory()
  const logOut = ()=>{
    setLogedIn({});
    // history.go('/')
    window.location.replace("/");
  }
  return (
    <div className="header">
      <img className="logo" src={logo} alt="" />
      <Navbar className="justify-content-around mt-2" bg="light" expand="lg">
        <div>
          <Navbar.Brand href="#home">
            <img className="navlogo" src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/review">Order Review</Link></li>
              <li><Link to="/manageinventory">Manage Inventory</Link></li>
              <li><Link to="/login">{logedIn.email ? <span onClick={logOut}>Log Out</span> : <span>Log In</span>}</Link></li>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
