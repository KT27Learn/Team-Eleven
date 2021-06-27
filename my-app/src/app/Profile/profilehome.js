import React from 'react';

import Profile from './profile';
import History from './history';

import { Grow, Grid, Container } from '@material-ui/core';

export default function ProfileHome() {

    return (

        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Profile />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <History/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )

}