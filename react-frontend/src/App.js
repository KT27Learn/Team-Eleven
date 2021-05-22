import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

import Navbar from "./components/navbar-component";
import CreateUsers from "./components/create-user-component";
import CreateRooms from "./components/create-room-component";
import CreateStudyMethods from "./components/create-studymethod-component";
import RoomsList from "./components/room-list-component";
import LibraryList from "./components/library-component";
import EditRooms from "./components/edit-rooms-component";
import EditStudyMethod from "./components/edit-studymethod-component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={RoomsList} />
        <Route path="/library" exact component={LibraryList} />
        <Route path="/room-edit/:id" exact component={EditRooms} />
        <Route path="/studymethod-edit/:id" exact component={EditStudyMethod} />
        <Route path="/user" exact component={CreateUsers} />
        <Route path="/create-room" exact component={CreateRooms} />
        <Route path="/create-studymethod" exact component={CreateStudyMethods} />
      </div>
    </Router>
  );
}

export default App;
