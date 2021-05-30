import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./navbar-component";
import CreateUsers from "./create-user-component";
import CreateRooms from "./create-room-component";
import CreateStudyMethods from "./create-studymethod-component";
import RoomsList from "./room-list-component";
import LibraryList from "./library-component";
import EditRooms from "./edit-rooms-component";
import EditStudyMethod from "./edit-studymethod-component";
import Timer from "./timer-component";
import StudySummary from "./study-summary-component";
import Register from "./register-component";
import Login from "./login-component";
import Profile from "./profile-component";

export default class Default extends Component {

    constructor(props) {
        
        super(props);
    
        this.state = {
            userid:null,
            username:null,
            email:null,
            studyHours:0,
            //for future use
            tasks:0,
            noOfCompletedTasks:0

        };
        
        this.setStudyHours = this.setStudyHours.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.setCompletedTasksLog = this.setCompletedTasksLog.bind(this);

    }

    signIn(details) {

      if (details.username === undefined || details.email === undefined || details.id === undefined) {

      } else {

        this.setState({
          userid: details.id,
          username: details.username,
          email: details.email
        });

      }
        
    }


    setStudyHours(time) {
      this.setState({
        studyHours: time
      })
    }

    setCompletedTasksLog(val) {
      this.setState({
        noOfCompletedTasks:val
      });
    }

    signOut() {
      this.setState({
        userid: null,
        username: null,
        email: null
      });
    }

  render() {
    return (
        <Router>
          <div className="container">
            <Navbar user={this.state.username} />
            <br />
            <Switch>
              <Route path="/timer/:id" render={(props) => (
                <Timer {...props} userid={this.state.userid} setStudyHours={this.setStudyHours}/>
              )} />
              <Route path="/summary" render={(props) => (
                <StudySummary {...props} user={this.state.username} studyHours={this.state.studyHours} />
              )} />
              <Route path="/library" render={(props)=>( 
                <LibraryList {...props} user={this.state.username} />
              )} />
              <Route path="/room-edit/:id" exact component={EditRooms} />
              <Route path="/studymethod-edit/:id" exact component={EditStudyMethod} />
              <Route path="/user" exact component={CreateUsers} />
              <Route path="/create-room" render={(props) => (
                <CreateRooms {...props} user={this.state.username} />
              )} />
              <Route path="/profile" render={(props) => (
                <Profile {...props} user={this.state.username} email={this.state.email} signOut={this.signOut} />
              )} />
              <Route path="/login" render={(props) => (
                <Login {...props} user={this.state.username} email={this.state.email} userid={this.state.userid} signIn={this.signIn} />
              )}/>
              <Route path="/register" exact component={Register} />
              <Route path="/create-studymethod" render={(props) => (
                <CreateStudyMethods {...props} user={this.state.username} />
              )}/>
              <Route path="/" render={(props) => (
                <RoomsList {...props} user={this.state.username} />
              )} />
            </Switch>
          </div>
        </Router>
      );
  } 
}