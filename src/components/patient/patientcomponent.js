import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './menucomponent';
import TestDetailsForPatient from './TestDetailsForPatient';
import TreatmentHistory from './TreatmentHistory';
import DietComponent from './DietComponent';
import DietDetails from './DietDetails';
import TestResults from "./TestResults";
import HelpComponent from "./Help";
class Patient extends Component {
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
      user: null,
      
    })
    localStorage.setItem("role","");
    localStorage.setItem("token","");
    localStorage.setItem("userId","");
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
          <Route path="/patient/testresults" exact render={props => <TestResults {...props} />} />
          <Route path="/patient/test-details-for-patient" render={props => <TestDetailsForPatient {...props} />} />
          <Route path="/patient/treatment-history" component={TreatmentHistory} />
          <Route path="/patient/diet" component={DietComponent} />
          <Route path="/patient/help" component={HelpComponent} />
          <Route path="/patient/view-diet-details" component={DietDetails} />
        </Switch>
      </div>
    );
  }
}

export default Patient;
