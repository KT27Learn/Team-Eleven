import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Card, Grid, Button, Avatar, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import { deletePost } from '../discoverslice';
import useStyles from './styles';
import Image from 'material-ui-image';
import DeleteIcon from '@material-ui/icons/Delete';

function Post({ post }) {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    const username = post.username;
    const creatorid = post.creatorid;
    const description = post.description;
    const [avatarurl, setAvatarurl] = useState('');
    const imageurl = post.imageurl;
    const [deleteDialog, setDeleteDialog] = useState(false);

    useEffect(() => {

        async function fetchUserDetails() {

            try {
        
                const result = await axios.get(`https://team-eleven-backend-da7fbaef930b.herokuapp.com/users/${post.creatorid}`);
                setAvatarurl(result.data.imageurl);
    
            } catch(error) {
                console.log(error);
            }

        }

        fetchUserDetails();

        // eslint-disable-next-line
    }, [])

    function navigateUserProfile() {

        history.push(`/discoverprofile/${creatorid}`);
    }

    function toggleDeleteDialogOpen() {

        setDeleteDialog(true);

    }

    function toggleDeleteDialogClose() {

        setDeleteDialog(false);

    }

    function confirmDeletePost() {

        const postDetails = {
            postid: post._id,
        }
        dispatch(deletePost(postDetails));
        toggleDeleteDialogClose()

    }

    return (   
        <>

                    <Card className={classes.roomContainer}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid className={classes.profileDetails}>
                                <Avatar className={classes.purple} alt={username} src={avatarurl} onClick={navigateUserProfile}>{username.charAt(0)}</Avatar>
                                <Typography className={classes.username} component="subtitle2" variant="subtitle2" onClick={navigateUserProfile}>
                                    {username}
                                </Typography>
                                {user &&
                                    <>
                                        {user.result._id === creatorid && 
                                            <>
                                                <IconButton onClick={toggleDeleteDialogOpen}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        }
                                    </>
                                }
                            </Grid>
                            <Grid>
                                <Typography variant="h6" color="textSecondary">
                                    {description}
                                </Typography>
                                {imageurl && 
                                    <>
                                    <Image src={imageurl}/>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Card>
                    <Dialog
                        open={deleteDialog}
                        onClose={toggleDeleteDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this post?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Once deleted post will not be recoverable
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={toggleDeleteDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDeletePost} color="primary" autoFocus>
                            Confirm
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <br />
        </>
    )
}

export default Post;

