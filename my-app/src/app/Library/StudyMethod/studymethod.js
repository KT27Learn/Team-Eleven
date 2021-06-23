import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { favouriteMethod, unfavouriteMethod, selectAllFavouriteStudyMethods } from '../LibrarySlice';

import { Card, CardContent, Grid, Button, Typography, IconButton, CircularProgress } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


function StudyMethod( { method, favLog }) {

    const user = JSON.parse(localStorage.getItem('profile'));
    //const fsm = JSON.parse(localStorage.getItem('favouriteStudyMethods'));

    //const fsm = useSelector(selectAllFavouriteStudyMethods);
    const classes = useStyles();
    const dispatch = useDispatch();
    const favouritesStatus = useSelector((state) => state.library.favouritesStatus);

    //const fsmLog = fsm.result.favouriteslog.filter(sm => sm.studymethodid === method._id);


    //const image = method.image;
    const id = method._id;
    const studyMethodName = method.name;
    const description = method.description;
    const history = useHistory();


    const favouriteStudyMethod = () => {

        const studyMethodDetails = {

            userid: user?.result._id,
            googleId: user?.result.googleId,
            studymethodid: id ,
            studymethodname: studyMethodName ,


        }

        dispatch(favouriteMethod(studyMethodDetails));

    }

    const unfavouriteStudyMethod = () => {

        const studyMethodDetails = {

            userid: user?.result._id,
            studymethodid: method._id ,
            

        }

        dispatch(unfavouriteMethod(studyMethodDetails));
        

    }

    const handleClick = () => {

        history.push('/timer/' + method._id);

    }

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
