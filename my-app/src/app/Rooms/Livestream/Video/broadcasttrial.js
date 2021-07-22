import React, { useRef , useState ,useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import io from "socket.io-client";
import queryString from 'query-string';

import { deleteRoom } from '../../roomsslice';
import useStyles from './styles';

import { Container, Button, Card, CardContent, Typography } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';

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

const ENDPOINT = 'https://team-eleven-backend.herokuapp.com'

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
    const [stopVideo, setStopVideo] = useState(false);
    const socketRef = useRef();
    const userVideo = useRef();
    
    useEffect(() => {
        const { room } = queryString.parse(location.search);
        setRoomID(room);
        socketRef.current = io(ENDPOINT, connectionOptions);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("create broadcaster", room);

        }).catch(error => {
            console.log(error);
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

        window.onunload = window.onbeforeunload = () => {
            socketRef.current.close();
            userVideo.current.srcObject.getTracks().forEach(track => {
                track.stop();
            });
            
        };

        /*return () => {
            // eslint-disable-next-line
            userVideo.current.getTracks().forEach(track => {
                track.stop();
            });
            socketRef.current.emit("broadcaster left", room);
            socketRef.current.close();
                
        }*/
        // eslint-disable-next-line
    }, []);

    useLayoutEffect(() => () => {
        
        userVideo.current.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        socketRef.current.emit("broadcaster left", roomID);
        socketRef.current.close();
        // eslint-disable-next-line
    }, [])

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
    
    const toggleVideo = async () => {

        setStopVideo(!stopVideo);
        if (stopVideo) {
          
          let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          userVideo.current.srcObject = stream;

        } else {
          
          userVideo.current.srcObject.getVideoTracks()[0].stop();
          
          
        }
        

    }
    

    return (
        <>
        <Container>
             {stopVideo ? (
                
                <>
                    <Card className={classes.videoCard}>
                        <CardContent className={classes.videoContent}>
                            <Typography className={classes.videoText} variant="h5" color="white">Camera turned off</Typography>
                        </CardContent>
                    </Card>

                </>

            ) : (

                <>
                    <video muted ref={userVideo} autoPlay playsInline /> 
                </>
            )}
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
                        Turn on Mic
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
                        Turn off Mic
                    </Button>
                </>

            )}
            {stopVideo ? (
                <>
                    <Button
                        className={classes.streamerMuteAudioButton}
                        color="secondary"
                        variant="contained"
                        endIcon={<VideocamIcon />}
                        onClick={toggleVideo}
                    >
                        Start Camera
                    </Button>
                </>

            ): (
                <>
                    <Button
                        className={classes.streamerMuteAudioButton}
                        color="secondary"
                        variant="contained"
                        endIcon={<VideocamOffIcon />}
                        onClick={toggleVideo}
                    >
                        Stop Camera
                    </Button>

                </>

            )}
            
        </Container>
        </>
    )

}
