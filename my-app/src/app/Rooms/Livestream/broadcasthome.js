import React from 'react';
import { useLocation } from 'react-router-dom';

import Broadcast from './Video/broadcasttrial';
import queryString from 'query-string';
import Chat from './Chat/chatroom';

import { Grid, Grow, Container } from '@material-ui/core';

function BroadcastHome() {
    
    const location = useLocation();
    const { room } = queryString.parse(location.search);

    return(

        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container direction="row" justify="space-around" alignItems="stretch" spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Broadcast />
                        </Grid>
                        <Grid item xs={12} sm={4}>                                
                            <Chat roomDetails={room}/>
                        </Grid> 
                    </Grid>
                </Container>
            </Grow>
        </>
        

    )

}

export default BroadcastHome;