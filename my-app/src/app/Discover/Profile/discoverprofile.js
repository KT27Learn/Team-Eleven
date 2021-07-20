import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { selectUserProfile,fetchUserProfile } from '../discoverslice';
import { sendFriendRequest, removeFriendRequest } from '../../Auth/authSlice';

import { CircularProgress, Card, CardContent, Avatar, Button, Typography, Menu, MenuItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
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
    const profileDetails = useSelector(selectUserProfile);
    const profileStatus = useSelector((state) => state.discover.profilestatus);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {

        if (profileStatus === 'idle') {

            dispatch(fetchUserProfile({userid}));

        } 
        
        if (profileStatus === 'succeeded' && profileDetails.userid !== userid) {

            dispatch(fetchUserProfile({userid}));

        }

        // eslint-disable-next-line
    }, [profileStatus, dispatch])

    const sendRequest = async () => {

        try {

            const usersDetails = {

                senderid: user.result._id,
                sendername: user.result.name,
                receiverid: userid,
                receivername: profileDetails.name,
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
                receivername: profileDetails.name,
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
            {!(profileStatus === 'loading' || profileStatus === 'error' || profileStatus === 'idle') ? (
                <>
                    <Card classname={classes.profileCard}>
                        <CardContent className={classes.profileContent}>
                            <Avatar className={classes.purple} alt={profileDetails.name} src={profileDetails.imageurl} >{profileDetails.name.charAt(0)}</Avatar>
                            <Typography variant="h6" align="center">{profileDetails.name}</Typography>
                            <Typography variant="h6" align="center">Bio:</Typography>
                            {profileDetails.bio? (
                                <Typography variant="subtitle1" align="center">{profileDetails.bio}</Typography>
                            ): (
                                <Typography variant="subtitle1" align="center">No bio at the moment</Typography>
                            )}
                            <Grid
                                container
                                alignItems="center"
                                direction="column"
                            >
                                <br />
                                { user && 
                                 <>
                                   {((user.result._id !== userid) && (!checkFriendRequestStatus(user.result.friends)) && (!checkFriendRequestStatus(user.result.friendrequests))) &&
                                      <>
                                          <Button variant="contained" color="secondary" onClick={sendRequest} align="center">
                                              Add Friend
                                          </Button>
                                      </>
                                    }
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
                                </>
                            }
                        </Grid>
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
