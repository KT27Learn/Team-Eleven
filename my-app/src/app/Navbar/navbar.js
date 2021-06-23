import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button, Tabs, Tab, Menu, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { logout } from '../Auth/authSlice';
import elevenlogo from '../../Eleven-Logo-final.png';


const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const navLogOut = () => {

      dispatch(logout());
      setAnchorEl(null);
      window.location = '/';
      setUser(null);

    }

    useEffect(() => {
      const token = user?.token;

      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const StyledTabs = withStyles({
      indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
          maxWidth: 30,
          width: '100%',
          backgroundColor: '#ffffff',
        },
      },
    })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
    
    const StyledTab = withStyles((theme) => ({
      root: {
        textTransform: 'none',
        color: '#000000',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
          opacity: 1,
        },
      },
    }))((props) => <Tab disableRipple {...props} />);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        
    };

    const enterProfile = () => {

      setAnchorEl(null);
      history.push('/profile');
      
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Eleven</Typography>
            <img className={classes.image} src={elevenlogo} alt="icon"   height="120" />
          </div>
          <div >
            <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs">
              <StyledTab label="Rooms" containerElement={<Link to="/"/>} />
              <StyledTab label="Library" containerElement={<Link to="/library"/>} />
            </StyledTabs>
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
                  <MenuItem onClick={navLogOut}>Logout</MenuItem>
                </Menu>
                
              </div>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
    );
}


export default Navbar;