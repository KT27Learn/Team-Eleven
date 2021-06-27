import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { selectAllPastLogs, fetchSessions } from './profileslice';

import { Grid, Paper, Typography, Table, TableHead ,TableContainer, TableCell, TableRow, TableBody, CircularProgress } from '@material-ui/core';

const History = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const historyStatus = useSelector((state) => state.profile.status);
    const historyList = useSelector(selectAllPastLogs);
    const [completedTasks] = useState([]);
    const [uncompletedTasks] = useState([]);
    const [sortProgress, setSortProgress] = useState(false);

    useEffect(() => {

        if (historyStatus === 'idle') {
          dispatch(fetchSessions({ userid : user.result._id}));
        } 
        
        if (historyStatus === 'succeeded') {
            sortTasks(historyList.session);
        }
      
        // eslint-disable-next-line    
    }, [historyStatus, dispatch]);

    /*
     * Sorts all tasks in past logs into completed tasks array and 
     * uncompleted tasks arrays
     *
     * @param {Array} arr array to be sorted
     * 
     */
    const sortTasks = (arr) => {

        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                const currentLog = arr[i].tasks;

                if (currentLog) {
                    // eslint-disable-next-line
                    currentLog.map((task) => {
                        if (task.isComplete) {
                            completedTasks.push(task);
                        } else {
                            uncompletedTasks.push(task);
                        }
                    })
                }
            }
        }
        setSortProgress(true);
    }

    return (
        <>
            {sortProgress ? (
                <>
                    <Grid> 
                        <Typography variant="h4" align="center">Completed Tasks:</Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="left">Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completedTasks.map((task, index) => (

                                <TableRow key={index}>
                                    <TableCell align="left">{index}</TableCell>
                                    <TableCell align="left">{task.description}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Grid>
                    <br />
                    <br />
                    <Grid>  
                        <Typography variant="h4" align="center">Uncompleted Tasks:</Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">No.</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {uncompletedTasks.map((task, index) => (
                                        <TableRow key={index}>
                                                <TableCell align="left">{index}</TableCell>
                                                <TableCell align="left">{task.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </>
                
            ) : (
                
                <CircularProgress />

            )}
                
        </>
    )
}

export default History;