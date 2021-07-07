import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import useStyles from './styles';

import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const ActivateUser = () => {

    const classes = useStyles();
    const history = useHistory();
    const {activation_token} = useParams(); 

    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    await axios.post("http://localhost:5000/users/activate", {activation_token})
                    setSuccess(true)
                } catch (err) {
                    console.log(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    const handleSumbit = () => {

        history.push('/auth');

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Grid container spacing={2}>
                {success ? (
                    <>
                        <Typography component="h1" variant="h5">Email Authenticated</Typography>
                        <Button onClick={handleSumbit} fullWidth variant="contained" color="primary" className={classes.submit} endIcon={<ArrowForwardIosIcon />}>
                            Start Using Élèven!
                        </Button>
                    </>

                ) : (

                    <CircularProgress />

                )}
                
                </Grid>
                <br />
                
            </Paper>
            </Container>
    );
}


export default ActivateUser;