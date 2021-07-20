import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Card, Grid, Button, Typography, Avatar } from '@material-ui/core';
import useStyles from './styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function StudyRoom({ room }) {

    const classes = useStyles();
    const history = useHistory();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const roomName = room.roomname;
    const roomCreator = room.username;
    const description = room.description;
    const studymethod = room.studymethod;
    const subject = room.subject;
    const userId = room.userid;
    const [avatarurl, setAvatarurl] = useState('');
    const [avatarImageStatus, setAvatarImageStatus] = useState(false);

    /*
     * Enters the livestream room of the current study room
     * 
     */
    const joinRoom = () => {

        if (user) {

            if (userId === user.result._id) {

                history.push(`/broadcaststream?room=${room.creatorid}`);

            } else {

                history.push(`/viewerstream?room=${room.creatorid}`);

            }

        } else {

            history.push(`/viewerstream?room=${room.creatorid}`);

        }
        
        

    }

    useEffect(() => {

        async function fetchAvatarImage() {
            try {

                const result = await axios.get(`http://localhost:5000/users/${userId}`);
                setAvatarurl(result.data.imageurl);
                setAvatarImageStatus(true);

            } catch(error) {
                console.log(error);
            }
        }

        fetchAvatarImage();
        // eslint-disable-next-line
    }, []);

    function firstLine(string) {

        const words = string.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i ++) {

            if (i === 7) {

                break;

            }
            line += words[i] + ' ';

        }

        return line;
        

    }

    function secondLine(string) {

        const words = string.split(' ');
        let line = '';

        if (words.length <= 7) {

            return '';

        } else {

            for (let i = 7; i < words.length; i ++) {

                if (i === 14) {
                    
                    line += '...'
                    break;
    
                }
                line += words[i] + ' ';
    
            }
            return line;

        }

    }

    function roomNameResctrict(string) {

        const words = string.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i ++) {

            if (i === 5) {

                line += '...'
                break;

            }
            line += words[i] + ' ';

        }

        return line;
        

    }
        
    return (   
        <>
        <Card className={classes.roomContainer}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                { avatarImageStatus &&
                    <>
                    <Grid>
                        <Avatar className={classes.purple} align="center" alt={roomCreator} src={avatarurl} >{roomCreator.charAt(0)}</Avatar>
                    </Grid>
                    </>
                }
                <Grid className={classes.roomContent}>
                    <Typography component="h5" variant="h5">
                        {roomNameResctrict(roomName)}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        User: {roomCreator}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Description:
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {firstLine(description)}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {secondLine(description)}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Study Method: {studymethod}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Subject: {subject}
                    </Typography>
                </Grid>
            </Grid>
            <Grid className={classes.roomButton}>
                <Button variant="contained" color="default" endIcon={<PlayArrowIcon/>} onClick={joinRoom}>
                    { (user && user.result._id === userId) ? ('Resume Livestream') : ('Join Room' )}
                </Button>
            </Grid>
        </Card>
        <br />
        
        </>
    )
}

export default StudyRoom;
