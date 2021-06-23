import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { v1 as uuid } from "uuid";
import { unwrapResult } from '@reduxjs/toolkit'

import { TextField, Button } from '@material-ui/core';

import { addNewRoom, selectAllRooms } from './roomsslice';

function CreateRoom() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const roomList = useSelector(selectAllRooms);
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [studyMethod, setStudyMethod] = useState('');
    const [subject, setSubject] = useState('');

    const Create = async () => {

        try {

            const id = uuid();

            dispatch(addNewRoom({
                    username: user.result.name,
                    creatorid: id,
                    roomname: roomName,
                    description,
                    studymethod: studyMethod,
                    subject,
                })
            );


            history.push(`/stream?room=${id}`);

        } catch (error) {

            alert(error);

        }
        

    }

    return (
        <form onSubmit={Create}>
            <TextField required id="standard-required" label="Room Name" value={roomName} onChange={ e => setRoomName(e.target.value)}/>
            <br />
            <TextField required id="standard-required" label="Description" value={description} onChange={ e => setDescription(e.target.value)}/>
            <br />
            <TextField required id="standard-required" label="Study Method" value={studyMethod} onChange={ e => setStudyMethod(e.target.value)} />
            <br />
            <TextField required id="standard-required" label="Subject" value={subject} onChange={ e => setSubject(e.target.value)} />
            <br />
            <br />
            <Button variant="contained" color="secondary" type="submit">
                Create 
            </Button>
        </form>
    )

}

export default CreateRoom;