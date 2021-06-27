import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { fetchRooms, selectAllRooms } from '../roomsslice';

import { Card, Grid, Button, Typography, Avatar, CircularProgress } from '@material-ui/core/';

function BroadcasterProfile( {room} ) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const roomStatus = useSelector((state) => state.rooms.status);
    const roomsList = useSelector(selectAllRooms);


    useEffect(() => {

        if (roomStatus === 'idle') {
    
          dispatch(fetchRooms());
    
        }
    
    }, [roomStatus, dispatch])

    /*
     * Returns the room that has the same id as the current room
     * 
     * @param {Array} arr list of all study room
     * @return {Object} room room object of the current room
     * 
     */
    const getRoom = (array) => {

        const filteredRooms = array.filter(rm => rm.creatorid === room);
        return filteredRooms[0];

    }

    return (
        <>
            {!(roomStatus === 'succeeded') ? (

                <CircularProgress />

            ) : (

                <>
                    <Card className={classes.profileContainer}>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justify="flex-start"
                        >
                            <Grid className={classes.profileContent}>
                                <Avatar className={classes.purple} alt={getRoom(roomsList).username} src={getRoom(roomsList).profileurl} >{getRoom(roomsList).username.charAt(0)}</Avatar>
                            </Grid>
                            <Typography className={classes.userName} variant="subtitle1">
                                    {getRoom(roomsList).username}
                            </Typography>
                        </Grid>
                        <Grid className={classes.roomButton}>
                                <Button className={classes.followButton} variant="contained" >
                                    Follow
                                </Button>
                        </Grid>
                    </Card>
                    <br />
                    <Card className={classes.descriptionContainer}>
                        <Grid
                                container
                                direction="column"
                                alignItems="left"
                                justify="flex-start"
                            >   
                                <Typography variant="h6">Room Description:</Typography>
                                <Typography variant="subtitle2">{getRoom(roomsList).description}</Typography>
                                <br />
                                <Typography variant="h6">About Me:</Typography>
                                <Typography variant="subtitle2">To implement bio feature</Typography>
                        </ Grid>
                    </Card>
                    <br />
                    <br />
                    <br />

                </>

            )}
            
        </>

    )

}

export default BroadcasterProfile;