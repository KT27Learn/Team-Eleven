import React from 'react';

import Video from './Video/Stream';
import Chat from './Chat/chatroom';

import { Grid } from '@material-ui/core';


function LibraryHome() {

    return(

        <Grid>
            <Grid>
                <Video />
            </Grid>
            <Grid>
                <Chat />
            </Grid>

        </Grid>

    )

}

export default LibraryHome;