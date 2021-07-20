import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios';

import useStyles from './styles';
import { sendFriendRequest, removeFriendRequest } from '../../Auth/authSlice';

import { CircularProgress, Card, CardContent, Avatar, Button, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

function DiscoverProfile({userid}) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    const [username, setUserName] = useState('');
    const [avatarurl, setAvatarurl] = useState('');
    const [userBio, setUserBio] = useState('');
    const [avatarImageStatus, setAvatarImageStatus] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {

        async function fetchAvatarImage() {
            try {

                const result = await axios.get(`http://localhost:5000/users/${userid}`);
                setUserName(result.data.name);
                setAvatarurl(result.data.imageurl);
                setUserBio(result.data.bio);
                setAvatarImageStatus(true);

            } catch(error) {
                console.log(error);
            }
        }

        fetchAvatarImage();
        // eslint-disable-next-line
    }, []);

    const sendRequest = async () => {

        try {

            const usersDetails = {

                senderid: user.result._id,
                sendername: user.result.name,
                receiverid: userid,
                receivername: username,
            }
            dispatch(sendFriendRequest(usersDetails));

        } catch(err) {

        }

    }

    function checkFriendRequestStatus(list) {
        if (list) {
            const result = list.filter(friend => friend.friendid === userid);

            if (result.length > 0) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

    };

    async function remFriend() {

        try {

            const usersDetails = {

                senderid: user.result._id,
                sendername: user.result.name,
                receiverid: userid,
                receivername: username,
            }
            dispatch(removeFriendRequest(usersDetails));

        } catch(err) {

        }

    };

    const handleClick = (event) => {
        
        setAnchorEl(event.currentTarget);
    
    };
    
    const handleClose = () => {
        
        setAnchorEl(null);
    
    };

    return (
        <>
            {avatarImageStatus ? (
                <>
                    <Card classname={classes.profileCard}>
                        <CardContent className={classes.profileContent}>
                            <Avatar className={classes.purple} alt={username} src={avatarurl} >{username.charAt(0)}</Avatar>
                            <Typography variant="h6" align="center">{username}</Typography>
                            <Typography variant="h6" align="center">Bio:</Typography>
                            {userBio? (
                                <Typography variant="subtitle1" align="center">{userBio}</Typography>
                            ): (
                                <Typography variant="subtitle1" align="center">No bio at the moment</Typography>
                            )}
                            <br />
                            {(user && (user.result._id !== userid) && !checkFriendRequestStatus(user.result.friends)) ? (
                                <>
                                    <Button variant="contained" color="secondary" onClick={sendRequest} align="center">
                                        Add Friend
                                    </Button>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            {checkFriendRequestStatus(user.result.friendrequests) && 
                                <>
                                    
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="contained"
                                        color="primary"
                                        align="center"
                                        onClick={handleClick}
                                        >
                                        Friend Request Sent
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <StyledMenuItem onClick={remFriend}>
                                        <ListItemIcon>
                                            <InboxIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Remove Friend Request" />
                                        </StyledMenuItem>
                                    </StyledMenu>
                                </>
                            }
                            {checkFriendRequestStatus(user.result.friends) && 
                                <>
                                    <Button variant="contained" color="secondary" disabled align="center">
                                        Current Friend
                                    </Button>
                                </>
                            }

                        </CardContent>
                    </Card>
                </>
            ) : (
                <>
                    <CircularProgress />
                </>
            )}
        </>
    )

}

export default DiscoverProfile
