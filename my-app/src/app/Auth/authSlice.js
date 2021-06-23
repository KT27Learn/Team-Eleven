import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index'

const initialState = {
    authData: null,
    pastlogs: [],
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
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
  
    
  }
});

export const { login, logout, fetchPastSessionsLog } = authSlice.actions;

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
    dispatch(login(data));
    
    history.push('/');


  } catch(error) {

    alert(error.message);
    console.log(error);

  }
};

export default authSlice.reducer;
