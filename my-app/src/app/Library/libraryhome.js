import React from 'react';
import { Container, Typography, TextField, IconButton, Grid } from '@material-ui/core';


import Library from './library';


const LibraryHome = () => {

  return (

      <Container>
        <Typography variant="h5" align="left">Library</Typography>
        
        <br/>
        <Grid container direction="column" alignItems="stretch" justify="flex-start">
          <Library />
        </Grid>
      </Container>
      
  );
};

export default LibraryHome;
