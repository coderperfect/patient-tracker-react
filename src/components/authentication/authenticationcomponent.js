import React, {Component, Redirect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Alert } from 'reactstrap';
import LoginComponent from './LoginPage';
import UserRegistrationComponent from './UserRegistration';
import auth from "./auth";
import MenuComponent from "./menucomponent";
import HomeComponent from './HomePage';
import NewPassword from './NewPassword';
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
         <Route path="/new-password" component={NewPassword} />
         <PrivateRoute path="/patient" component={LoginComponent} />
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
