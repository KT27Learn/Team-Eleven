import React from 'react';

import Library from './library';

import { Container, Typography, Grid } from '@material-ui/core';

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
