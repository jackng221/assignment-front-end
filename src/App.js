import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import NavBar from './components/NavBar';
import UserContext from './contexts/user';
import Home from './pages/Home';
import ManageDogs from './pages/ManageDogs';
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';
import Dog from './pages/Dog';
import Favourite from './pages/Favourite';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
      {
        loggedIn: false, username: "", password: "", role: ""
      },
      canRequest: true
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.regComplete = this.regComplete.bind(this);
    this.enableRequest = this.enableRequest.bind(this);
    this.disableRequest = this.disableRequest.bind(this);
  }
  login(user) {
    this.setState({
      user: {
        loggedIn: true, username: user.username, password: user.password, role: user.role
      }
    }, ()=>{console.log("Set user to context ", this.state.user);}
    );
  }
  logout() {
    this.setState({
      user: {
        loggedIn: false, username: "", password: "", role: ""
      }
    }, ()=>{console.log("User is logged out from the app context");}
    );
  }
  regComplete() {
    //this.setState({ user: { registerOK: true } });
    console.log("Registration OK");
  }
  enableRequest(){
    this.setState({
      canRequest: true
    })
    console.log("Enable request");
  }
  disableRequest(){
    this.setState({
      canRequest: false
    })
    console.log("Disable request");
  }

  render() {
    const context = {
      user: this.state.user,
      canRequest: this.state.canRequest,

      login: this.login,
      logout: this.logout,
      regComplete: this.regComplete,
      enableRequest: this.enableRequest,
      disableRequest: this.disableRequest
    }
    return (
      <div className="App">
        <UserContext.Provider value={context}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dog" element={<Dog/>} />
              <Route path="/favourite" element={<Favourite/>}/>
              <Route path="/managedogs" element={<ManageDogs/>} />
              <Route path="/register" element={<RegisterUser/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
