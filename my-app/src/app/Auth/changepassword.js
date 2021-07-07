import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import useStyles from './styles';
import Input from './input';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const PasswordReset = () => {

    const classes = useStyles();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSumbit = async () => {

        if (user.result.password) {
            if(!password) {
                alert("Password must be at least 6 characters.");
            } else if(password.length < 6) {
                alert("Password must be at least 6 characters.");
            
            } else if(!newPassword) {
                alert("Password must be at least 6 characters.");
            
            } else if(newPassword.length < 6) {
                alert("Password must be at least 6 characters.");

            } else if(password !== confirmPassword) {
                alert("Password did not match.");
            
            } else if(password === newPassword) {
                alert("New password must not match with old password.");
            } else {

                try {

                    let res;
                    if (user.result.password) {
        
                        res = await axios.post('http://localhost:5000/users/changepassword', {password: password, newPassword, email: user.result.email}, {
                        })
                    } else {
                        res = await axios.post('http://localhost:5000/users/setpassword', {password: password, email: user.result.email}, {
                        })
                    }
                    
                    if (res.data.message === "Invalid Password") {
        
                        alert(res.data.message);
        
                    } else {
        
                        localStorage.setItem('profile', JSON.stringify({result: res.data.user}));
                        alert(res.data.message);
                        history.push('/rooms');
        
                    }
            
                } catch (err) {
                    
                }

            }

        }

        if (!user.result.password) {

            if(!password) {
                alert("Password must be at least 6 characters.");

            } else if(password.length < 6) {
                alert("Password must be at least 6 characters.");

            } else if(password !== confirmPassword) {
                alert("Password did not match.");
            
            } else if(password === newPassword) {
                alert("New password must not match with old password.");
            } else {

                try {

                    let res;
                    if (user.result.password) {
        
                        res = await axios.post('http://localhost:5000/users/changepassword', {password: password, newPassword, email: user.result.email}, {
                        })
                    } else {
                        res = await axios.post('http://localhost:5000/users/setpassword', {password: password, email: user.result.email}, {
                        })
                    }
                    
                    if (res.data.message === "Invalid Password") {
        
                        alert(res.data.message);
        
                    } else {
        
                        localStorage.setItem('profile', JSON.stringify({result: res.data.user}));
                        alert(res.data.message);
                        history.push('/rooms');
        
                    }
            
                } catch (err) {
        
                }
                
            }
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                <br />

                <Typography component="h1" variant="h5">Change Password:</Typography>
                <br />
                {!user.result.password ? (
                    <>
                    <Grid container spacing={2}>
                    <br />
                    <Grid className={classes.textContainer}>
                        <Typography  variant="subtitle2" align="center">
                            You have not created a password for your current account
                        </Typography>
                        <Typography  variant="subtitle2" align="center">
                            Please create a new password below:
                        </Typography>
                    </Grid>
                    <br/>   
                    <Input name="password" label="Password" value={password} handleChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    <Input name="confirmPassword" label="Repeat Password" value={confirmPassword} handleChange={e => setConfirmPassword(e.target.value)} type="password" />
                    </Grid>
                    </>
                ):(
                    <>
                    <Grid container spacing={2}>
                    <br />
                    <Input name="password" label="Password" value={password} handleChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    <Input name="confirmPassword" label="Repeat Password" value={confirmPassword} handleChange={e => setConfirmPassword(e.target.value)} type="password" />
                    <Input name="newPassword" label="New Password" value={newPassword} handleChange={e => setNewPassword(e.target.value)} type="password" />
                    </Grid>
                    </>

                )}
                <br />
                <Button onClick={handleSumbit} fullWidth variant="contained" color="primary" className={classes.submit} endIcon={<ArrowForwardIosIcon />}>
                    Change Password
                </Button>
            </Paper>
            </Container>
    );
}


export default PasswordReset;
;