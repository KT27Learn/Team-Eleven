import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { selectAllPastLogs, fetchSessions } from './profileslice';

import { Typography, Avatar, Card, CardContent, CircularProgress } from '@material-ui/core';

function Profile() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    const historyStatus = useSelector((state) => state.profile.status);
    const historyList = useSelector(selectAllPastLogs);

    const [hours, setHours] = useState(0)
    const [minutes, setMintues] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        if (historyStatus === 'idle') {
          dispatch(fetchSessions({ userid : user.result._id}));
        }

        if (historyStatus === 'succeeded') {
            calculateTime(historyList.session);
        }
        
        // eslint-disable-next-line
      }, [historyStatus, dispatch]);

    /*
     * Calculates the cumulated time from past study sessions
     *
     * @param {Array} arr array to sieve through
     * 
     */  
    const calculateTime = (arr) => {

        let totalTime = 0;
        for (let i = 0; i < arr.length; i++) {
            totalTime += arr[i].cumulatedtime;
        }
        
        const displayHours = Math.floor(totalTime / 216000);
        setHours(displayHours);
        const tempMinutes = totalTime % 216000;
        const displayMinutes = Math.floor(tempMinutes / 3600);
        setMintues(displayMinutes);
        const displaySeconds = tempMinutes % 3600;
        setSeconds(displaySeconds);

    }


    return (
        <>
            { historyStatus === 'succeeded' ? (
                <>
                <Card classname={classes.profileCard}>
                    <CardContent className={classes.profileContent}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                        <Typography  variant="h6" align="center">{user.result.name}</Typography>
                        <Typography  variant="h6" align="center">Email: {user.result.email}</Typography>
                        <Typography  variant="h6" align="center">Cumulative Study Hours:</Typography>
                        <Typography  variant="subtitle1" align="center">{hours < 10 ? "0" + hours : hours} hours: {minutes < 10 ? "0" + minutes: minutes} minutes: {seconds < 10 ? "0" + seconds : seconds} seconds</Typography>
                        <br></br>
                        <br></br>
                    </CardContent>
                </Card>
                
                </>
            ) : (
                <CircularProgress />
            )}
        </>

    );
}


export default Profile; 