import React, { useState } from 'react';

import StudyRooms from '../Rooms/studyrooms';
import Profile from './profile';

import { Container, Grow, Grid } from '@material-ui/core';



const RoomsList = () => {

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));

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