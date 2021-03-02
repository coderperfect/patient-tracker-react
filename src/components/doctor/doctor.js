import logo from './logo.svg';
import './App.css';
import auth from "../src/components/authentication/auth";
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuComponent} from './components/doctor/menucomponent';
import TreatmentForm, {TreatmentList} from "./components/doctor/treatmentcomponent";
import PrescriptionComponent, { PrescriptionForm, PrescriptionView } from './components/doctor/prescriptioncomponent';
import { TestReportForm, TestReportUpdateForm } from './components/doctor/testreportcomponent';
class Doctor extends Component {
  constructor(props) {
    localStorage.setItem("meds",JSON.stringify([]))
    localStorage.setItem("med",JSON.stringify({}))
    super(props);
    this.state = {
      isLoggedIn: true,
      user: null,
      doctorId:2,
      recordId:1
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
          <Route exact path="/treatments">
          <TreatmentList recordId={this.state.recordId} doctorId={this.state.doctorId} />
          </Route>
          <Route exact path="/prescriptions">
          <PrescriptionComponent update={false}/>
          </Route>
          <Route exact path="/viewprescriptions">
          <PrescriptionView/>
          </Route>
          <Route exact path="/testreports">
          <TestReportForm/>
          </Route>
          <Route exact path="/updatetestreports">
          <div>
           <TreatmentForm treatment={false} recordId={auth.getRecordId()} doctorId={auth.getDoctorId()} method={"Add"}/>
          </div>
          </Route>
        </Switch> 
      </div> 
    );
  }
}

export default App;
