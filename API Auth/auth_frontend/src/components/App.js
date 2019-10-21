import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Dashboard from './Dashboard';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  checkLoginStatus() {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        // console.log('logged in?', response);
        if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
          this.setState({
            logged_in: 'NOT_LOGGED_IN',
            user: {}
          })
        }
      }).catch(error => {
        console.log('login error', error);
      })
  }
  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    })
  }
  componentDidMount() {
    this.checkLoginStatus();
  }
  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user,
    })
  }
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route exact
              path={'/'}
              render={props => (
                <Home {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )} />
            <Route
              exact
              path={'/dashboard'}
              render={props => (
                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
              )} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
};