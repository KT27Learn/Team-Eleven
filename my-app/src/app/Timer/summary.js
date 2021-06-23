import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography, Avatar, Container, Card, CardContent } from '@material-ui/core';
import useStyles from './styles';

function Summary() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [session, setSession] = useState(JSON.parse(localStorage.getItem('prevStudySession')));
    
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            {user ? (
                <>
                <Card classname={classes.profileCard}>
                    <CardContent className={classes.profileContent}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                        <Typography  variant="h3" align="center">{user.result.name}</Typography>
                        <Typography  variant="h5" align="center">Congrats on logging in a study session!</Typography>
                        <Typography  variant="h5" align="center">Here are your stats: </Typography>
                        <Typography  variant="h6" align="center">Cumulative Study Hours: {session.session.cumulatedtime} seconds</Typography>
                        <Typography  variant="h6" align="center">Tasks that you have finished!</Typography>
                        {session.session.tasks.filter((task) => task.isComplete).map((task) => (
                            <Typography  variant="h5" align="center">{task.description}</Typography>
                        ))}
                        <Typography  variant="h6" align="center">Task you have yet to complete: </Typography>
                        {session.session.tasks.filter((task) => !task.isComplete).map((task) => (
                            <Typography  variant="h5" align="center">{task.description}</Typography>
                        ))}
                        <br></br>
                    </CardContent>
                </Card>
                </>
            ) : (
                <Card classname={classes.profileCard}>
                <CardContent className={classes.profileContent}>
                    <Typography  variant="h3" align="center">John Doe</Typography>
                    <Typography  variant="h5" align="center">Congrats on finishing a study session!</Typography>
                    <Typography  variant="h5" align="center">Please Log In the next time to sync your stats to your account!</Typography>
                    <Typography  variant="h5" align="center">Here are your stats: </Typography>
                    <Typography  variant="h6" align="center">Cumulative Study Hours: {session.cumulatedtime} seconds</Typography>
                    <Typography  variant="h6" align="center">Tasks that you have finished! </Typography>
                    {session.tasks.filter((task) => task.isComplete).map((task) => (
                        <Typography  variant="h5" align="center">{task.description}</Typography>
                    ))}
                    <Typography  variant="h6" align="center">Task you have yet to complete: </Typography>
                    {session.tasks.filter((task) => !task.isComplete).map((task) => (
                        <Typography  variant="h5" align="center">{task.description}</Typography>
                    ))}
                    <br></br>
                </CardContent>
            </Card>
            )}
        </Container>

    );
}


export default Summary;