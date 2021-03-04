import React from 'react';
import { Link } from 'react-router-dom';
import "../Stylesheets/mystyle.css";
import {GiHamburgerMenu} from "react-icons/gi";
import {RiBillFill} from "react-icons/ri";
import {GrTestDesktop} from "react-icons/gr";
import {MdChromeReaderMode, MdUpdate} from "react-icons/md";
import {IoLogOutSharp} from "react-icons/io5";
import {FaBed} from "react-icons/fa";
import {TiTick} from "react-icons/ti";
const MenuComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;

    const loggedInMenu = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/admin/registration-approvals-list">
                    Registrations Approvals <TiTick size="20px" /></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/patient-list">Patient Details <MdChromeReaderMode size="20px"/></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/update-test-results">Update Test Results <MdUpdate size="20px" /></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/in-patient-details">In Patient Details <FaBed size="20px"/></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/billing">Billing<RiBillFill size="20px"/></Link>
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
        <nav className="navbar navbar-expand-md navbar-bg-white" style={{backgroundColor:"#138496"}}>
            <Link className="navbar-brand" to="/">Patient Tracker</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <GiHamburgerMenu color="white" className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {menu}
            </div>
        </nav>
    );
}

export default MenuComponent;