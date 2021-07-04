import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { Nav, Navbar } from 'react-bootstrap';
const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <Navbar className="justify-content-around mt-2" bg="light" expand="lg">
                <div>
                <Navbar.Brand href="#home"><img className="navlogo" src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
                <div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#link">Home</Nav.Link>
                        <Nav.Link href="#shop">Shop</Nav.Link>
                        <Nav.Link href="#product">product</Nav.Link>
                        <Nav.Link href="#login">LogIn</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
};

export default Header;