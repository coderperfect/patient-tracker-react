import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './components/doctor/menucomponent';
import DisplayPatientsComponent from './components/doctor/DisplayPatientsComponent';
import TreatmentsForPatientComponent from './components/doctor/TreatmentsForPatientComponent';

class App extends Component {
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
          <Route path="/dietexercise" exact>
            <DisplayPatientsComponent/>
          </Route>
          <Route path="/dietexercise/:patientId" exact>
            <TreatmentsForPatientComponent/>
          </Route>
          {/* <Route path="/dietexercise/:patientId/:treatmentId" exact>
            <TreatmentsForPatientComponent/>
          </Route> */}
        </Switch>
      </div>
    );
  }
}

export default App;
