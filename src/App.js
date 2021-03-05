import './App.css';
import auth from "../src/components/authentication/auth";
import React, {Component, Redirect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Alert } from 'reactstrap';
import Doctor from "./components/doctor/doctorcomponent";
import Admin from "./components/admin/admincomponent";
import Patient from './components/patient/patientcomponent';
import Auth from "../src/components/authentication/authenticationcomponent";
import HomeComponent from "../src/components/authentication/HomePage";
import Clerk from './components/clerk/clerkcomponent';
import MenuComponent from './components/authentication/menucomponent';
import UserRegistrationComponent from "./components/authentication/UserRegistration";
import LoginComponent from "./components/authentication/LoginPage";
import Welcome from "./components/welcome";
import ForgotUserId from '../src/components/authentication/ForgotUserId';
import ForgotPassword from '../src/components/authentication/ForgotPassword';
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
         <PrivateRoute path="/clerk" component={Clerk} />
         <Route path="/login" component ={LoginComponent} />
         <Route path="/help" component ={LoginComponent} />
         <Route path="/register" component={HomeComponent} />
         <Route path="/registration" component={UserRegistrationComponent} />
         <Route exact path="/" component={HomeComponent} />
         <Route path="/forgotuserid" component ={ForgotUserId} />
         <Route path="/forgotpassword" component ={ForgotPassword} />
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
