import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress, Typography } from '@material-ui/core';

const History = ( {log} ) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const historyStatus = useSelector((state) => state.profile.status);
    
    const calculateTime = (arr) => {

        let totalTime = 0;
        for (let i = 0; i < arr.length; i++) {
            totalTime += arr[i].cumulatedtime;
        }

        return totalTime;

    }

    const filterTasks = (arr) => {

        
        let completedTasks = [];
        for (let i = 0; i < arr.length; i++) {
            const log = arr[i].tasks

            if (log.length > 0) {
                const completedTasksLog = log.filter(task => task.isComplete);
                completedTasks = [...completedTasks, ...completedTasksLog];

            }
            

        }

        return completedTasks

    }

    
    return (

        <>
        { historyStatus === 'succeeded' ? (
            <Grid>
                <>
                    <Typography variant='h6'>Cumulative Study Hours: </Typography>
                    <Typography variant='subtitle2'>{calculateTime(log.session)} seconds</Typography> 
                    <Typography variant='h6'>Completed Tasks: </Typography>
                    {filterTasks(log.session).map((task) => (
                        <Typography variant="subtitle2" align="center">{task.description}</Typography>
                    ))}
                </>
            </Grid>

        ) : (
            <CircularProgress />
        )}
        </>
        
    )

}

export default History;