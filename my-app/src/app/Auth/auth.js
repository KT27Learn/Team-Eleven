import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';   
import { useDispatch } from 'react-redux'

import useStyles from './styles';
import Input from './input';
import Icon from './icon';
import { signup, signin, googleSignIn } from './authSlice';


import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword:''};

const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const history = useHistory();

    /*
     * Saves any input in the form with their corresponding variables above
     *
     * @param {Event} e event when user changes any of the form data
     *
     */
    const handleChange = (e) => {

        setFormData( { ...formData, [e.target.name]: e.target.value } );

    }

    /*
     * Dispatches the user details to our backend according to whether
     * the user is signing up or logging in
     * 
     * @param {Event} e event when user submits a form
     *
     */
    const handleSubmit = (e) => {
        
        e.preventDefault();
        
        if (isSignup) {

            dispatch(signup(formData, history));

        } else {

            dispatch(signin(formData, history))
        
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

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <br />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <br />
                <br />
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
                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
            </Container>
    );
}


export default Auth;