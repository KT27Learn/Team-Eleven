import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Card, Grid, CardMedia, Button, Typography } from '@material-ui/core/';
import useStyles from './styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


function StudyRoom({ room }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    //const image = method.image;
    const roomCreator = room.username;
    const description = room.description;
    const studymethod = room.studymethod;
    const subject = room.subject;
    const history = useHistory();

    const joinRoom = () => {

        history.push(`/stream?room=${room.creatorid}`);

    }
        
    return (   
        <>
        <Card className={classes.roomContainer}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <div className={classes.roomContent}>
                    <Typography component="h5" variant="h5">
                        {roomCreator}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {description}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {studymethod}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {subject}
                    </Typography>
                </div>
                <div className={classes.roomButton}>
                    <Button variant="contained" color="default" endIcon={<PlayArrowIcon/>} onClick={joinRoom}>
                        Join Room
                    </Button>
                </div>
            </Grid>
        </Card>
        <br />
        
        </>
    )
}

export default StudyRoom;
