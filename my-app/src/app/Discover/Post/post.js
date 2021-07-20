import React from 'react';
import { useHistory } from 'react-router-dom';

import { Card, Grid, Avatar, Typography } from '@material-ui/core';
import useStyles from './styles';
import Image from 'material-ui-image'

function Post({ post }) {

    const classes = useStyles();
    const history = useHistory();

    const username = post.username;
    const creatorid = post.creatorid;
    const description = post.description;
    const avatarurl = post.avatarurl;
    const imageurl = post.imageurl;

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
