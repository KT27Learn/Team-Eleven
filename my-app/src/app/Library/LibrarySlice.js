import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/index';

const initialState = {
  studyMethods: [],
  favouriteStudyMethods: [],
  totalNumber: 1,
  status: 'idle',
  favouritesStatus: 'idle',
  error: null,
}

export const fetchMethods = createAsyncThunk('library/fetchMethods', async () => {
  const response = await api.fetchLibrary();
  return response.data;
});

export const fetchFavourites = createAsyncThunk('library/fetchFavourites', async (userDetails) => {
  const response = await api.fetchFavouritesLog(userDetails);
  return response.data.result;
});

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    favouriteMethods(state, action) {

      state.favouritesStudyMethods = action?.data;
      window.location.reload();
      
    },
    fetchFavouritesMethods(state, action) {

      state.favouritesStudyMethods = action?.data;

    },

  },
  extraReducers: {
    [fetchMethods.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchMethods.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched rooms to the array
      state.studyMethods = state.studyMethods.concat(action.payload);
      state.totalNumber = state.studyMethods.length;
    },
    [fetchMethods.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [fetchFavourites.pending]: (state, action) => {
      state.favouritesstatus = 'loading';
    },
    [fetchFavourites.fulfilled]: (state, action) => {
      state.favouritesstatus = 'succeeded';
      // Add any fetched rooms to the array
      state.favouriteStudyMethods = state.favouriteStudyMethods.concat(action.payload.favouriteslog);
    },
    [fetchFavourites.rejected]: (state, action) => {
      state.favouritesstatus = 'failed';
      state.error = action.payload;
    },
  },
})

export const { postUpdated, reactionAdded, favouriteMethods, fetchFavouritesMethods } = librarySlice.actions;

export default librarySlice.reducer;

export const favouriteMethod = (studyMethodDetails, history) => async (dispatch) => {
  try {

    const { data } = await api.favouriteMethod(studyMethodDetails);
    dispatch(favouriteMethods(data));

  } catch(error) {

    console.log(error);

  }
};

export const unfavouriteMethod = (studyMethodDetails, history) => async (dispatch) => {
  try {

    const { data } = await api.unfavouriteMethod(studyMethodDetails);
    dispatch(favouriteMethods(data));  

  } catch(error) {

    console.log(error);

  }
};

export const selectAllStudyMethods = (state) => state.library.studyMethods;

export const selectAllFavouriteStudyMethods = (state) => state.library.favouriteStudyMethods;

export const selectNumberOfStudyMethods = (state) => state.library.totalNumber;

export const selectMethodById = (state, methodId) =>
state.library.studyMethods.find((method) => method._id === methodId)
