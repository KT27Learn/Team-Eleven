import React from 'react';

import Viewer from './Video/viewertrial';
import Chat from './Chat/chatroom';

import { Grid } from '@material-ui/core';


function ViewerHome() {

    return(

        <Grid>
            <Grid>
                <Viewer />
            </Grid>
            <Grid>
                <Chat />
            </Grid>

        </Grid>

    )

}

export default ViewerHome;