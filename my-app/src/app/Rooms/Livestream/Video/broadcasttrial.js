import React, { useRef ,useState ,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from "socket.io-client";
import queryString from 'query-string';

import { Typography, Container } from '@material-ui/core';

const Video = ( {peer} ) => {
    const ref = useRef();

    useEffect(() => {
        peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video playsInline autoPlay ref={ref} />
    );
}

const peerConnections = {};
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

export default function Broadcast() {

    const [peerConnection, setPeerConnections] = useState([]);
    const [roomID, setRoomID] = useState('');
    const location = useLocation();

    const socketRef = useRef();
    const userVideo = useRef();

    useEffect(() => {
        const { room } = queryString.parse(location.search);
        setRoomID(room);
        socketRef.current = io(ENDPOINT, connectionOptions);
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("create broadcaster", room);

        });
        socketRef.current.on("watcher", id => {
            const peerConnection = new RTCPeerConnection(config);
            peerConnections[id] = peerConnection;

            let stream = userVideo.current.srcObject;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    socketRef.current.emit("candidate", id, event.candidate);
                }
            };

            peerConnection
                .createOffer()
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    socketRef.current.emit("offer", id, peerConnection.localDescription);
            });
        });

        socketRef.current.on("answer", (id, description) => {
            peerConnections[id].setRemoteDescription(description);
        });

        socketRef.current.on("candidate", (id, candidate) => {
            peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
        });

        socketRef.current.on("disconnectPeer", id => {
            peerConnections[id].close();
            delete peerConnections[id];
        });

        window.onunload = window.onbeforeunload = () => {
            socketRef.current.close();
        };

    }, []);

    

    return (
        <>
        <Container>
            <video muted ref={userVideo} autoPlay playsInline /> 
            <Typography variant='h6'>
                 Number of people in the room: {peerConnections.length}
            </Typography>
        </Container>
        </>
    )

}
