import React from 'react';

import DiscoverProfile from './discoverprofile';
import AllPosts from './allposts';

import { Grow, Grid, Container } from '@material-ui/core';

function DiscoverProfileHome({ match }) {

    const id = match.params.id;

    return (
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <DiscoverProfile userid={id}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <AllPosts userid={id}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )

}

export default DiscoverProfileHome;