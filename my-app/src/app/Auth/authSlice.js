import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index'

const initialState = {
    authData: null,
    pastlogs: [],
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        state.authData = action?.data;
    },
    logout: (state) => {
      localStorage.clear();
      state.authData = null;
    },
    fetchPastSessionsLog: (state, action) => {
      localStorage.setItem('pastSessionsLog', JSON.stringify({ ...action?.payload }));
      state.authData = action?.data;
    }, 
    changeProfilePic: (state, action) => {

      if (state.authData) {

        state.authData.imageUrl = action?.payload.imageUrl;

      }
      
      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["imageUrl"] = action?.payload.imageUrl;
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
      window.location.reload();
    },
    updateSelfBio: (state, action) => {

      if (state.authData) {

        state.authData.bio = action?.payload.bio;

      }
      
      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["bio"] = action?.payload.bio;
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
    },
    updateFriendList: (state, action) => {

      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["friends"] = action?.payload.friends;
      args["result"]["friendrequests"] = action?.payload.friendrequests;
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
      window.location.reload();

    },
    updateRemovedFriend: (state, action) => {

      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["friends"] = action?.payload.friends;
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
      window.location.reload();

    },
    updateSendFriendRequest: (state, action) => {

      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["friendrequests"].push(action?.payload.friend);
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
      window.location.reload();

    },
    updateRemovedFriendRequest: (state, action) => {

      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["friendrequests"] = action?.payload.friendrequests;
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
      window.location.reload();

    },
  },
});

export const { login, logout, fetchPastSessionsLog, changeProfilePic, updateSelfBio, updateFriendList, updateRemovedFriend, updateSendFriendRequest, updateRemovedFriendRequest} = authSlice.actions;

export const updateProfilePicture = (pictureDetails) => async (dispatch) => {

  try {

    const { data } = await api.updateProfilePicture(pictureDetails);
    dispatch(changeProfilePic(data));

  } catch(error ) {

    alert(error.message);
    console.log(error);

  }

}

export const sendFriendRequest = (usersdetails) => async (dispatch) => {

  try {

    const { data } = await api.sendFriendRequest(usersdetails);
    dispatch(updateSendFriendRequest(data));

  } catch(error ) {

    alert(error.message);
    console.log(error);

  }

}

export const acceptFriendRequest = (usersdetails) => async (dispatch) => {

  try {

    const { data } = await api.acceptFriendRequest(usersdetails);
    dispatch(updateFriendList(data));

  } catch(error) {

    alert(error.message);
    console.log(error);

  }

}

export const removeFriend = (usersdetails) => async (dispatch) => {

  try {

    const { data } = await api.removeFriend(usersdetails);
    dispatch(updateRemovedFriend(data));

  } catch(error) {

    alert(error.message);
    console.log(error);

  }

}

export const removeFriendRequest = (usersdetails) => async (dispatch) => {

  try {

    const { data } = await api.removeFriendRequest(usersdetails);
    dispatch(updateRemovedFriendRequest(data));

  } catch(error) {

    alert(error.message);
    console.log(error);

  }

}

export const updateFriends = (userid) => async (dispatch) => {

  try {

    const { data } = await api.updateFriends(userid);
    console.log(data);
    dispatch(updateFriendList(data));

  } catch(error) {

    alert(error.message);
    console.log(error);

  }

}

export const updateBio = (newBio) => async (dispatch) => {

  try {

    const { data } = await api.updateBio(newBio);
    dispatch(updateSelfBio(data));

  } catch(error ) {

    alert(error.message);
    console.log(error);

  }

}

export const signin = (formData, history) => async (dispatch) => {
  try {

    const { data } = await api.signIn(formData);
    dispatch(login(data));
    const userid = data.result._id;
    const response = await api.fetchUserSession({userid});
    dispatch(fetchPastSessionsLog(response.data));
    history.push('/');

  } catch(error) {

    alert(error.message);
    console.log(error);

  }
};

export const googleSignIn = (googleData, history) => async (dispatch) => {
  try {

    const { data } = await api.googleSignIn(googleData);
    dispatch(login(data));
    const userid = data.result._id;
    const response = await api.fetchUserSession({userid});
    dispatch(fetchPastSessionsLog(response.data));
    history.push('/');

  } catch(error) {

    alert(error.message);
    console.log(error);

  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {

    const { data } = await api.signUp(formData);
    alert(data.message)
    history.push('/rooms');


  } catch(error) {

    alert(error.message);
    console.log(error);

  }
};

export default authSlice.reducer;
