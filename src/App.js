import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuComponent from './components/admin/menucomponent';

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
        
        {/* <Switch>
          <Route 
            path="/" exact
            render={
              this.state.isLoggedIn
              ? (props) => <CompaniesListComponent {...props} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
              : (props) => <LoginComponent {...props} login={this.login}/>
            }
          />
        </Switch> */}
      </div>
    );
  }
}

export default App;
