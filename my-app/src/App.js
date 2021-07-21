import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Auth from './app/Auth/auth';
import ActivateUser from './app/Auth/activateuser';
import PasswordReset from './app/Auth/passwordreset';
import ChangePassword from './app/Auth/changepassword';
import Navbar from './app/Navbar/navbar';
import Library from './app/Library/libraryhome';
import ProfileHome from './app/Profile/profilehome';
import FriendList from './app/Profile/FriendList/friendlist';
import RoomsList from './app/Rooms/roomhome';
import CreateRoomHome from './app/Rooms/CreateRoom/createroomhome';
import Timer from './app/Timer/timer';
import Summary from './app/Timer/summary';
import Broadcast from './app/Rooms/Livestream/broadcasthome';
import Viewer from './app/Rooms/Livestream/viewerhome';
import DiscoverHome from './app/Discover/discoverhome';
import DiscoverProfileHome from './app/Discover/Profile/discoverprofilehome';
import CreatePost from './app/Discover/createpost';
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
          <Route path="/discover" exact component={DiscoverHome} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/timer/:id" exact component={Timer} />
          <Route path="/summary" exact component={Summary} />
          <Route path='/viewerstream' exact component={Viewer} />
          <Route path='/broadcaststream' exact component={Broadcast} />
          <Route path="/auth" exact component={() => ( !user ? <Auth /> : <Redirect to="/"/>) }/>
          <Route path="/activateuser/:activation_token" exact component={ActivateUser}/>
          <Route path="/passwordreset/:token" exact component={PasswordReset}/>
          <Route path="/changepassword" exact component={ChangePassword}/>
          <Route path="/profile" exact component={ProfileHome} />
          <Route path="/discoverprofile/:id" exact component={DiscoverProfileHome} />
          <Route path="/friendlist" exact component={FriendList} />
          <Route path="/rooms" exact component={RoomsList} />
          <Route path="/createroom" exact component={CreateRoomHome} />
          <Route path="/" exact component={() => <Redirect to="/rooms" />} />
        </Switch>
      </Container>
    </BrowserRouter>

  )


};

export default App;
