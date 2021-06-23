import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

import './styles.css';

let socket;
const ENDPOINT = 'http://localhost:5000'

function Chatroom( ) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const [room, setRoom] = useState(''); 
    const [users, setUsers] = useState('');
    const [messageText, setMessageText] = useState([]);
    const [messages, setMessages] = useState([]);
    const location = useLocation();


    var connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", 
        "timeout" : 10000,                  
        "transports" : ["websocket"]
    };

    useEffect(() => {

        const { room } = queryString.parse(location.search);

        socket = io(ENDPOINT, connectionOptions);

        setRoom(room);  

        socket.emit('join', { userid: user.result._id, name: user.result.name, room} , (error) => {

            if(error) {
                alert(error);
            }

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {

        socket.on('message', (message) => {
            setMessages(messages => [ ... messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (messageText) {
            socket.emit('sendMessage', messageText, () => setMessageText(''));
        }
    }


    return (

        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={user.result.name} />
                <Input messageText={messageText} setMessageText={setMessageText} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )

}

export default Chatroom;