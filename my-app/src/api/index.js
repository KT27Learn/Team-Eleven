import axios from 'axios';

const API = axios.create({ baseURL: 'https://team-eleven-backend.herokuapp.com' });

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const googleSignIn = (googleData) => API.post('/users/googlesignin', googleData);
export const updateProfilePicture = (pictureDetails) => API.post('/users/uploadprofilepicture', pictureDetails);
export const updateBio = (newBio) => API.post('/users/updatebio', newBio);
export const fetchLibrary = () => API.get('/library/');
export const fetchRooms = () => API.get('/rooms/');
export const addRoom = (RoomDetails) => API.post('/rooms/add', RoomDetails);
export const deleteRoom = (RoomDetails) => API.post('/rooms/delete', RoomDetails);
export const fetchTimerById = (id) => API.get('/library/' + id);
export const logSession = (sessionDetails) => API.post('/session/log', sessionDetails);
export const fetchUserSession = (userDetails) => API.post('/session/past', userDetails);
export const fetchFavouritesLog = (userDetails) => API.post('/favourites/userlog', userDetails);
export const favouriteMethod = (studyMethodDetails) => API.post('/favourites/favourite', studyMethodDetails);
export const unfavouriteMethod = (studyMethodDetails) => API.post('/favourites/unfavourite', studyMethodDetails);
export const fetchPosts = () => API.get('/posts/');
export const addPost = (postDetails) => API.post('/posts/add', postDetails);
export const sendFriendRequest = (usersdetails) => API.post('/users/addfriend', usersdetails);
export const acceptFriendRequest = (usersdetails) => API.post('/users/acceptfriend', usersdetails);
export const removeFriend = (usersdetails) => API.post('/users/removefriend', usersdetails);
export const removeFriendRequest = (usersdetails) => API.post('/users/removerequest', usersdetails);
export const updateFriends = (userid) => API.post('/users/updatefriends', userid);
export const fetchUserProfile = (userid) => API.get(`/users/${userid.userid}`);