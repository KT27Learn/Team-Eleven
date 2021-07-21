import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectAllRooms, fetchRooms, addNewRoom} from '../roomsslice';
import useStyles from './styles';

import { Card, Grid, Button, Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function RoomCard({ room }) {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch(); 

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const roomlist = useSelector(selectAllRooms);
    const roomStatus = useSelector((state) => state.rooms.status);
    const roomName = room.roomname;
    const description = room.description;
    const studymethod = room.studymethod;
    const subject = room.subject;
    const creatorid = room.creatorid;
    const count = room.count;

    useEffect(() => {
        if (roomStatus === 'idle') {
          dispatch(fetchRooms())
        }
    
    }, [roomStatus, dispatch])

    const Create = async () => {

        try {
            const roomAlrExist = roomlist.filter(room => room.userid === user.result._id);

            if (roomAlrExist.length > 0) {

                alert("Delete existing room before creating a new room!");
                history.push('/');

            } else {
                dispatch(addNewRoom({
                    username: user.result.name,
                    userid: user.result._id,
                    creatorid: creatorid,
                    roomname: roomName,
                    description,
                    studymethod,
                    subject,
                    })
                );
                history.push(`/broadcaststream?room=${creatorid}`);

            }
            

        } catch (error) {
            alert(error);
        }

    }

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
                <Grid className={classes.roomContent}>
                    <Typography component="h5" variant="h5">
                        {roomNameResctrict(roomName)}
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
                    <Typography variant="subtitle2" color="textSecondary">
                        Count: {count}
                    </Typography>
                </Grid>
            </Grid>
            <Grid className={classes.roomButton}>
                <Button variant="contained" color="default" endIcon={<PlayArrowIcon/>} onClick={Create}>
                    Create Room
                </Button>
            </Grid>
        </Card>
        <br />
        
        </>
    )
}

export default RoomCard;
