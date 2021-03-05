import React, {Component, Redirect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Alert } from 'reactstrap';
import LoginComponent from './LoginPage';
import UserRegistrationComponent from './UserRegistration';
import auth from "./auth";
import MenuComponent from "./menucomponent";
import HomeComponent from './HomePage';
import Welcome from '../welcome';
import NewPassword from "./NewPassword";
import ForgotPassword from './ForgotPassword';
import ForgotUserId from './ForgotUserId';
class Auth extends Component {
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
        <MenuComponent isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
        
        <Switch>
         <Route path="/login" component ={LoginComponent} />
         <Route path="/help" component ={LoginComponent} />
         <Route path="/register" component={HomeComponent} />
         <Route path="/registration" component={UserRegistrationComponent} />
         <PrivateRoute path="/patient" component={LoginComponent} />
         <Route path="/forgotpasword" component={ForgotPassword} />
         <Route path="/forgotuserid" component={ForgotUserId} />
         <Route path="/newpassword" component={NewPassword} />
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

export default Auth;
