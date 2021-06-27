import React, { useRef ,useState ,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import io from "socket.io-client";
import queryString from 'query-string';

import { deleteRoom } from '../../roomsslice';
import useStyles from './styles';

import { Container, Button } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';

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

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [peerConnection] = useState([]);
    const [roomID, setRoomID] = useState('');
    const [muteStream, setMuteStream] = useState(false);
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

            if (peerConnections[id] && description) {

                peerConnections[id].setRemoteDescription(description);

            }
            
        });

        socketRef.current.on("candidate", (id, candidate) => {

            if (peerConnections[id]) {

                peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))

            }
            
        });

        socketRef.current.on("disconnectPeer", id => {
            
            if (peerConnection[id]) {
                peerConnections[id].close();
                delete peerConnections[id];
            }
            
        });

        return () => {
            if (userVideo.current) {
                // eslint-disable-next-line
                userVideo.current.srcObject.getTracks().forEach(track => {
                    track.stop();
                });
                socketRef.current.close();
            }
        }
        // eslint-disable-next-line
    }, []);

    /*
     * Ends the current livestream and emits to the backend to signal
     * the end of the livestream
     * 
     */
    const endStream = () => {
        const deletedRoom = { roomID };
        dispatch(deleteRoom( deletedRoom ));
        userVideo.current.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        socketRef.current.emit("end broadcast", roomID);
        history.push('/');

    }

    /*
     * Toggles whether audio is transmitted to the rest of the viewers
     * 
     */
    const toggleAudio = () => {

        setMuteStream(!muteStream);
        userVideo.current.srcObject.getAudioTracks()[0].enabled =
        !(userVideo.current.srcObject.getAudioTracks()[0].enabled)

    }
    

    return (
        <>
        <Container>
            <video muted ref={userVideo} autoPlay playsInline /> 
            <br />
            <br />
            <Button
                color="secondary"
                variant="contained"
                endIcon={<DeleteIcon />}
                onClick={endStream}
            >
                End Stream
            </Button>
            { muteStream ? (

                <>
                    <Button
                        className={classes.streamerMuteAudioButton}
                        color="secondary"
                        variant="contained"
                        endIcon={<VolumeUpIcon />}
                        onClick={toggleAudio}
                    >
                        Unmute Audio for Viewers
                    </Button>
                </>

            ): (

                <>
                    <Button
                        className={classes.streamerMuteAudioButton}
                        color="secondary"
                        variant="contained"
                        endIcon={<VolumeOffIcon />}
                        onClick={toggleAudio}
                    >
                        Mute Audio for Viewers
                    </Button>
                </>

            )}
            
        </Container>
        </>
    )

}