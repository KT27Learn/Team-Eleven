import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { favouriteMethod, unfavouriteMethod } from '../LibrarySlice';

import { Card, Grid, Button, Typography, IconButton } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


function StudyMethod( { method, favLog }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));
    const id = method._id;
    const studyMethodName = method.name;
    const description = method.description;

    /*
     * Dispatches the method to be favourited to our backend server
     *
     */
    const favouriteStudyMethod = () => {

        const studyMethodDetails = {

            userid: user?.result._id,
            googleId: user?.result.googleId,
            studymethodid: id ,
            studymethodname: studyMethodName ,
        }

        dispatch(favouriteMethod(studyMethodDetails));

    }

    /*
     * Dispatches the method to be unfavourited to our backend server
     *
     */
    const unfavouriteStudyMethod = () => {

        const studyMethodDetails = {
            userid: user?.result._id,
            studymethodid: method._id ,
        }

        dispatch(unfavouriteMethod(studyMethodDetails));

    }

    /*
     * Routes the page to the timer page
     *
     */
    const handleClick = () => {

        history.push('/timer/' + method._id);

    }

    /*
     * Checks whether study method is favourited by the current user
     *
     */
    const showFavourite = () => {

        if (!user) {

            return false; 

        } else {

           return favLog.filter(sm => sm.studymethodid === id).length > 0;

        }
    }
        
    return (   
        <> 
                <Card className={classes.methodContainer}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >   
                        <div className={classes.methodContent}>
                            <Typography component="h5" variant="h5">
                                {studyMethodName}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {description}
                            </Typography>
                        </div>
                        <div className={classes.methodButton}>
                            {showFavourite() && 
                                (
                                    <>
                                    <IconButton onClick={unfavouriteStudyMethod}>
                                        <FavoriteIcon />
                                    </IconButton>
                                    </>

                                ) 
                            }
                            {!showFavourite() &&
                                (
                                    <>
                                    <IconButton onClick={favouriteStudyMethod}>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                    </>
                                    
                                )
                            }

                            <Button variant="contained" color="default" endIcon={<PlayArrowIcon/>} onClick={handleClick} >
                                Start
                            </Button>
                        </div>
                        
                    </Grid>
                </Card>
            

        <br/>
        </>
    )
}

export default StudyMethod;
