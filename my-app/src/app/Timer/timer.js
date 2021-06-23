import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import alarm from "../../timer-alarm.mp3";

import TaskManager from './taskbar';
import useStyles from './styles';
import { selectMethodById } from '../Library/LibrarySlice';
import { logNewSession, localPrevSession } from './timerslice';

import { IconButton, Button, Typography, Card, CardContent } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import BookIcon from '@material-ui/icons/Book';
import { Checkbox } from '@material-ui/core';

function Timer( { match } ) {
  
  const id = match.params.id;
  const timerDetails = useSelector((state) => selectMethodById(state, id));
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [over, setOver] = useState(false);
  const [studyCycle, setStudyCycle] = useState(true);
  const [pause, setPause] = useState(true);
  const [[m, s], setTime] = useState([timerDetails.studytime, 0]);
  //cumulated study time
  const [cumulatedSeconds, setCumulatedSeconds] = useState(0);

  const tick = () => {
    if (pause || over) {

    } else {

      setCumulatedSeconds((prev) => prev + 1);

      if (m === 0 && s === 0) {

        setPause((prev) => !prev);
        new Audio(alarm).play();
        
        if (studyCycle) {
          
          setStudyCycle(false);
          setTime([timerDetails.breaktime, 0]);
          
        } else {
          setStudyCycle(true);
          setTime([timerDetails.studytime, 0]);
        }
  
      } else if (m === 0 && s === 0) {
        setTime([59, 59]);
      } else if (s == 0) {
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
  
  const handleClick = () => {
    setPause((prev) => !prev);
  };

  const onClickLogSession = () => {

    if (user) {

      //log cumulatedSeconds
      const session = {

        userid: user.result?._id,
        googleId: user.result?.googleId,
        studymethod: timerDetails.name,
        cumulatedtime: cumulatedSeconds,
        tasks: [ ...tasks ],
  
      }
      dispatch(logNewSession(session, history));

    } else {
      
      const session = {

        studymethod: timerDetails.name,
        cumulatedtime: cumulatedSeconds,
        tasks: [ ...tasks ],
      }

      //come up with generic summary
      dispatch(localPrevSession(session));
      history.push('/summary');

    }
    

  }

  function handleAddTask(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addTask(newTaskText);
  }

  function addTask(description) {
    const newTasks = [
      // the ... operator is called the spread operator
      // what we are doing is creating a brand new array of
      // tasks, that is different from the previous array
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      ...tasks,
      {
        description: description,
        isComplete: false
      }
    ];
    setTasks(newTasks);
    setNewTaskText('');
    console.log(newTasks);
  }

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    
    const newTasks = [ 
      // Once again, this is the spread operator
      ...tasks.slice(0, toToggleTaskIndex),
      {
        description: toToggleTask.description,
        isComplete: !toToggleTask.isComplete
      },
      ...tasks.slice(toToggleTaskIndex + 1)
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    setTasks(newTasks);
  }
  
  return (
    <div>
      <Card className={classes.rootCard}>
        <CardContent>
          {studyCycle ? (
          <>
          <Typography  variant="h4" align="center">{timerDetails.name}</Typography>
          <Typography  variant="h5" align="center">Time to Study!</Typography>
          </>

          ) : (

          <>
          <Typography  variant="h4" align="center">{timerDetails.name}</Typography>
          <Typography  variant="h5" align="center">Break Time!</Typography>
          </>

          )}
          <Typography  variant="h3" align="center">
            {`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
          </Typography>
          
          {pause ? (
              <>
              <IconButton className={classes.timerButton} onClick={handleClick}>
                  <PlayArrowIcon />
              </IconButton>

              </>
          ) :(
              <>
                  <IconButton className={classes.timerButton}  onClick={handleClick}>
                      <PauseIcon />
                  </IconButton>

          </>
          )
          }
        </CardContent>
      </Card>
      <div>
        <h2>Add Tasks</h2>
        <form onSubmit={handleAddTask}>
          <label>
            Task:
            <input
              style={{ margin: "0 1rem" }}
              type="text"
              value={newTaskText}
              // how do you know it's event.target.value? it just is.
              // search it up on MDN, and view react code samples
              // See: https://reactjs.org/docs/forms.html
              onChange={(event) => setNewTaskText(event.target.value)}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
      <div>
        <h2>Task List</h2>
        {tasks.length > 0 ? (
          <table style={{ margin: "0 auto", width: "100%" }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Task</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              // We should specify key here to help react identify
              // what has updated
              // https://reactjs.org/docs/lists-and-keys.html#keys
              <tr key={task.description}>
                <td>{index + 1}</td>
                <td>{task.description}</td>
                <td>
                  <Checkbox
                    onChange={() => handleTaskCompletionToggled(task, index)} 
                    checked={task.isComplete}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
   
    
  );
}

export default Timer;