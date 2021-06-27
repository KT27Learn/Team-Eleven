import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import alarm from "../../assets/timer-alarm.mp3";
import useStyles from './styles';
import { fetchMethods ,selectMethodById } from '../Library/LibrarySlice';
import { logNewSession, localPrevSession } from './timerslice';

import { IconButton, Button, TextField ,Typography, Card, CardActions, CardContent, Container, Checkbox } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import BookIcon from '@material-ui/icons/Book';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

function Timer( { match } ) {
  
  const id = match.params.id;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const libraryStatus = useSelector((state) => state.library.status);
  const timerDetails = useSelector((state) => selectMethodById(state, id));
  const [tasks, setTasks] = useState([]);
  const [timerName, setTimerName] = useState('');
  const [newTaskText, setNewTaskText] = useState("");
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [over] = useState(false);
  const [studyCycle, setStudyCycle] = useState(true);
  const [pause, setPause] = useState(true);
  const [studyTime, setStudyTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [[m, s], setTime] = useState([0, 0]);
  const [cumulatedSeconds, setCumulatedSeconds] = useState(0);

  useEffect(() => {

    if (libraryStatus === 'idle') {

      dispatch(fetchMethods());

    } else {
      if (timerDetails) {
        setTime([timerDetails.studytime, 0]);
        setTimerName(timerDetails.name);
        setBreakTime(timerDetails.breaktime);
        setStudyTime(timerDetails.studytime);

      }
    }

  // eslint-disable-next-line
  }, [libraryStatus, dispatch]);

  /*
   * Simulates one second of the timer and swaps the timer between
   * study period and break period if the current timer has run out
   * 
   */
  const tick = () => {
    if (pause || over) {

    } else {

      setCumulatedSeconds((prev) => prev + 1);

      if (m === 0 && s === 0) {

        setPause((prev) => !prev);
        new Audio(alarm).play();
        
        if (studyCycle) {
          
          setStudyCycle(false);
          setTime([breakTime, 0]);
          
        } else {
          setStudyCycle(true);
          setTime([studyTime, 0]);
        }
  
      } else if (m === 0 && s === 0) {
        setTime([59, 59]);
      } else if (s === 0) {
        setTime([ m - 1, 59]);
      } else {
        setTime([m, s - 1]);
      }

    }
    
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });
  
  /*
   * Pauses or starts the timer based off whether 
   * the pause or play button is pressed
   *
   */
  const handleClick = () => {
    setPause((prev) => !prev);
  };

  /*
   * Dispatches the current session logs to our backend
   * to be saved
   *
   */
  const onClickLogSession = () => {

    if (user) {

      //log cumulatedSeconds
      const session = {

        userid: user.result?._id,
        googleId: user.result?.googleId,
        studymethod: timerName,
        cumulatedtime: cumulatedSeconds,
        tasks: [ ...tasks ],
  
      }
      dispatch(logNewSession(session, history));

    } else {
      
      //come up with generic summary for guest user
      const session = {

        studymethod: timerName,
        cumulatedtime: cumulatedSeconds,
        tasks: [ ...tasks ],
      }

      dispatch(localPrevSession(session));
      history.push('/summary');

    }
    

  }
  
  /*
   * Adds the task entered into the new task text box into the current task list
   *
   * @param {String} description String description of the new task to be added
   * 
   */
  function addTask() {
    const newTasks = [
      ...tasks,
      {
        description: newTaskText,
        isComplete: false
      }
    ];
    setTasks(newTasks);
    setNewTaskText('');
  }

  /*
   * Deletes the selected task from the current tasks list
   *
   * @param {Number} index index of task to be removed from tasks array
   * 
   */
  const deleteTask = (index) => {
    const newTasks = [ 
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1)
    ];
    setTasks(newTasks);
  }

  /*
   * Toggles the completion status of a specified tasks
   *
   * @param {Object} toToggleTask event when user presses the add task button
   * @param {Number} toToggleTaskIndex event when user presses the add task button
   * 
   */
  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    
    const newTasks = [ 
      ...tasks.slice(0, toToggleTaskIndex),
      {
        description: toToggleTask.description,
        isComplete: !toToggleTask.isComplete
      },
      ...tasks.slice(toToggleTaskIndex + 1)
    ];

    setTasks(newTasks);
  }
  
  return (
    <Container className={classes.container}>
      <Card className={classes.rootCard}>
        <CardContent>
          {studyCycle ? (
          <>
            <Typography  variant="h4" align="center">{timerName}</Typography>
            <Typography  variant="h5" align="center">Time to Study!</Typography>
          </>
          ) : (
          <>
            <Typography  variant="h4" align="center">{timerName}</Typography>
            <Typography  variant="h5" align="center">Break Time!</Typography>
          </>
          )}
          <Typography  variant="h3" align="center">
            {`${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`}
          </Typography>
        </CardContent>
        <CardActions className={classes.timerButtons}>
          {pause ? (
              <>
              <IconButton align="center" onClick={handleClick}>
                  <PlayArrowIcon />
              </IconButton>

              </>
          ) :(
            <>
              <IconButton align="center" onClick={handleClick}>
                <PauseIcon />
              </IconButton>
            </>
          )
          }          
        </CardActions>
      </Card>
      <br />
      <div>
        <Typography variant="h4" align="center"> Add Tasks</Typography>
        <br />
        <TextField
          id="outlined-multiline-static"
          label="New Task Description"
          multiline
          rows={2}
          defaultValue="New Task Description"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          variant="outlined"
        />
        <IconButton onClick={addTask}>
          <AddIcon />
        </IconButton>
      </div>
      <br />
      <div>
        <Typography variant="h4" align="center">Task List</Typography>
        {tasks.length > 0 ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Completed</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index}</TableCell>
                    <TableCell align="center">{task.description}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                          onChange={() => handleTaskCompletionToggled(task, index)} 
                          checked={task.isComplete}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => deleteTask(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableContainer>
        ) : (
          <p>No tasks yet! Add one above!</p>
        )}
      </div>
       <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<BookIcon/>}
            onClick={onClickLogSession}
        >
            Log Session!
       </Button>
    </ Container>
   
    
  );
}

export default Timer;