import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Auth from './app/Auth/auth';
import Navbar from './app/Navbar/navbar';
import Library from './app/Library/libraryhome';
import ProfileHome from './app/Profile/profilehome';
import RoomsList from './app/Rooms/roomhome';
import CreateRoom from './app/Rooms/createroom'
import Timer from './app/Timer/timer';
import Summary from './app/Timer/summary';
import Broadcast from './app/Rooms/Livestream/broadcasthome';
import Viewer from './app/Rooms/Livestream/viewerhome';
import './App.css';

import { Container } from '@material-ui/core';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (

    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/library" exact component={Library} />
          <Route path="/timer/:id" exact component={Timer} />
          <Route path="/summary" exact component={Summary} />
          <Route path='/viewerstream' exact component={Viewer} />
          <Route path='/broadcaststream' exact component={Broadcast} />
          <Route path="/auth" exact component={() => ( !user ? <Auth /> : <Redirect to="/"/>) }/>
          <Route path="/profile" exact component={ProfileHome} />
          <Route path="/rooms" exact component={RoomsList} />
          <Route path="/createroom" exact component={CreateRoom} />
          <Route path="/" exact component={() => <Redirect to="/rooms" />} />
        </Switch>
      </Container>
    </BrowserRouter>

  )


};

export default App;
