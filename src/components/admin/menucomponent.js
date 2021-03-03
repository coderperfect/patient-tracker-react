import React from 'react';
import { Link } from 'react-router-dom';
import "../Stylesheets/mystyle.css";
const MenuComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;

    const loggedInMenu = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/admin/registration-approvals-list">Registrations Approvals</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/patient-list">Patient Details</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/update-test-results">Update Test Results</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/in-patient-details">In Patient Details</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/billing">Billing</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={props.logout}>Logout</Link>
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
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {menu}
            </div>
        </nav>
    );
}

export default MenuComponent;