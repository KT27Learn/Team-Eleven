import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/index';

const initialState = {
  userprofile: {},
  posts: [],
  profilestatus: 'idle',
  status: 'idle',
}

export const fetchPosts= createAsyncThunk('discover/fetchPosts', async () => {
  const response = await api.fetchPosts();
  return response.data;
})

export const fetchUserProfile= createAsyncThunk('discover/fetchUserProfile', async (userid) => {
  const response = await api.fetchUserProfile(userid);
  return response.data;
})

export const addNewPost = createAsyncThunk(
  'discover/addPost',
  async (newPost) => {
    const response = await api.addPost(newPost);
    return response.data
  }
)

const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched rooms to the array
      if (action.payload) {
        state.posts = state.posts.concat(action.payload);
      }

    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload.result);
    },
    [fetchUserProfile.pending]: (state, action) => {
      state.profilestatus = 'loading';
    },
    [fetchUserProfile.fulfilled] : (state,action) => {
      state.userprofile = action.payload;
      state.profilestatus = 'succeeded';
    },
    [fetchUserProfile.rejected]: (state, action) => {
      state.profilestatus = 'failed';
      state.error = action.payload;
    },
  },
})

export default discoverSlice.reducer;

export const selectAllPosts = (state) => state.discover.posts;

export const selectPostByCreatorId = (state, creatorId) => 
  state.discover.posts.find((post) => post.creatorid === creatorId);

export const selectPostById = (state, postId) =>
  state.discover.posts.find((post) => post._id === postId)

export const selectUserProfile = (state, postId) =>
  state.discover.userprofile

export const selectPostByUsername = (state, username) =>
  state.discover.posts.find((post) => post.username === username)
