import React from 'react';
import { Link } from 'react-router-dom';
import "../Stylesheets/mystyle.css";
import "bootstrap/js/src/collapse.js";
import {GiHamburgerMenu} from "react-icons/gi";
import {RiBillFill, RiFileChartFill} from "react-icons/ri";
import {GrTestDesktop} from "react-icons/gr";
import {MdChromeReaderMode, MdUpdate, MdFitnessCenter} from "react-icons/md";
import {IoLogOutSharp,IoHelpCircle} from "react-icons/io5";
import {FaBed, FaHistory} from "react-icons/fa";
import {TiTick} from "react-icons/ti";
const MenuComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;

    const loggedInMenu = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/patient/testresults">Test Details <RiFileChartFill size="20px" /></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/patient/treatment-history">Treatment History <FaHistory size="20px"/></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/patient/diet">Diet/Exercise Recommendations <MdFitnessCenter  size="20px"/></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/patient/help">Help <IoHelpCircle size="20px"/></Link>
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

    if (isLoggedIn)
        menu = loggedInMenu;
    else
        menu = notLoggedInMenu;

    return (
        <nav className="navbar navbar-expand-md navbar-bg-white" style={{backgroundColor:"#138496"}}>
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