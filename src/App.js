import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import NavBar from './components/NavBar';
import UserContext from './contexts/user';
import Home from './pages/Home';
import ManageDogs from './pages/ManageDogs';
import RegisterUser from './pages/RegisterUser';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Dog from './pages/Dog';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
      {
        loggedIn: false, password: "", role: ""
      }
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    //this.regComplete = this.regComplete.bind(this);
  }
  login(user) {
    this.setState({
      user: {
        loggedIn: true,
        password: user.password,
        role: user.role
      }
    });
    console.log("Set user to context ", this.state.user);
  }
  logout() {
    this.setState({
      user: {
        loggedIn: false, password: "", role: ""
      }
    });
    console.log("User is logged out from the app context");
  }
  // regComplete() {
  //   this.setState({ user: { registerOK: true } });
  //   console.log("Registration OK");
  // }

  render() {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout,
      //regComplete: this.regComplete
      role: this.state.user.role
    }
    return (
      <div className="App">
        <UserContext.Provider value={context}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dog" element={<Dog/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
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
