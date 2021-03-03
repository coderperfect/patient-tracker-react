import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './menucomponent';
import Billing from './Billing';
import EditPatient from './EditPatient';
import PatientList from './PatientList';
class Clerk extends Component {
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
        {/* <Route path="/clerk/registration-approvals-list" component={RegistrationApprovalList} /> */}
          <Route path="/clerk/patient-list" component={PatientList} />
          <Route path="/clerk/edit-patient" component={EditPatient} />
          {/* <Route path="/clerk/add-patient" component={UserRegistrationComponent} /> */}
          {/* <Route 
            path="/clerk/update-test-results" exact
            render={
              this.state.isLoggedIn
              ? (props) => <PendingTestResults {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          /> */}
          {/* <Route 
            path="/clerk/in-patient-details" exact
            render={
              this.state.isLoggedIn
              ? (props) => <InPatients {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          /> */}
          <Route 
            path="/clerk/billing" exact
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

export default Clerk;
