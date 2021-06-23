import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, Grow, Grid, Chip, Paper } from '@material-ui/core';

import StudyRooms from '../Rooms/studyrooms';
import Profile from './profile/profile';


function useQuery() {

  return new URLSearchParams(useLocation().search);

}

const RoomsList = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <StudyRooms />
          </Grid>
          { user ? (
            <Grid item xs={12} sm={4}>
                <Profile User={user}/>
            </Grid>
          ): ( 
            <>
            </>   
          ) }    
        </Grid>
        
      </Container>
    </Grow>
  );
};

export default RoomsList;