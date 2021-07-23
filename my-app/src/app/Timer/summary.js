import React, { useEffect, useState } from 'react';

import useStyles from './styles';

import { Typography, Avatar, Container, Grid } from '@material-ui/core';

function Summary() {

    const classes = useStyles();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [session] = useState(JSON.parse(localStorage.getItem('prevStudySession')));
    const [hours, setHours] = useState(0)
    const [minutes, setMintues] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        if (session) {
            if (user) {
                calculateTime(session.session.cumulatedtime);
            } else {
                calculateTime(session.cumulatedtime);
            }
        }
        
        // eslint-disable-next-line
    }, []);

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

    return (
        <Container className={classes.container}>
            {user ? (
                <>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar className={classes.purple} align="center" alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                    <Typography  variant="h3" align="center">{user.result.name}</Typography>
                    <Typography  variant="h5" align="center">Congrats on logging in a study session!</Typography>
                    <Typography  variant="h5" align="center">Here are your stats: </Typography>
                    <Typography  variant="h6" align="center">Cumulative Study Hours:</Typography>
                    <Typography  variant="subtitle1" align="center">{hours < 10 ? "0" + hours : hours} hours: {minutes < 10 ? "0" + minutes: minutes} minutes: {seconds < 10 ? "0" + seconds : seconds} seconds</Typography>
                    <Typography  variant="h6" align="center">Tasks that you have finished!</Typography>
                    {session.session.tasks.filter((task) => task.isComplete).map((task) => (
                        <Typography  variant="h5" align="center">{task.description}</Typography>
                    ))}
                    <Typography  variant="h6" align="center">Task you have yet to complete: </Typography>
                    {session.session.tasks.filter((task) => !task.isComplete).map((task) => (
                        <Typography  variant="h5" align="center">{task.description}</Typography>
                    ))}
                    <br />                  
                </Grid>
                </>
            ) : (
                <>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography  variant="h3" align="center">John Doe</Typography>
                    <Typography  variant="h5" align="center">Congrats on finishing a study session!</Typography>
                    <Typography  variant="h5" align="center">Please Log In the next time to sync your stats to your account!</Typography>
                    <Typography  variant="h5" align="center">Here are your stats: </Typography>
                    <Typography  variant="h6" align="center">Cumulative Study Hours: </Typography>
                    <Typography  variant="subtitle1" align="center">{hours < 10 ? "0" + hours : hours} hours: {minutes < 10 ? "0" + minutes: minutes} minutes: {seconds < 10 ? "0" + seconds : seconds} seconds</Typography>
                    <Typography  variant="h6" align="center">Tasks that you have finished! </Typography>
                    {session.tasks.filter((task) => task.isComplete).map((task) => (
                        <Typography  variant="h5" align="center">{task.description}</Typography>
                    ))}
                    <Typography  variant="h6" align="center">Task you have yet to complete: </Typography>
                    {session.tasks.filter((task) => !task.isComplete).map((task) => (
                        <Typography  variant="h5" align="center">{task.description}</Typography>
                    ))}
                    <br />
                </Grid>
                </>
            )}
        </Container>

    );
}


export default Summary;
