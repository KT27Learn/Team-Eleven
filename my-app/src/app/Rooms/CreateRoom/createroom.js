import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { v1 as uuid } from "uuid";

import { addNewRoom } from '../roomsslice';
import { fetchMethods, selectAllStudyMethods } from '../../Library/LibrarySlice';
import { selectAllRooms, fetchRooms } from '../roomsslice';
import useStyles from './styles'

import { TextField, Button, FormControl, MenuItem, InputLabel, Select, CircularProgress, Typography } from '@material-ui/core';

function CreateRoom() {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const libraryList = useSelector(selectAllStudyMethods);
    const libraryStatus = useSelector((state) => state.library.status);
    const roomlist = useSelector(selectAllRooms);
    const roomStatus = useSelector((state) => state.rooms.status);
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [studyMethod, setStudyMethod] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {

        if (libraryStatus === 'idle') {

            dispatch(fetchMethods());

        }

    }, [libraryStatus, dispatch]);

    useEffect(() => {
        if (roomStatus === 'idle') {
          dispatch(fetchRooms())
        }
    
    }, [roomStatus, dispatch])

    /*
     * Creates a new study room and dispatches the details to
     * backend server to be saved into the database
     * 
     * @async
     * 
     */
    const Create = async () => {

        try {
            const id = uuid();
            const roomAlrExist = roomlist.filter(room => room.userid === user.result._id);

            if (roomAlrExist.length > 0) {

                alert("Delete existing room before creating a new room!");
                history.push('/');

            } else {
                dispatch(addNewRoom({
                    username: user.result.name,
                    userid: user.result._id,
                    avatarurl: user.result.imageUrl,
                    creatorid: id,
                    roomname: roomName,
                    description,
                    bio: user.result.bio,
                    studymethod: studyMethod,
                    subject,
                    profileurl: user.result.imageUrl,
                    })
                );
                history.push(`/broadcaststream?room=${id}`);

            }
            

        } catch (error) {
            alert(error);
        }

    }
    
    /*
     * Choose a specific study method for the new study room
     * 
     * @param {Event} event event when user selects a studymethod from the select field
     * 
     */
    const chooseStudyMethod = (event) => {

        setStudyMethod(event.target.value);

    }

    return (
        <>
        { libraryStatus === 'idle' || roomStatus === 'idle' ? (

            <> 
            <CircularProgress />
            </>
            ) : (

            <>
            <Typography variant="h6">
                Create a new room:
            </Typography>
            <form onSubmit={Create}>
                <TextField required id="standard-required" label="Room Name" value={roomName} onChange={ e => setRoomName(e.target.value)}/>
                <br />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    value={description}
                    onChange={ e => setDescription(e.target.value)}
                    defaultValue="Enter the description of your room"
                    variant="outlined"
                />
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="choose-study-method-label">Study Method</InputLabel>
                    <Select 
                    required
                    labelId="choose-study-method-label"
                    id="choose-study-method"
                    value={studyMethod}
                    onChange={chooseStudyMethod}
                    >
                        {libraryList.map(studymethod => (
                        <MenuItem value={studymethod.name}> {studymethod.name} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <TextField required id="standard-required" label="Subject" value={subject} onChange={ e => setSubject(e.target.value)} />
                <br />
                <br />
                <Button variant="contained" color="secondary" type="submit">
                    Create 
                </Button>
            </form>
            </>

            )

        }
        </>
        
    )

}

export default CreateRoom;