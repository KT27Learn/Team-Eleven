import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { addNewPost } from './discoverslice';
import useStyles from './styles'
import Image from 'material-ui-image';

import { TextField, Button, Typography, Grid } from '@material-ui/core';

function CreateRoom() {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [description, setDescription] = useState('');
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

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
            uploadPost(reader.result);
        };
        reader.onerror = () => {
            alert('Something went wrong!');
        };
    };

    const uploadPost = async (base64EncodedImage) => {

        try {

            const newPost = {
                username: user.result.name,
                creatorid: user.result._id,
                description,
                imageurl: base64EncodedImage,
                avatarurl: user.result.imageUrl,
                
            }
            dispatch(addNewPost(newPost));
            setFileInputState('');
            setPreviewSource('');
            alert('Post uploaded successfully!');
            history.push('/discover');

        } catch (err) {
            alert('Something went wrong!');
        }


    }

    const cancelImageUpload = () => {

        setFileInputState('');
        setPreviewSource('');

    }

    /*
     * Creates a new study room and dispatches the details to
     * backend server to be saved into the database
     * 
     * @async
     * 
     */
    const createPost = async () => {

        try {

            const newPost = {
                username: user.result.name,
                creatorid: user.result._id,
                description,
                avatarurl: user.result.imageUrl,
                
            }
            dispatch(addNewPost(newPost));
            alert('Post uploaded successfully!');
            history.push('/discover')

        } catch (err) {
            alert('Something went wrong!');
        }

    }

    return (
            <>

            <form onSubmit={handleSubmitFile}>
                <br />
                <Grid className={classes.descriptionBox}> 
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={5}
                        value={description}
                        onChange={ e => setDescription(e.target.value)}
                        defaultValue="Enter your posts contents"
                        variant="outlined"
                    />
                </Grid>
                <br />
                {previewSource ? (
                    <>
                        <Grid container className={classes.imageContainer}>
                            <Grid className={classes.imageUploaded}>
                                <Typography  variant="h6" align="center">New Profile Picture:</Typography>
                                <Image
                                    src={previewSource}
                                    className={classes.uploadedImage}
                                />
                            </Grid>
                            <Grid>
                                <Button variant="contained" color="secondary" component="span" onClick={cancelImageUpload}>
                                    Remove Image 
                                </Button>
                                <Button variant="contained" color="primary" component="span" onClick={handleSubmitFile}>
                                    Upload Post
                                </Button>
                            </Grid>
                        </Grid>
                    </>

                ) : (
                    <>
                    </>
                )}
                <br />
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
                            Upload Picture
                        </Button>
                    </label>
                    </>
                }
                <br />
                <br />      
                {!previewSource &&
                <>
                    <Button variant="contained" color="secondary" onClick={createPost}>
                        Upload Post 
                    </Button>
                    </>
                }   
            </form>
            </>

    )

}

export default CreateRoom;