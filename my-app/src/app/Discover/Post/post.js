import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Card, Grid, Avatar, Typography } from '@material-ui/core';
import useStyles from './styles';
import Image from 'material-ui-image'

function Post({ post }) {

    const classes = useStyles();
    const history = useHistory();

    const username = post.username;
    const creatorid = post.creatorid;
    const description = post.description;
    const [avatarurl, setAvatarurl] = useState('');
    const imageurl = post.imageurl;
    
    useEffect(() => {

        async function fetchUserDetails() {

            try {
        
                const result = await axios.get(`https://team-eleven-backend.herokuapp.com/users/${post.creatorid}`);
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
    )
}

export default Post;
