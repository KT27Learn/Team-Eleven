import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import useStyles from './styles';
import { acceptFriendRequest, removeFriend, removeFriendRequest } from '../../Auth/authSlice';

import { Typography, Card, Avatar, Grid, CircularProgress, Button } from '@material-ui/core';

function FriendRequest({request, details}) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));
    const [bio, setBio] = useState('');
    const [avatarurl, setAvatarurl] = useState('');
    const [avatarImageStatus, setAvatarImageStatus] = useState(false);
    
    useEffect(() => {

        async function fetchAvatarImage() {
            try {

                const result = await axios.get(`http://localhost:5000/users/${details.friendid}`);
                setAvatarurl(result.data.imageurl);
                setBio(result.data.bio);
                setAvatarImageStatus(true);

            } catch(error) {
                console.log(error);
            }
        }

        fetchAvatarImage();
        // eslint-disable-next-line
    }, []);
    
    async function acceptRequest() {

        try {

            const usersDetails = {

                senderid: user.result._id,
                sendername: user.result.name,
                receiverid: details.friendid,
                receivername: details.friendname,
            }
            dispatch(acceptFriendRequest(usersDetails));

        } catch(err) {

        }

    }

    async function declineRequest() {

        try {

            const usersDetails = {

                senderid: user.result._id,
                sendername: user.result.name,
                receiverid: details.friendid,
                receivername: details.friendname,
            }
            dispatch(removeFriendRequest(usersDetails));

        } catch(err) {

        }

    }

    async function remFriend() {

        try {

            const usersDetails = {

                senderid: user.result._id,
                sendername: user.result.name,
                receiverid: details.friendid,
                receivername: details.friendname,
            }
            dispatch(removeFriend(usersDetails));

        } catch(err) {

        }

    }

    function navigateUserProfile() {

        history.push(`/discoverprofile/${details.friendid}`);
    }

    return (
        <>
            {avatarImageStatus ? (
                <>
                    <Card className={classes.roomContainer}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid className={classes.profileDetails}>
                                <Avatar className={classes.purple} alt={details.friendname} src={avatarurl} onClick={navigateUserProfile}>{details.friendname.charAt(0)}</Avatar>
                                <Typography className={classes.username} component="subtitle1" variant="subtitle1" onClick={navigateUserProfile}>
                                    {details.friendname}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography variant="Subtitle2" color="textSecondary" onClick={navigateUserProfile}>
                                    Bio: {bio ? bio : 'No bio at the moment'}
                                </Typography>
                            </Grid>
                        </Grid>
                        {request ? (
                            <>
                                <Grid>
                                    {!details.sender ? (
                                        <>
                                            <Button variant="contained" colour="primary" disabled>
                                                Request Pending
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="contained" colour="primary" onClick={acceptRequest}>
                                                Accept
                                            </Button>
                                            <br />
                                            <br />
                                            <Button variant="contained" colour="primary" onClick={declineRequest}>
                                                Decline
                                            </Button>
                                        </>
                                    )

                                    }
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid>
                                    <Button variant="contained" colour="primary" onClick={remFriend}>
                                        Remove Friend
                                    </Button>
                                </Grid>

                            </>
                        )
                        }
                    </Card>
                    <br />
                </>
            ) : ( 
                <CircularProgress />
            )}
        </>
    )

}

export default FriendRequest;