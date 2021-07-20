import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import { v1 as uuid } from "uuid";

import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

import { Card, Button } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import './styles.css';
import useStyles from './chatroomstyles';
import { fetchRooms } from '../../roomsslice';

let socket;
const ENDPOINT = 'https://team-eleven-backend.herokuapp.com'


function Chatroom( { roomDetails } ) {

    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    let guestId;
    const roomStatus = useSelector((state) => state.rooms.status);
    const [users, setUsers] = useState('');
    const [messageText, setMessageText] = useState([]);
    const [messages, setMessages] = useState([]);
    const [muteChat, setMuteChat] = useState(false);

    var connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", 
        "timeout" : 10000,                  
        "transports" : ["websocket"]
    };

    useEffect(() => {

        if (roomStatus === 'idle') {

            dispatch(fetchRooms());
        }

    }, [roomStatus, dispatch]);

    useEffect(() => {

        const { room } = queryString.parse(location.search);

        socket = io(ENDPOINT, connectionOptions);

        if (user) {

            
            socket.emit('join chat', { userid: user.result._id, name: user.result.name, room} , (error) => {
                if(error) {
                    alert(error);
                }
            });

        }

        if (!user) {

            // eslint-disable-next-line
            guestId = uuid();
            socket.emit('join chat', { userid: guestId, name: 'Guest', room} , (error) => {
                if(error) {
                    alert(error);
                }
            });

        }

        

        return () => {
            socket.disconnect();

            socket.off();
        }

    }, [ENDPOINT, location.search]);


    useEffect(() => {

        socket.on('message', (message) => {
            
            setMessages(messages => [ ...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, []);

    /*
     * Sends the message in the input box to the backend server
     * 
     * @param {Event} event event when send button is clicked
     * 
     */
    const sendMessage = (event) => {
        event.preventDefault();

        if (messageText) {
            socket.emit('sendMessage', messageText, () => setMessageText(''));
        }
    }

    /*
     * Toggles whether chat is muted
     * 
     */
    const toggleMuteChat = () => {

        setMuteChat(!muteChat);

    }
        
    return (

            <>
            <Card className={classes.container}>
                <InfoBar room={roomDetails}/>
                <Messages messages={messages} name={user? user.result.name : 'Guest'} muteChat={muteChat}/>
                <Input messageText={messageText} setMessageText={setMessageText} sendMessage={sendMessage} />
                <br />
                <TextContainer users={users} />
                <br />
                {muteChat? (
                    <Button
                    color="primary"
                    variant="contained"
                    endIcon={<VolumeOffIcon />}
                    onClick={toggleMuteChat}
                    >
                        Unmute Chat
                    </Button>

                ): (

                    <Button
                    color="primary"
                    variant="contained"
                    endIcon={<VolumeUpIcon />}
                    onClick={toggleMuteChat}
                    >
                        Mute Chat
                    </Button>

                )}
            </Card>
            </>
    )

}

export default Chatroom;
