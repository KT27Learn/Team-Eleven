import React from 'react';
import { useHistory } from 'react-router-dom';

import { Card, Grid, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


function StudyRoom({ room }) {

    const classes = useStyles();
    const history = useHistory();

    const roomName = room.roomname;
    const roomCreator = room.username;
    const description = room.description;
    const studymethod = room.studymethod;
    const subject = room.subject;

    /*
     * Enters the livestream room of the current study room
     * 
     */
    const joinRoom = () => {

        history.push(`/viewerstream?room=${room.creatorid}`);

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
                        {roomName}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {roomCreator}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {description}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {studymethod}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
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
