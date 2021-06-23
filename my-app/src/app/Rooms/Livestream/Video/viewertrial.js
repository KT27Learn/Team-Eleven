import React, { useRef ,useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from "socket.io-client";
import queryString from 'query-string';

import { Typography, Container } from '@material-ui/core';

const config = {
    iceServers: [
        { 
          "urls": "stun:stun.l.google.com:19302",
        },
        // { 
        //   "urls": "turn:TURN_IP?transport=tcp",
        //   "username": "TURN_USERNAME",
        //   "credential": "TURN_CREDENTIALS"
        // }
    ]
};

const ENDPOINT = 'http://localhost:5000'

const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

export default function Viewer() {
    
    let peerConnection;
    const [roomID, setRoomID] = useState('');
    const location = useLocation();

    const socketRef = useRef();
    const streamVideo = useRef();

    useEffect(() => {

        const { room } = queryString.parse(location.search);
        setRoomID(room);
        socketRef.current = io(ENDPOINT, connectionOptions);

        socketRef.current.on("offer", (id, description) => {
            peerConnection = new RTCPeerConnection(config);
            peerConnection
              .setRemoteDescription(description)
              .then(() => peerConnection.createAnswer())
              .then(sdp => peerConnection.setLocalDescription(sdp))
              .then(() => {
                socketRef.current.emit("answer", id, peerConnection.localDescription);
              });
            peerConnection.ontrack = event => {
                streamVideo.current.srcObject = event.streams[0];
            };
            peerConnection.onicecandidate = event => {
              if (event.candidate) {
                socketRef.current.emit("candidate", id, event.candidate);
              }
            };
        });
          

        socketRef.current.on("candidate", (id, candidate) => {
            peerConnection
              .addIceCandidate(new RTCIceCandidate(candidate))
              .catch(e => console.error(e));
        });
          
        socketRef.current.on("connect", () => {
            socketRef.current.emit("watcher", room);
        });
          
        socketRef.current.on("broadcaster", () => {
            socketRef.current.emit("watcher", room);
        });
          
        window.onunload = window.onbeforeunload = () => {
            socketRef.current.close();
            peerConnection.close();
        };

    })


    return (
        <>
        <Container>
            <video muted ref={streamVideo} autoPlay playsInline /> 
            <Typography variant='h6'>
                 Number of people in the room: 
            </Typography>
        </Container>
        </>
    )



}
