import auth from "../authentication/auth";
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuComponent} from './menucomponent';
import DisplayPatientsComponent from './DisplayPatientsComponent';
import TreatmentsForPatientComponent from './TreatmentsForPatientComponent';
import ViewDietDescription from './ViewDietDescription';
import TestReportsForPatientComponent from './TestReportsForPatientComponent';
import ViewTestDetails from './ViewTestDetails';
import ViewPatientRecord from './ViewPatientRecord';
import TreatmentForm , { TreatmentList, } from "./treatmentcomponent";
import PrescriptionComponent, { PrescriptionForm, PrescriptionView } from './prescriptioncomponent';
import { TestReportForm, TestReportUpdateForm } from './testreportcomponent';
import HelpComponent from "./Help";
import Welcome from "../welcome";
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
    localStorage.setItem("role","");
    localStorage.setItem("token","");
    localStorage.setItem("userId","");
  }
 
 render() {
    return (
      <div className="App">
        <MenuComponent isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
        <Switch>
        <Route exact path="/doctor"> <Welcome /> </Route>
        <Route path="/doctor/help"> <HelpComponent /> </Route>
          <Route path="/doctor/patientrecord/treatments"> <TreatmentList /> </Route>
          <Route path="/doctor/patientrecord/prescriptions"><PrescriptionView/></Route>
          <Route path="/doctor/patientrecord/addtestreport"><TestReportForm/></Route>
          <Route path="/doctor/patientrecord/addprescription"><PrescriptionComponent update={false}/></Route>
          <Route path="/doctor/patientrecord/addtreatment"> 
          <TreatmentForm treatment={false} recordId={auth.getRecordId()} doctorId={auth.getDoctorId()} method={"Add"} /> </Route>
          <Route path="/doctor/patientrecord/dietexercise" exact>
            <DisplayPatientsComponent from="/doctor/patientrecord/dietexercise"/>
          </Route>
          <Route path="/doctor/patientrecord/dietexercise/:patientId" exact render={props => <TreatmentsForPatientComponent {...props}/>}/>
          <Route path="/doctor/patientrecord/viewdiet" render={props => <ViewDietDescription {...props}/>}/>
          <Route path="/doctor/patientrecord/viewtestresults" exact>
            <DisplayPatientsComponent from="/doctor/patientrecord/viewtestresults"/>
          </Route>
          <Route path="/doctor/patientrecord/viewtestresults/:patientId" exact render={props => <TestReportsForPatientComponent {...props}/>}/>
          <Route path="/doctor/patientrecord/viewtest" render={props => <ViewTestDetails {...props}/>}/>
          <Route path="/doctor/patientrecord/patientrecords" exact>
            <DisplayPatientsComponent from="/doctor/patientrecord/patientrecords"/>
          </Route>
          <Route path="/doctor/patientrecord/patientrecords/:patientId" exact render={props => <ViewPatientRecord {...props}/>}/>
        </Switch> 
      </div> 
    );
  }
}

export default Doctor;
