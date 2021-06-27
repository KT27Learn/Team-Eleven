import React from 'react';
import { useLocation } from 'react-router-dom';

import Viewer from './Video/viewertrial';
import Chat from './Chat/chatroom';
import queryString from 'query-string';
import BroadcasterProfile from './broadcasterprofile';

import { Grid, Grow, Container } from '@material-ui/core';


function ViewerHome() {

    const location = useLocation();
    const { room } = queryString.parse(location.search);


    return(
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container direction="row" justify="space-around" alignItems="stretch" spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Viewer />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Chat roomDetails={room} />
                        </Grid> 
                    </Grid>
                        <Grid xs={12} sm={6}>
                            <BroadcasterProfile room={room}/>
                        </Grid>
                </Container>
            </Grow>
        </>

    )

}

export default ViewerHome;