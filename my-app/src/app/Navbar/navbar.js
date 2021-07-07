import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as link, useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';
import { logout } from '../Auth/authSlice';
import elevenlogo from '../../assets/Eleven-Logo-final.png';

import { AppBar, Typography, Toolbar, Avatar, Button, Menu, MenuItem, Link } from '@material-ui/core';

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    /*
     * Ensures user profile is displayed in the navbar whenever page is changed
     */
    useEffect(() => {
      
      setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location])

    /*
     * Logs the current user out 
     */
    const navLogOut = () => {

      dispatch(logout());
      setAnchorEl(null);
      window.location = '/';
      setUser(null);

    }

    /*
     * Ensures user profile menu is displayed in the navbar whenever page is changed
     *
     * @param {Event} event event when user clicks on username in navbar
     * 
     */
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    /*
     * Ensures user profile menu closes when user clicks elsewhere
     */
    const handleClose = () => {

      setAnchorEl(null);
        
    };

    /*
     * Routes the current page to profile details
     */
    const enterProfile = () => {

      setAnchorEl(null);
      history.push('/profile');
      
    }

    const enterLogs = () => {

      setAnchorEl(null);
      history.push('/log');
      
    }

    /*
     * Routes the current page to login page
     */
    const routeToSignIn = () => {

      history.push('/auth')

    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer}>
            <Typography component={link} to="/" className={classes.heading} variant="h2" align="center">Eleven</Typography>
            <img className={classes.image} src={elevenlogo} alt="icon"   height="120" />
          </div>
          <div >
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                history.push('/');
              }}
            >
              Rooms
            </Link>
            <Link
              className={classes.link}
              component="button"
              variant="body2"
              onClick={() => {
                history.push('/library');
              }}
            >
              Library
            </Link>
          </div>
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                <Avatar  className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Button aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick}>
                  <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                </Button>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={enterProfile}>Profile</MenuItem>
                  <MenuItem onClick={enterLogs}>Past Logs</MenuItem>
                  <MenuItem onClick={navLogOut}>Logout</MenuItem>
                </Menu>
                
              </div>
            ) : (
              <Button onClick={routeToSignIn} variant="contained" color="primary">Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
    );
}


export default Navbar;