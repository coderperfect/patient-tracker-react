import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './menucomponent';
import PendingTestResults from './PendingTestResults';
import InPatients from './InPatients';
import Billing from './Billing';
import EditPatient from './EditPatient';
import RegistrationApprovalList from './RegistrationApprovalList';
import PatientList from './PatientList';
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
  }


 render() {
    return (
      <div className="App">
        <MenuComponent isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
        
        <Switch>
        <Route path="/registration-approvals-list" component={RegistrationApprovalList} />
          <Route path="/patient-list" component={PatientList} />
          
          <Route path="/edit-patient" component={EditPatient} />
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
    );
  }
}

export default Admin;
