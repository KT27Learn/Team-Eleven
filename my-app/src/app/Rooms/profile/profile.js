import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';

import { Typography, Avatar, Container, Card, CardContent, IconButton } from '@material-ui/core';

function Profile() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [log, setLog] = useState(JSON.parse(localStorage.getItem('pastSessionsLog')));

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    
    const calculateTime = (arr) => {

        let totalTime = 0;
        for (let i = 0; i < arr.length; i++) {
            totalTime += arr[i].cumulatedtime;
        }

        return totalTime;

    }
    


    return (
        <Container className={classes.container}>
            {user ? (
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
                <br />
                <Card classname={classes.studyHoursCard} >
                    <div className={classes.studyHoursContent} >
                        <CardContent className={classes.lines}>
                            <Typography  variant="h6" align="center">This Week:</Typography>
                            <br />
                            <Typography  variant="subtitle2" align="center">{calculateTime(log.session)} seconds</Typography>
                        </CardContent>
                    </div>
                </Card>
                <br />
                <Card classname={classes.profileCard}>
                    <CardContent>
                        <Typography  variant="h6" align="center">Suggested Sessions:</Typography>
                        <Typography  variant="subtitle2" align="center">To be implemented</Typography>
                    </CardContent>
                </Card>
                
                </>
            ) : (
                <Typography variant="h3">Something went wrong!</Typography>
            )}
        </Container>

    );
}


export default Profile;