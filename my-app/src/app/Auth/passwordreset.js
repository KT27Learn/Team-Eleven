import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import useStyles from './styles';
import Input from './input';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const PasswordReset = () => {

    const classes = useStyles();
    const history = useHistory();
    const { token } = useParams(); 

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSumbit = async () => {

        if (!password) {

            alert("Password must be at least 6 characters.");

        } else if(password.length < 6) 
            alert("Password must be at least 6 characters.");

        else if(password !== confirmPassword) {

            alert("Password did not match.");

        } else {

            try {

                const res = await axios.post('http://localhost:5000/users/resetpassword', {password: password, token}, {
                    headers: {Authorization: token}
                })
        
                alert(res.data.message);
    
                history.push('/rooms');
        
            } catch (err) {
    
                alert(err.data.message);
    
            }

        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Reset Password </Typography>
                <Grid container spacing={2}>
                <br />
                <Input name="password" label="Password" value={password} handleChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                <Input name="confirmPassword" label="Repeat Password" value={confirmPassword} handleChange={e => setConfirmPassword(e.target.value)} type="password" />
                </Grid>
                <br />
                <Button onClick={handleSumbit} fullWidth variant="contained" color="primary" className={classes.submit} endIcon={<ArrowForwardIosIcon />}>
                    Reset Password
                </Button>
            </Paper>
            </Container>
    );
}


export default PasswordReset;
;