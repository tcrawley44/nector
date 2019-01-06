import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import SearchPerson from './components/search-people/SearchPeople';


import Home from "./components/home/Home";

import './App.css';

//check for token
if(localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        {/* <Router>
          <div className="App bg-dark">
            <Navbar />
            <Route exact path = '/' component = {Landing}/>
            <div className = 'container-fluid bg-dark'>
              <Route exact path = '/register' component = {Register} />
              <Route exact path = '/login' component = {Login} />
              <Route exact path = '/profiles' component = {Profiles} />
              <Route exact path = '/profile/:handle' component = {Profile} />
              <Route exact path = '/add-person' component = {AddPerson} />
              <Switch>
                <PrivateRoute exact path = '/dashboard' component = {Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path = '/create-profile' component = {CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path = '/edit-profile' component = {EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path = '/add-experience' component = {AddExperience} />
              </Switch>

            </div>
            <Footer />
          </div>
        </Router> */}
        <div className = "full bg-dark">
          <Router>
            <div>
              <Home />
              <Route exact path = '/search-person' component = {SearchPerson} />
            </div>
            
          </Router>
        </div>
        
        
      </Provider>
    );
  }
}

export default App;
