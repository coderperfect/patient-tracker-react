import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './components/doctor/menucomponent';
import DisplayPatientsComponent from './components/doctor/DisplayPatientsComponent';
import TreatmentsForPatientComponent from './components/doctor/TreatmentsForPatientComponent';
import ViewDietDescription from './components/doctor/ViewDietDescription';
import TestReportsForPatientComponent from './components/doctor/TestReportsForPatientComponent';
import ViewTestDetails from './components/doctor/ViewTestDetails';
import ViewPatientRecord from './components/doctor/ViewPatientRecord';

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
        <MenuComponent isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
        
        <Switch>
          <Route path="/dietexercise" exact>
            <DisplayPatientsComponent from="dietexercise"/>
          </Route>
          <Route path="/dietexercise/:patientId" exact render={props => <TreatmentsForPatientComponent {...props}/>}/>
          <Route path="/viewdiet" render={props => <ViewDietDescription {...props}/>}/>
          <Route path="/viewtestresults" exact>
            <DisplayPatientsComponent from="viewtestresults"/>
          </Route>
          <Route path="/viewtestresults/:patientId" exact render={props => <TestReportsForPatientComponent {...props}/>}/>
          <Route path="/viewtest" render={props => <ViewTestDetails {...props}/>}/>
          <Route path="/patientrecords" exact>
            <DisplayPatientsComponent from="patientrecords"/>
          </Route>
          <Route path="/patientrecords/:patientId" exact render={props => <ViewPatientRecord {...props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
