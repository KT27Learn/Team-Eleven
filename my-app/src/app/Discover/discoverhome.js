import React from 'react';

import Postswall from "./postswall";

import { Container, Grow, Grid } from '@material-ui/core';

function Discover() {

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="center" spacing={3}>
          <Grid item xs={12}>
              <Postswall />
          </Grid>
        </Grid>
        
      </Container>
    </Grow>
  );
};

export default Discover;