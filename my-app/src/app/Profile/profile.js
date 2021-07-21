import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import FavouriteMethods from './favouritemethods';
import { selectAllPastLogs, fetchSessions } from './profileslice';
import { updateProfilePicture, updateBio, updateUsername } from '../Auth/authSlice';

import { Typography, Avatar, Button, Card, CardContent, TextField, Grid ,CircularProgress, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import EditIcon from '@material-ui/icons/Edit';

function Profile() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));
    const historyStatus = useSelector((state) => state.profile.status);
    const historyList = useSelector(selectAllPastLogs);

    const [name, setName] = useState(user.result.name);
    const [newName, setNewName] = useState(user.result.name);
    const [bio, setBio] = useState(user.result.bio);
    const [newBio, setNewBio] = useState(user.result.bio);
    const [hours, setHours] = useState(0)
    const [minutes, setMintues] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [methodFrequency] = useState([]);
    const [frequencyListContents] = useState([]);
    const [mostFrequentMethods, setMostFrequentMethods] = useState([]);
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [open, setOpen] = useState(false);
    const [bioOpen, setBioOpen] = useState(false);

    useEffect(() => {

        if (historyStatus === 'idle') {
          dispatch(fetchSessions({ userid : user.result._id}));
        }

        if (historyStatus === 'succeeded') {
            calculateStats(historyList.session);
        }
        
        // eslint-disable-next-line
      }, [historyStatus, dispatch]);

    /*
     * Calculates the cumulated time from past study sessions
     *
     * @param {Array} arr array to sieve through
     * 
     */  
    const calculateStats = (arr) => {

        let totalTime = 0;
        //check most frequent methods
        if (arr) {

            for (let i = 0; i < arr.length; i++) {
                totalTime += arr[i].cumulatedtime;
    
                if (!frequencyListContents) {
    
                    frequencyListContents.push(arr[i].studymethod);
                    methodFrequency[0] = 1;
    
                } else {
    
                    let newMethod = true;
                    for (let k = 0; k < frequencyListContents.length; k++) {
                        
                        if (frequencyListContents[k] === arr[i].studymethod) {
    
                            methodFrequency[k] = methodFrequency[k] + 1;
                            newMethod = false;
                            break;
    
                        }
    
                    }
    
                    if (newMethod) {
    
                        frequencyListContents.push(arr[i].studymethod);
                        methodFrequency[frequencyListContents.length - 1] = 1;
                        
    
                    }
    
                }
    
            }
    
            let highestFrequency = 0;
            let tiedMethods = [];
            
            for (let j = 0; j < frequencyListContents.length; j++) {

                if (methodFrequency[j] > highestFrequency) {

                    highestFrequency = methodFrequency[j];
                    tiedMethods = [{ name: frequencyListContents[j], frequency: methodFrequency[j]}];

                } else if (methodFrequency[j] === highestFrequency) {

                    tiedMethods.push({ name: frequencyListContents[j], frequency: methodFrequency[j]})
                    
                }
                
            }

            if (tiedMethods) {

                setMostFrequentMethods([ ...tiedMethods ]);

            }

        }

        for (let i = 0; i < arr.length; i++) {
            totalTime += arr[i].cumulatedtime;
        }
        
        const displayHours = Math.floor(totalTime / 216000);
        setHours(displayHours);
        const tempMinutes = totalTime % 216000;
        const displayMinutes = Math.floor(tempMinutes / 3600);
        setMintues(displayMinutes);
        const displaySeconds = tempMinutes % 3600;
        setSeconds(displaySeconds);

    }

    const getPercentage = (number) => {

        const result = Math.floor((number/ historyList.session.length) * 100)
        return result;
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = () => {
        
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImageNow(reader.result);
        };
        reader.onerror = () => {
            alert('Something went wrong!');
        };
    };

    const uploadImageNow = async (base64EncodedImage) => {

        try {

            dispatch(updateProfilePicture({fileStr: base64EncodedImage, email: user.result.email}));
            setFileInputState('');
            setPreviewSource('');
            alert('Image uploaded successfully');

        } catch (err) {
            alert('Something went wrong!');
        }


    }

    const cancelUpload = () => {

        setFileInputState('');
        setPreviewSource('');

    }

    const saveBioChanges = () => {
        
        dispatch(updateBio({ updatedBio: newBio, email: user.result.email }));
        setBio(newBio);
        setBioOpen(false);
    }

    const changePassword = () => {

        history.push('/changepassword');

    }

    const changeUsername = () => {
        dispatch(updateUsername({ userid: user.result._id, newname: newName  }));
        setOpen(false);
        setName(newName);

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBioClickOpen = () => {
        setBioOpen(true);
    };

    const handleBioClose = () => {
        setBioOpen(false);
    };

    return (
        <>
            { historyStatus === 'succeeded' ? (
                <>
                <Card classname={classes.profileCard}>
                    <CardContent className={classes.profileContent}>
                        {previewSource ? (
                            <>
                                <Typography  variant="h6" align="center">New Profile Picture:</Typography>
                                <Avatar
                                    src={previewSource}
                                    alt="chosen"
                                    className={classes.purple}
                                />
                                <Button variant="contained" color="primary" component="span" onClick={handleSubmitFile}>
                                    Confirm Upload
                                </Button>
                                <Button variant="contained" color="secondary" component="span" onClick={cancelUpload}>
                                    Cancel
                                </Button>
                            </>

                        ) : (
                            <>
                                <Avatar className={classes.purple} alt={name} src={user.result.imageUrl} >{name.charAt(0)}</Avatar>
                            </>
                        )}
                        <form onSubmit={handleSubmitFile} className={classes.pictureForm}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                value={fileInputState}
                                onChange={handleFileInputChange}
                            />
                            { !previewSource && 
                                <>
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span" align="center" type="submit">
                                        Change Profile Picture 
                                    </Button>
                                </label>
                                </>
                            }
                        </form>
                        <br />
                        <Grid className={classes.changePassword}>
                            <Button variant="contained" color="primary" align="center" onClick={changePassword} endIcon={<EditIcon />}>
                                Change Password
                            </Button>
                        </Grid>
                        <br />
                        <Grid
                            container
                            alignItems="center"
                            direction="column" 
                        >
                            <Grid className={classes.usernameContainer}>
                                <Typography  variant="h6" align="center">{name}</Typography>
                                <IconButton onClick={handleClickOpen}>
                                    <CreateIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Typography  variant="h6" align="center">Email: {user.result.email}</Typography>
                        <Typography  variant="h6" align="center">Cumulative Study Hours:</Typography>
                        <Typography  variant="subtitle1" align="center">{hours < 10 ? "0" + hours : hours} hours: {minutes < 10 ? "0" + minutes: minutes} minutes: {seconds < 10 ? "0" + seconds : seconds} seconds</Typography>
                        {mostFrequentMethods && 
                            <>
                            <Typography  variant="h6" align="center">Most Frequent Study Methods:</Typography>
                            {mostFrequentMethods.length > 0 ? (
                                <>
                                    {mostFrequentMethods.map((method) => (
                                        <Typography  variant="subtitle1" align="center">{method.name} {getPercentage(method.frequency)}%</Typography>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Typography  variant="subtitle1" align="center">No study session logged yet</Typography>
                                </>

                            )}
                            </>
                        }
                        <br></br>
                        <br></br>
                    </CardContent>
                </Card>
                <br />
                    <FavouriteMethods />
                <br />
                <Card className={classes.bioCard}>
                    <CardContent >
                        <Typography  variant="h6" align="center">About Me:</Typography>
                            {bio? (
                                <>
                                    <Typography  variant="subtitle2" align="center">{bio}</Typography>
                                </>
                            ): (
                                <>
                                    <Typography  variant="subtitle2" align="center">No personalised bio yet </Typography>
                                </>
                            )}
                    </CardContent>
                    <Grid>
                        <Button variant="contained" color="primary" align="center" onClick={handleBioClickOpen}>
                            Edit Bio
                        </Button>
                    </Grid>
                    <br />
                </Card>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Username</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To change your username, please enter a new username below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Username"
                        type="email"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={changeUsername} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={bioOpen} onClose={handleBioClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Username</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To change your bio, please enter a new bio below.
                    </DialogContentText>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            label="New Bio"
                            defaultValue="New Bio"
                            align="center"
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleBioClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveBioChanges} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                
                </>
            ) : (
                <CircularProgress />
            )}
        </>

    );
}


export default Profile; 