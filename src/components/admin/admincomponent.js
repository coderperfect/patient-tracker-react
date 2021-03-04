import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './menucomponent';
import PendingTestResults from './PendingTestResults';
import InPatients from './InPatients';
import Billing from './Billing';
import EditPatient from './EditPatient';
import EditPatient2 from '../clerk/UserRegistration';
import RegistrationApprovalList from './RegistrationApprovalList';
import PatientList from './PatientList';
import UserRegistrationComponent from '../admin/UserRegistration';
import Welcome from '../welcome';
class Admin extends Component {
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
    localStorage.setItem("role","");
    localStorage.setItem("token","");
    localStorage.setItem("userId","");
  }


 render() {
    return (
      <div className="App">
        <MenuComponent isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
        
        <Switch>
        <Route path="/admin/registration-approvals-list" component={RegistrationApprovalList} />
          <Route path="/admin/patient-list" component={PatientList} />
          <Route path="/clerk/add-patient" component={EditPatient2} />
          <Route path="/admin/edit-patient" component={EditPatient} />
          <Route path="/admin/add-patient" component={UserRegistrationComponent} />
          <Route exact path="/admin" component={Welcome} />
          <Route 
            path="/admin/update-test-results" exact
            render={
              this.state.isLoggedIn
              ? (props) => <PendingTestResults {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          />
          <Route 
            path="/admin/in-patient-details" exact
            render={
              this.state.isLoggedIn
              ? (props) => <InPatients {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          />
          <Route 
            path="/admin/billing" exact
            render={
              this.state.isLoggedIn
              ? (props) => <Billing {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          />
        </Switch>
      </div>
    );
  }
}

export default Admin;
