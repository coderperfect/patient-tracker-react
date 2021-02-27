import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './components/admin/menucomponent';
import PendingTestResults from './components/admin/PendingTestResults';

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
          <Route 
            path="/update-test-results" exact
            render={
              this.state.isLoggedIn
              ? (props) => <PendingTestResults {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : null
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
