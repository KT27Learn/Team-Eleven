import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllPastLogs, fetchSessions } from './profileslice';
import useStyles from './styles';

import { Grid, Typography, Paper, Table, TableHead ,TableContainer, TableCell, TableRow, TableBody } from '@material-ui/core';
import { Pagination } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';


export default function DetailedSession() {

  const dispatch = useDispatch();
  const classes = useStyles();

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [date, setDate] = useState();
  const historyStatus = useSelector((state) => state.profile.status);
  const historyList = useSelector(selectAllPastLogs);
  const [allDates, setAllDates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hours, setHours] = useState(0)
  const [minutes, setMintues] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [studyHours, setStudyHours] = useState(0)
  const [studyMinutes, setStudyMintues] = useState(0);
  const [studySeconds, setStudySeconds] = useState(0);
  const [breakHours, setBreakHours] = useState(0)
  const [breakMinutes, setBreakMintues] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);

  useEffect(() => {

    if (historyStatus === 'idle') {
      dispatch(fetchSessions({ userid : user.result._id}));
    } 
    
    if (historyStatus === 'succeeded') {
      getDates(historyList.session)
    }
  
    // eslint-disable-next-line    
  }, [historyStatus, dispatch]);

  function getDates(arr) {  

    let dates = [];

    if (arr) {

      for (let i = 0; i < arr.length; i++) {

        const str = arr[i].date + '';
        const splitTimeStamp = str.split('T');
        dates.push(splitTimeStamp[0]);

      }

    }

    setAllDates(dates);

  }

  function disableDate(date) {

    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): (date.getMonth() + 1)+ ''
    
    let result = true;

    for (let i = 0; i < allDates.length; i++) {

      const logMonth = allDates[i].substring(5, 7)
      const logDay = allDates[i].substring(8, 10)

      if (month === logMonth) {

        if (day === logDay) {

          result = false;
          break;

        }

      }

    }

    return result;

  }

  /*
     * Calculates the total hours, minutes and seconds from the given
     * seconds
     *
     * @param {Number} totalTime Seconds to be calculated into hours, 
     *                           minutes and seconds
     * 
     */
  const calculateTime = (totalTime) => {
        
    const displayHours = Math.floor(totalTime / 216000);
    setHours(displayHours);
    const tempMinutes = totalTime % 216000;
    const displayMinutes = Math.floor(tempMinutes / 3600);
    setMintues(displayMinutes);
    const displaySeconds = tempMinutes % 3600;
    setSeconds(displaySeconds);

  }

  const calculateStudyTime = (totalTime) => {
        
    const displayHours = Math.floor(totalTime / 216000);
    setStudyHours(displayHours);
    const tempMinutes = totalTime % 216000;
    const displayMinutes = Math.floor(tempMinutes / 3600);
    setStudyMintues(displayMinutes);
    const displaySeconds = tempMinutes % 3600;
    setStudySeconds(displaySeconds);

  }

  const calculateBreakTime = (totalTime) => {
        
    const displayHours = Math.floor(totalTime / 216000);
    setBreakHours(displayHours);
    const tempMinutes = totalTime % 216000;
    const displayMinutes = Math.floor(tempMinutes / 3600);
    setBreakMintues(displayMinutes);
    const displaySeconds = tempMinutes % 3600;
    setBreakSeconds(displaySeconds);

  }

  /*
   * Changes the current page to the value received
   *
   * @param {Event} e event when user clicks on the pagination buttons
   * @param {Value} value next page number
   *
   */
  const handlePaginationChange = (event, value) => {

    setCurrentPage(value);

  };

  const chooseDate = (date) => {

    setDate(date)

  }

  function getLogsByDate(date) {

    const day = date.getDate()< 10 ? '0' + date.getDate() : date.getDate() + '';
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): (date.getMonth() + 1)+ '';
    const sessionDetails = historyList.session.filter(sesh => sesh.date.substring(5, 7) === month && sesh.date.substring(8, 10) === day);
    return sessionDetails;

  }

  const Session = (sessionDetails) => {

    const completedTasks = [];
    const uncompletedTasks = [];    

      if (sessionDetails) {

        calculateTime(sessionDetails.sessionDetails[currentPage - 1].cumulatedtime ? sessionDetails.sessionDetails[currentPage - 1].cumulatedtime : 0);
        calculateStudyTime(sessionDetails.sessionDetails[currentPage - 1].cumulatedstudytime ? sessionDetails.sessionDetails[currentPage - 1].cumulatedstudytime : 0)
        calculateBreakTime(sessionDetails.sessionDetails[currentPage - 1].cumulatedbreaktime ? sessionDetails.sessionDetails[currentPage - 1].cumulatedbreaktime : 0)
        const currentLog = sessionDetails.sessionDetails[currentPage - 1].tasks

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
  
        return (
          <>
            <Grid className={classes.detailedSessionPagination}>
              <Pagination 
                count={sessionDetails.sessionDetails.length}
                page={currentPage}
                onChange={handlePaginationChange}
                defaultPage={1}
                color="primary"
                size="large"
                align="center"
                showFirstButton
                showLastButton
                  classes={classes.pagination}
              />
            </Grid>
            <br />
            <Typography component="h1" variant="h5" align="center"> Study Method: </Typography>
            <Typography variant="subtitle1" align="center">{sessionDetails.sessionDetails[currentPage - 1].studymethod}</Typography>
            <Typography component="h1" variant="h5"  align="center"> Cumulated Time: </Typography>
            <Typography variant="subtitle1" align="center">{hours < 10 ? "0" + hours : hours} hours: {minutes < 10 ? "0" + minutes: minutes} minutes: {seconds < 10 ? "0" + seconds : seconds} seconds</Typography>
            <Typography component="h1" variant="h5"  align="center"> Cumulated Study Time: </Typography>
            <Typography variant="subtitle1" align="center">{studyHours < 10 ? "0" + studyHours : studyHours} hours: {studyMinutes < 10 ? "0" + studyMinutes: studyMinutes} minutes: {studySeconds < 10 ? "0" + studySeconds : studySeconds} seconds</Typography>
            <Typography component="h1" variant="h5"  align="center"> Cumulated Break Time: </Typography>
            <Typography variant="subtitle1" align="center">{breakHours < 10 ? "0" + breakHours : breakHours} hours: {breakMinutes < 10 ? "0" + breakMinutes: breakMinutes} minutes: {breakSeconds < 10 ? "0" + breakSeconds : breakSeconds} seconds</Typography>
            <br />
            { sessionDetails.sessionDetails[currentPage - 1].tasks.length > 0 ? (
                <>
                  <Typography component="h1" variant="h5" align="center" > Tasks: </Typography>
                  <br />
                  <Typography component="h1" variant="h6" > Tasks Completed: </Typography>
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
                  <br />
                  <Typography component="h1" variant="h6" > Tasks Not Complete: </Typography>
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
                  <br />
                  <Typography component="h1" variant="h6" > Tasks Completion Efficacy: {Math.floor((completedTasks.length / (completedTasks.length + uncompletedTasks.length)) * 100)}%</Typography>
                </>
              ) : (

                <>
                  <Typography component="h1" variant="h5"  align="center"> Tasks: </Typography>
                  <Typography variant="subtitle1" align="center" > No Tasks logged during this session! </Typography>
                </>
            )
            }          
            <br /> 
          
          </>
  
        )
  
  
      } else {
  
        return (
  
          <>
          </>
  
        )
  
      }
  
  } 
  

  return (
    <>
      { !allDates ? (

        <>

          <Grid container justify="space-around">

            <Typography component="h1" variant="h5" > 
              No past logs! Please log a study session first
            </Typography>
          </Grid>

        </>

        ) : (

          <>
          <br />
          <br />
            <Grid>
              <Typography component="h1" variant="h5" align="center"> 
                Look at individual sessions:
              </Typography>
            </Grid>
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.detailedSessionContainer}>
                <DatePicker
                    label="Choose a day"
                    value={date}
                    onChange={chooseDate}
                    disableFuture
                    animateYearScrolling
                    shouldDisableDate={disableDate}
                />
              </Grid>
              <br />
              { date ? (

                  <> 
                      <Grid>
                        <Session sessionDetails={getLogsByDate(date)} />
                      </Grid>
                  </>

                ) : (

                  <>
                    <Typography component="h1" variant="h5" align="center"> 
                      Please choose an date from your past records!
                    </Typography>
                  </>

                )
              
              }
            </MuiPickersUtilsProvider>
          </>

        )

      }
    </>
    
  );

}