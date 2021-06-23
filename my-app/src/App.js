import React from 'react';
import { Container } from '@material-ui/core';
import Auth from './app/Auth/auth';
import Navbar from './app/Navbar/navbar';
import Library from './app/Library/libraryhome';
import Profile from './app/Profile/profile';
import RoomsList from './app/Rooms/roomhome';
import CreateRoom from './app/Rooms/createroom'
import Timer from './app/Timer/timer';
import Summary from './app/Timer/summary';
//import LiveStudyRoom from './app/Rooms/Livestream/livestudyroom';
import Stream from './app/Rooms/Livestream/livestreamhome'
import Broadcast from './app/Rooms/Livestream/broadcasthome';
import Viewer from './app/Rooms/Livestream/viewerhome';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (

    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route exact path="/library" exact component={Library} />
          <Route exact path="/timer/:id" exact component={Timer} />
          <Route exact path="/summary" exact component={Summary} />
          <Route path='/stream' exact component={Stream}/>
          <Route path='/viewerstream' exact component={Viewer} />
          <Route path='/broadcaststream' exact component={Broadcast} />
          <Route exact path="/auth" exact component={() => ( !user ? <Auth /> : <Redirect to="/"/>) }/>
          <Route exact path="/profile" exact component={Profile} />
          <Route exact path="/rooms" exact component={RoomsList} />
          <Route exact path="/createroom" exact component={CreateRoom} />
          <Route exact path="/" exact component={() => <Redirect to="/rooms" />} />
          
        </Switch>
      </Container>
    </BrowserRouter>



  )


};

export default App;
