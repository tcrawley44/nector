import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import Profiles from "./components/profiles/Profiles";
import SearchPeople from './components/search-people/SearchPeople';
import Login from './components/home/Login';
import Welcome from "./components/home/Welcome";
import Home from "./components/home/Home";
import AddPerson from "./components/add-person/AddPerson";
import EditPerson from "./components/edit-person/EditPerson";
import Chat from "./components/chat/Chat";
import Home2 from "./components/home/Home2";
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
        
        <div className = "bg-dark container3 flex-column" >
          <meta name = "mobile-web-app-capable" content = "yes"></meta>
            <div className = "container-fluid appContainer bg-dark m-auto">
              <Router>
                <div className = "container2">
                  <div >
                    <Link to = {"/home/" } className = "btn btn-info mt-2">Home</Link>
                    <Link to = {"/chat/"  } className = "btn btn-info mt-2 ml-2">Chat</Link>
                    <Link to = {"/profile/" + localStorage.user } className = "btn btn-info mt-2 ml-2">Profile</Link>
                  </div>
                  <div className = "row half2">
                      
                      
                        
                        
                        <div className = "profileContainer2 bg-dark pb-2 p-3 container-fluid">
                          <div>
                            <Route exact path = '/' component = {Login} />
                            <Route exact path = '/profile/:id' component = {Profiles} />
                            <Route exact path = '/search-person' component = {SearchPeople} />
                            <Route exact path = '/welcome' component = {Welcome} />
                            <Route exact path = '/add-person' component = {AddPerson} />
                            <Route exact path = '/edit-person/:id' component = {EditPerson} />
                            <Route exact path = '/chat/' component = {Chat} />
                            <Route exact path = '/home/' component = {Home2} />
                          </div>
                        </div>    

                            

                        
                      

                      
                  </div>
                </div>


                
              </Router>
            </div>
          </div>  
          
        
        
          
      </Provider>
    );
  }
}

export default App;
