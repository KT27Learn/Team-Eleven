import React, { useRef ,useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import io from "socket.io-client";
import queryString from 'query-string';

import useStyles from './styles';

import { Typography, Button, Card, CardContent } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

const ENDPOINT = 'https://team-eleven-backend.herokuapp.com'

const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

export default function Viewer() {
    
    let peerConnection;
    const [broadcastStatus, setBroadCastStatus] = useState(false);
    const [muteStream, setMuteStream] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const socketRef = useRef();
    const streamVideo = useRef();

    useEffect(() => {

        const { room } = queryString.parse(location.search);
        socketRef.current = io(ENDPOINT, connectionOptions);

        socketRef.current.on("offer", (id, description) => {
            setBroadCastStatus(true);
            // eslint-disable-next-line
            peerConnection = new RTCPeerConnection(config);
            peerConnection
              .setRemoteDescription(description)
              .then(() => peerConnection.createAnswer())
              .then(sdp => peerConnection.setLocalDescription(sdp))
              .then(() => {
                socketRef.current.emit("answer", id, peerConnection.localDescription);
              }).catch(err => console.log(err));
            peerConnection.ontrack = event => {
                if (event.streams[0]) {
                    streamVideo.current.srcObject = event.streams[0];
                }
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

        socketRef.current.on("broadcaster left", () => {
            alert("Broadcaster has left the room")
            setBroadCastStatus(false);
        });

        socketRef.current.on("end broadcast", () => {
            alert("Livestream has ended! Please join another room!")
            setBroadCastStatus(false);
        });
          
        window.onunload = window.onbeforeunload = () => {
            socketRef.current.close();
            peerConnection.close();
        };

    })

    /*
     * Leaves the current room and redirects user to the home page
     * 
     */
    const leaveRoom = () => {

        history.push('/');

    }

    /*
     * Toggles whether audio from the stream is played
     * 
     */
    const toggleAudio = () => {

        setMuteStream(!muteStream);
        streamVideo.current.srcObject.getAudioTracks()[0].enabled =
        !(streamVideo.current.srcObject.getAudioTracks()[0].enabled)

    }


    return (
        <>
        
            {broadcastStatus ? (
                <>
                    <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={leaveRoom}
                    >
                    Leave Room
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
                                Unmute Audio
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
                                Mute Audio
                            </Button>
                        </>

                    )}
                    <br />
                    <br />
                    <video muted={muteStream} ref={streamVideo} autoPlay playsInline /> 
                    
                </>
                

            ) : (
                <>
                    <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={leaveRoom}
                    >
                        Leave Room
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
                                Unmute Audio 
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
                                Mute Audio
                            </Button>
                        </>

                    )}
                    <br />
                    <br />
                    <Card className={classes.videoCard}>
                        <CardContent className={classes.videoContent}>
                            <Typography className={classes.videoText} variant="h5" color="white">No Livestream Feed Available</Typography>
                        </CardContent>
                    </Card>
                    
                </>

            )
            }
                
        
        </>
    )



}
