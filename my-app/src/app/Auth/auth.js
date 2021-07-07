import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';   
import { useDispatch } from 'react-redux'
import axios from 'axios';

import useStyles from './styles';
import Input from './input';
import Icon from './icon';
import { signup, signin, googleSignIn } from './authSlice';


import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const history = useHistory();

    /*
     * Dispatches the user details to our backend according to whether
     * the user is signing up or logging in
     * 
     * @param {Event} e event when user submits a form
     *
     */
    const handleSubmit = (e) => {
        
        e.preventDefault();

        const newUser = {firstName, lastName, email, password, confirmPassword};
        
        if (isSignup) {

            dispatch(signup(newUser, history));

        } else {

            dispatch(signin(newUser, history))
        
        }

    }
    
    /*
     * Switches the form between the sign up form and the login form
     *
     */
    const switchMode = () => {
        
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    /*
     * Dispatches the user details obtained from google authentication
     * to our backend server
     *
     * @async
     * @param {res} res response from the google authentication
     *
     */
    const googleSuccess = async (res) => {
        
        const newUser = { 
            name : res.profileObj.name,
            email: res.profileObj.email,
            googleId: res.profileObj.googleId,
            imageUrl: res.imageUrl,

        }

        dispatch(googleSignIn(newUser, history));
    
      };
    
    /*
     * Alerts the user that google authenticaion has failed
     *
     */
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    const handleReset = async () => {
        
        try {

            const res = await axios.post('http://localhost:5000/users/forgotpassword', {email})
            alert(res.data.message);
            history.push('/');

        } catch (err) {
            alert(err.response.data.message) 
        }

    }

    const setReset = () => {

        setIsResetPassword(!isResetPassword);

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                { isResetPassword ? (

                    <Typography component="h1" variant="h5">Reset Password</Typography>

                ) : (

                    <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>

                )
                }
                
                <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && !isResetPassword && (
                    <>
                    <Input name="firstName" label="First Name" value={firstName} handleChange={e => setFirstName(e.target.value)} autoFocus half />
                    <Input name="lastName" label="Last Name" value={lastName} handleChange={e => setLastName(e.target.value)} half />
                    </>
                    )}
                    <Input name="email" label="Email Address" value={email} handleChange={e => setEmail(e.target.value)} type="email" />
                    { !isResetPassword && <Input name="password" label="Password" value={password} handleChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />}
                 
                    { isSignup && !isResetPassword && <Input name="confirmPassword" label="Repeat Password" value={setConfirmPassword} handleChange={e => setConfirmPassword(e.target.value)} type="password" /> }
                </Grid>
                <br />
                {isResetPassword ? (
                    <>
                    <Button onClick={handleReset} fullWidth variant="contained" color="primary" className={classes.submit}>
                        Reset Password
                    </Button>
                    </>

                ) : (
                    <>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    </>
                )}
                <br />
                <br />
                {
                    !isResetPassword && 
                    <GoogleLogin
                        clientId="957735014776-mk5n07i08ounim5fqh3tnspv3dq2kp46.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                }
               
                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={setReset}>
                        { isResetPassword ? 'Return to sign in' : "Forgot your password?" }
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
            </Container>
    );
}


export default Auth;