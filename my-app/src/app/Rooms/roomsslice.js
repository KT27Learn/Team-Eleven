import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/index';

const initialState = {
  rooms: [],
  totalNumber: 1,
  status: 'idle',
  error: null,
}

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await api.fetchRooms();
  return response.data;
})

export const addNewRoom = createAsyncThunk(
  'rooms/addNewRoom',
  async (newRoom) => {
    const response = await api.addRoom(newRoom);
    return response.data
  }
)


const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  extraReducers: {
    [fetchRooms.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchRooms.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched rooms to the array
      state.rooms = state.rooms.concat(action.payload);
      state.totalNumber = state.rooms.length;

    },
    [fetchRooms.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [addNewRoom.fulfilled]: (state, action) => {
      state.rooms.push(action.payload.result);
    },
  },
})

export const { postUpdated, reactionAdded } = roomsSlice.actions;

export default roomsSlice.reducer;

export const selectAllRooms = (state) => state.rooms.rooms;

export const selectNumberOfRooms = (state) => state.rooms.totalNumber;

export const selectRoomById = (state, roomId) =>
  state.rooms.rooms.find((room) => room.id === roomId)

  export const selectRoomByUsername = (state, username) =>
  state.rooms.rooms.find((room) => room.username === username)
