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
    }
  },
});

export const { login, logout, fetchPastSessionsLog, changeProfilePic, updateSelfBio } = authSlice.actions;

export const updateProfilePicture = (pictureDetails) => async (dispatch) => {

  try {

    const { data } = await api.updateProfilePicture(pictureDetails);
    dispatch(changeProfilePic(data));

  } catch(error ) {

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
