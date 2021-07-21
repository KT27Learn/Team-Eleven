import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { selectAllPastLogs, fetchSessions } from './profileslice';

import { Grid, Paper, Typography, Table, TableHead ,TableContainer, TableCell, TableRow, TableBody, CircularProgress, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const History = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const historyStatus = useSelector((state) => state.profile.status);
    const historyList = useSelector(selectAllPastLogs);
    const [methodFrequency] = useState([]);
    const [frequencyListContents] = useState([]);
    const [completedTasks] = useState([]);
    const [uncompletedTasks] = useState([]);
    const [sortProgress, setSortProgress] = useState(false);

    useEffect(() => {

        if (historyStatus === 'idle') {
          dispatch(fetchSessions({ userid : user.result._id}));
        } 
        
        if (historyStatus === 'succeeded') {
            sortTasks(historyList.session);
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
        //check most frequent methods
        if (arr) {

            for (let i = 0; i < arr.length; i++) {
    
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
        }
        

    }

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

    function calculateFrequency(no) {

        console.log(no);
        console.log(historyList.session.length)
        return Math.floor((no / historyList.session.length) * 100);

    }
    
    return (
        <>
            {sortProgress ? (
                <>
                    <br />
                    <br />
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1a-header"
                        >
                        <Typography className={classes.heading}>Compiled Completed Tasks</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid>         
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
                                            <TableCell align="left">{index + 1}</TableCell>
                                            <TableCell align="left">{task.description}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography className={classes.heading}>Compiled Uncompleted Tasks</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid>  
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
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">{task.description}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography className={classes.heading}>Study Methods Frequency</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">No.</TableCell>
                                            <TableCell align="left">Method</TableCell>
                                            <TableCell align="center">Total Uses</TableCell>
                                            <TableCell align="center">Frequency</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {frequencyListContents.map((methodName, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{index + 1}</TableCell>
                                            <TableCell align="left">{methodName}</TableCell>
                                            <TableCell align="center">{methodFrequency[index]}</TableCell>
                                            <TableCell align="center">{calculateFrequency(methodFrequency[index])}%</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </>
                
            ) : (
                
                <CircularProgress />

            )}
                
        </>
    )
}

export default History;