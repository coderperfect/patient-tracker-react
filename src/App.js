import './App.css';
import auth from "../src/components/authentication/auth";
import React, {Component, Redirect} from 'react';
import {Route, Switch} from 'react-router-dom';
<<<<<<< HEAD
import MenuComponent from './components/admin/menucomponent';
import PendingTestResults from './components/admin/PendingTestResults';
import InPatients from './components/admin/InPatients';
import Billing from './components/admin/Billing';

=======
import {MenuComponent} from './components/doctor/menucomponent';
import TreatmentForm, {TreatmentList} from "./components/doctor/treatmentcomponent";
import PrescriptionComponent, { PrescriptionForm, PrescriptionView } from './components/doctor/prescriptioncomponent';
import { TestReportForm, TestReportUpdateForm } from './components/doctor/testreportcomponent';
import {Alert } from 'reactstrap';
import Doctor from "./components/doctor/doctorcomponent";
import Admin from "./components/admin/admincomponent";
import Patient from './components/patient/patientcomponent';
>>>>>>> main
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      user: null,
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
        <Switch>
         <PrivateRoute path="/doctor" component ={Doctor} />
         <PrivateRoute path="/admin" component={Admin} />
         <PrivateRoute path="/patient" component={Patient} />
        </Switch> 
        
<<<<<<< HEAD
        <Switch>
          <Route 
            path="/update-test-results" exact
            render={
              this.state.isLoggedIn
              ? (props) => <PendingTestResults {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          />
          <Route 
            path="/in-patient-details" exact
            render={
              this.state.isLoggedIn
              ? (props) => <InPatients {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          />
          <Route 
            path="/billing" exact
            render={
              this.state.isLoggedIn
              ? (props) => <Billing {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          />
        </Switch>
      </div>
=======
      </div> 
>>>>>>> main
    );
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props =>
  
  auth.getAuthToken().length > 1 ? 
  (
  <Component {...props} />
  ) :
  (
    <Alert color="danger">Invalid Access</Alert>
  )
  }
  />
  );

export default App;
