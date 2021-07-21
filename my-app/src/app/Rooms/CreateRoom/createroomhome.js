import React from 'react';

import CreateRoom from './createroom';
import RoomHistory from './roomhistory';

import { Grid, Grow, Container } from '@material-ui/core';

function CreateRoomHome() {

    return(

        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container direction="row" justify="space-around" alignItems="stretch" spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <CreateRoom />
                        </Grid>
                        <Grid item xs={12} sm={7}>                                
                            <RoomHistory />
                        </Grid> 
                    </Grid>
                </Container>
            </Grow>
        </>
        

    )

}

export default CreateRoomHome;