import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import MenuComponent from './components/admin/menucomponent';

import RegistrationApprovalList from './components/admin/RegistrationApprovalList';
import axios from "axios";
import PatientList from './components/admin/PatientList';
import TestResults from './components/patient/TestResults';
import TestDetailsForPatient from './components/patient/TestDetailsForPatient';
import TreatmentHistory from './components/patient/TreatmentHistory';
import DietComponent from './components/patient/DietComponent';
import DietDetails from './components/patient/DietDetails';
import EditPatient from './components/admin/EditPatient';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      user: null
    }
  }

  logout = () => {
    this.setState({
      isLoggedIn: false,
      user: null
    })
  }

  login = (user) => {
    this.setState({
      isLoggedIn: true,
      user: user
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MenuComponent isLoggedIn={this.state.isLoggedIn} logout={this.logout} />

          <Route path="/registration-approvals-list" component={RegistrationApprovalList} />
          <Route path="/patient-list" component={PatientList} />
          <Route path="/test-results" exact render={props => <TestResults {...props} />} />
          <Route path="/test-details-for-patient" render={props => <TestDetailsForPatient {...props} />} />
          <Route path="/treatment-history" component={TreatmentHistory} />
          <Route path="/diet" component={DietComponent} />
          <Route path="/view-diet-details" component={DietDetails} />
          <Route path="/edit-patient" component={EditPatient} />
        </Router>
      </div>
    );
  }
}

export default App;
