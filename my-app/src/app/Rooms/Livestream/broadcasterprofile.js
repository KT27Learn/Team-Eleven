import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import useStyles from './styles';

import { Card, Grid, Button, Typography, Avatar } from '@material-ui/core/';

function BroadcasterProfile( {room} ) {

    const classes = useStyles();
    const location = useLocation();
    const roomid = queryString.parse(location.search).room + '';
    const userid = queryString.parse(location.search).userid + '';
    const [description, setDescription] = useState('');
    const [username, setUserName] = useState('');
    const [avatarurl, setAvatarurl] = useState('');
    const [userBio, setUserBio] = useState('');

    useEffect(() => {

        async function fetchBroadcasterDetails(id) {
            try {
                
                const roomresult = await axios.get(`https://team-eleven-backend.herokuapp.com/rooms/${id}`)
                setDescription(roomresult.data.description);
    
            } catch(error) {
                console.log(error);
            }
        }
    
        fetchBroadcasterDetails(roomid);

        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        async function fetchBroadcasterDetails(id) {
            try {
                
                const result = await axios.get(`https://team-eleven-backend.herokuapp.com/users/${id}`);
                setUserName(result.data.name);
                setAvatarurl(result.data.imageurl);
                setUserBio(result.data.bio);
    
            } catch(error) {
                console.log(error);
            }
        }
    
        fetchBroadcasterDetails(userid);

        // eslint-disable-next-line
    }, [])

    return (
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
                                <Typography variant="subtitle2">{description ?? 'Welcome to my room!'}</Typography>
                                <br />
                                <Typography variant="h6">About Me:</Typography>
                                <Typography variant="subtitle2">{userBio ?? 'No bio at the moment'}</Typography>
                        </ Grid>
                    </Card>
                    <br />
                    <br />
                    <br />
        </>

    )

}

export default BroadcasterProfile;
