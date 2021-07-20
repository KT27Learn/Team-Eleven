import React from 'react';
import { useDispatch } from 'react-redux';

import FriendRequest from './friendrequest';
import { updateFriends } from '../../Auth/authSlice';

import { Typography, Container, Grow, Grid, Button } from '@material-ui/core';

function RequestList () {

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    function sortFriends(list) {

        let requests = [];
        if (list) {
            return list;
        }

        return requests;

    }

    function sortRequests(list) {

        let requests = [];
        if (list) {
            return list;
        }
        return requests;

    }

    function refreshFriendsList() {
        
        const userDetails = {
            userid: user.result._id
        }
        dispatch(updateFriends(userDetails));

    }

    return (
        <>  
            <Grow in>
                <Container maxWidth="xl">
                    <Grid>
                        <Button variant="contained" colour="primary" onClick={refreshFriendsList}>
                            Refresh List
                        </Button>
                    </Grid>
                    <br />
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h5">Friends:</Typography>
                            {sortFriends(user.result.friends).map((request) => (
                                <Grid key={request.friendid} item xs={12} sm={7} md={6}>
                                    <FriendRequest request={false} details={request}/>
                                </Grid>
                            ))}
                            <br />
                            <Typography variant="h5">Requests:</Typography>
                            {sortRequests(user.result.friendrequests).map((request) => (
                                <Grid key={request.friendid} item xs={12} sm={7} md={6}>
                                    <FriendRequest request={true} details={request}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )

}

export default RequestList;