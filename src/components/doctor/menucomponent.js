import React from 'react';
import { Link } from 'react-router-dom';

const MenuComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;

    const loggedInMenu = (
        <ul className="navbar-nav ml-auto mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/viewtestresults">View Test Results</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/patientrecords">Patient Records</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dietexercise">Diet/Exercises</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={props.logout}>Logout</Link>
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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