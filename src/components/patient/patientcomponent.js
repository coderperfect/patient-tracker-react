import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './menucomponent';
import TestDetailsForPatient from './TestDetailsForPatient';
import TreatmentHistory from './TreatmentHistory';
import DietComponent from './DietComponent';
import DietDetails from './DietDetails'
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
          <Route path="/test-details-for-patient" render={props => <TestDetailsForPatient {...props} />} />
          <Route path="/treatment-history" component={TreatmentHistory} />
          <Route path="/diet" component={DietComponent} />
          <Route path="/view-diet-details" component={DietDetails} />
        </Switch>
      </div>
    );
  }
}

export default Patient;
