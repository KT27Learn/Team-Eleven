import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import { Card, Grid, Avatar, Typography, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import Image from 'material-ui-image'

function Post({ post }) {

    const classes = useStyles();
    const history = useHistory();

    const [username, setUserName] = useState('');
    const creatorid = post.creatorid;
    const description = post.description;
    const imageurl = post.imageurl;
    const [avatarurl, setAvatarurl] = useState('');
    const [avatarImageStatus, setAvatarImageStatus] = useState(false);
    
    useEffect(() => {

        async function fetchAvatarImage() {
            try {

                const result = await axios.get(`http://localhost:5000/users/${creatorid}`);
                setUserName(result.data.name);
                setAvatarurl(result.data.imageurl);
                setAvatarImageStatus(true);

            } catch(error) {
                console.log(error);
            }
        }

        fetchAvatarImage();
        // eslint-disable-next-line
    }, []);

    function navigateUserProfile() {

        history.push(`/discoverprofile/${creatorid}`);
    }

    return (   
        <>
            {avatarImageStatus ? (
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
                    <br />
                </>
            ) : ( 
                <CircularProgress />
            )}
        </>
    )
}

export default Post;
