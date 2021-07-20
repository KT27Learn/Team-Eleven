import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import useStyles from './styles';
import { fetchRooms, selectAllRooms } from '../roomsslice';

import { Card, Grid, Button, Typography, Avatar, CircularProgress } from '@material-ui/core/';

function BroadcasterProfile( {room} ) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const roomStatus = useSelector((state) => state.rooms.status);
    const roomsList = useSelector(selectAllRooms);
    const [username, setUserName] = useState('');
    const [avatarurl, setAvatarurl] = useState('');
    const [userBio, setUserBio] = useState('');
    const [avatarImageStatus, setAvatarImageStatus] = useState(false);


    useEffect(() => {

        if (roomStatus === 'idle') {
    
          dispatch(fetchRooms());
    
        }

        if (roomsList) {

            const room = getRoom(roomsList);

            async function fetchBroadcasterDetails(id) {
                try {
        
                    const result = await axios.get(`http://localhost:5000/users/${id}`);
                    setUserName(result.data.name);
                    setAvatarurl(result.data.imageurl);
                    setUserBio(result.data.bio);
                    setAvatarImageStatus(true);
        
                } catch(error) {
                    console.log(error);
                }
            }

            console.log(room);
        
            fetchBroadcasterDetails(room.userid);

        }
        // eslint-disable-next-line
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
            {!(avatarImageStatus) ? (

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
                                <Avatar className={classes.purple} alt={username} src={avatarurl} >{username.charAt(0)}</Avatar>
                            </Grid>
                            <Typography className={classes.userName} variant="subtitle1">
                                    {username}
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
                                <Typography variant="subtitle2">{getRoom(roomsList).description ?? 'Welcome to my room!'}</Typography>
                                <br />
                                <Typography variant="h6">About Me:</Typography>
                                <Typography variant="subtitle2">{userBio ?? 'No bio at the moment'}</Typography>
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