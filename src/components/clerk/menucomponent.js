import React from 'react';
import { Link } from 'react-router-dom';
import "../Stylesheets/mystyle.css";
import {RiBillFill} from "react-icons/ri";
import {MdChromeReaderMode} from "react-icons/md";
import {IoLogOutSharp} from "react-icons/io5";
import {GiHamburgerMenu} from "react-icons/gi";
import $ from 'jquery';
import Popper from 'popper.js';
import "bootstrap/js/src/collapse.js";
const MenuComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;

    const loggedInMenu = (
        <ul className="navbar-nav">
            
            <li className="nav-item">
                <Link className="nav-link" to="/clerk/patient-list">Patient Details <MdChromeReaderMode size="20px"/></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/clerk/billing">Billing <RiBillFill size="20px"/> </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={props.logout}>Logout <IoLogOutSharp size="20px"/></Link>
            </li>
        </ul>
    );

    const notLoggedInMenu = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    );

    let menu = null;

    if(isLoggedIn)
        menu = loggedInMenu;
    else
        menu = notLoggedInMenu;

    return (
        <nav className="navbar navbar-expand-md" style={{backgroundColor:"#138496"}}>
            <Link className="navbar-brand" to="/">Patient Tracker</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span> */}
                <GiHamburgerMenu color="white" className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {menu}
            </div>
            <span class="navbar-text" style={{color:"white"}}> {localStorage.getItem("role").substring(5,)} : {localStorage.getItem("userId")}</span>
        </nav>
    );
}

export default MenuComponent;