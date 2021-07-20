import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { selectAllPastLogs, fetchSessions } from '../Profile/profileslice';

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
    const [methodFrequency] = useState([]);
    const [frequencyListContents] = useState([]);
    const [mostFrequentMethods, setMostFrequentMethods] = useState([]);

    useEffect(() => {

        if (historyStatus === 'idle') {
          dispatch(fetchSessions({ userid : user.result._id}));
        }

        if (historyStatus === 'succeeded') {
            calculateStats(historyList.session);
        }
        
        // eslint-disable-next-line
      }, [historyStatus, dispatch]);

    /*
     * Calculates the cumulated time from past study sessions
     *
     * @param {Array} arr array to sieve through
     * 
     */  
    const calculateStats = (arr) => {

        let totalTime = 0;

        //check most frequent methods
        if (arr) {

            for (let i = 0; i < arr.length; i++) {
                totalTime += arr[i].cumulatedtime;
    
                if (!frequencyListContents) {
    
                    frequencyListContents.push(arr[i].studymethod);
                    methodFrequency[0] = 1;
    
                } else {
    
                    let newMethod = true;
                    for (let k = 0; k < frequencyListContents.length; k++) {
                        
                        if (frequencyListContents[k] === arr[i].studymethod) {
    
                            methodFrequency[k] = methodFrequency[k] + 1;
                            newMethod = false;
                            break;
    
                        }
    
                    }
    
                    if (newMethod) {
    
                        frequencyListContents.push(arr[i].studymethod);
                        methodFrequency[frequencyListContents.length - 1] = 1;
                        
    
                    }
    
                }
    
            }
    
            let highestFrequency = 0;
            let tiedMethods = [];
            
            for (let j = 0; j < frequencyListContents.length; j++) {

                if (methodFrequency[j] > highestFrequency) {

                    highestFrequency = methodFrequency[j];
                    tiedMethods = [{ name: frequencyListContents[j], frequency: methodFrequency[j]}];

                } else if (methodFrequency[j] === highestFrequency) {

                    tiedMethods.push({ name: frequencyListContents[j], frequency: methodFrequency[j]})
                    
                }
                
            }

            if (tiedMethods) {

                setMostFrequentMethods([ ...tiedMethods ]);

            }

        }
        
        const displayHours = Math.floor(totalTime / 216000);
        setHours(displayHours);
        const tempMinutes = totalTime % 216000;
        const displayMinutes = Math.floor(tempMinutes / 3600);
        setMintues(displayMinutes);
        const displaySeconds = tempMinutes % 3600;
        setSeconds(displaySeconds);

    }

    const getPercentage = (number) => {

        const result = Math.floor((number/ historyList.session.length) * 100)
        return result;
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
                        {mostFrequentMethods && 
                            <>
                            <Typography  variant="h6" align="center">Most Frequent Study Methods:</Typography>
                            {mostFrequentMethods.length > 0 ? (
                                <>
                                    {mostFrequentMethods.map((method) => (
                                        <Typography  variant="subtitle1" align="center">{method.name} {getPercentage(method.frequency)}%</Typography>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Typography  variant="subtitle1" align="center">No study session logged yet</Typography>
                                </>

                            )}
                            </>
                        }
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