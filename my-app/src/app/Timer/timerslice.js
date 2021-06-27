import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index'

const initialState = {
    prevSessionData: null,
  };

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    localPrevSession: (state, action) => {
        localStorage.setItem('prevStudySession', JSON.stringify({ ...action?.payload }));
        state.prevSessionData = action?.data;
    },
  }
});

export const { localPrevSession } = timerSlice.actions;

export const logNewSession = (sessionDetails, history) => async (dispatch) => {
  try {

    const { data } = await api.logSession(sessionDetails);
    dispatch(localPrevSession(data));
    history.push('/summary');

  } catch(error) {

    alert(error.message);
    console.log(error);

  }
};

export default timerSlice.reducer;
