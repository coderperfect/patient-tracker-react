import logo from './logo.svg';
import './App.css';
import auth from "../src/components/authentication/auth";
import React, {Component, Redirect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuComponent} from './components/doctor/menucomponent';
import TreatmentForm, {TreatmentList} from "./components/doctor/treatmentcomponent";
import PrescriptionComponent, { PrescriptionForm, PrescriptionView } from './components/doctor/prescriptioncomponent';
import { TestReportForm, TestReportUpdateForm } from './components/doctor/testreportcomponent';
import {Alert } from 'reactstrap';
import Doctor from "./components/doctor/doctorcomponent";
import Admin from "./components/admin/admincomponent";
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
         <PrivateRoute component="/admin" component={Admin} />
         <PrivateRoute component="/patient" component={Admin} />
        </Switch> 
        
      </div> 
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
