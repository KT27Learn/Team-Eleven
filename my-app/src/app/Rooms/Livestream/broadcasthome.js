import React from 'react';

import Broadcast from './Video/broadcasttrial';
import Chat from './Chat/chatroom';

import { Grid } from '@material-ui/core';


function BroadcastHome() {

    return(

        <Grid>
            <Grid>
                <Broadcast />
            </Grid>
            <Grid>
                <Chat />
            </Grid>

        </Grid>

    )

}

export default BroadcastHome;