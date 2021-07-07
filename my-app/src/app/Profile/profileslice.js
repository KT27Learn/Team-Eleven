import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index'

const initialState = {
    pastlogs: null,
    status: 'idle',
  };

export const fetchSessions = createAsyncThunk('profile/fetchSessions', async (userDetails) => {
  const response = await api.fetchUserSession(userDetails);
  return response.data;
});


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchPastSessionsLog: (state, action) => {
        state.pastlogs = action?.data;
    },
    
  },
  extraReducers: {
    [fetchSessions.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchSessions.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched rooms to the array
      state.pastlogs = action.payload;
    },
    [fetchSessions.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  }
});

export const { fetchPastSessionsLog, updateSelfBio } = profileSlice.actions;

export default profileSlice.reducer;

export const selectAllPastLogs = (state) => state.profile.pastlogs;