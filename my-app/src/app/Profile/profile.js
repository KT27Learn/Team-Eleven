import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography, Avatar, Container, Card, CardContent, CircularProgress } from '@material-ui/core';
import { selectAllPastLogs, fetchSessions } from './profileslice';

import useStyles from './styles';
import History from './history';

function Profile() {

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    const historyStatus = useSelector((state) => state.profile.status);
    const historyList = useSelector(selectAllPastLogs);

    useEffect(() => {

        if (historyStatus === 'idle') {
          dispatch(fetchSessions({ userid : user.result._id}));
        }
        
      }, [historyStatus, dispatch]);


    return (
        <Container className={classes.container}>
            { historyStatus === 'succeeded' ? (
                <>
                <Card classname={classes.profileCard}>
                    <CardContent className={classes.profileContent}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                        <Typography  variant="h6" align="center">{user.result.name}</Typography>
                        <Typography  variant="h6" align="center">Email: {user.result.email}</Typography>
                        <Typography  variant="h6" align="center">Cumulative Study Hours: </Typography>
                        <br></br>
                        <br></br>
                    </CardContent>
                </Card>
                <History log={historyList} />
                
                </>
            ) : (
                <CircularProgress />
            )}
        </Container>

    );
}


export default Profile;