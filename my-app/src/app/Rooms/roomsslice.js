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

    return response.data;

  }
)

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (deletedRoom) => {
    const response = await api.deleteRoom(deletedRoom);
    return response.data;
  }
)

export const deleteRoomFromHistory = createAsyncThunk(
  'rooms/deleteRoomFromHistory',
  async (deletedRoom) => {
    const response = await api.deleteRoomFromHistory(deletedRoom);
    return response.data;
  }
)

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchRooms.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchRooms.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched rooms to the array
      state.rooms = action.payload;
      state.totalNumber = state.rooms.length;

    },
    [fetchRooms.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [addNewRoom.fulfilled]: (state, action) => {
      state.rooms.push(action.payload.result);
      
    },
    [deleteRoom.fulfilled]: (state, action) => {
      state.rooms.filter(room => room._id !== action.payload.id);
      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["pastrooms"] = action?.payload.pastrooms;
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
      window.location.href = '../';
    },
    [deleteRoomFromHistory.fulfilled]: (state, action) => {
      var args = JSON.parse(window.localStorage.getItem("profile"));
      args["result"]["pastrooms"] = action?.payload.pastrooms;
      //Update the localStorage with new value
      localStorage.setItem("profile", JSON.stringify(args));
      window.location.reload();
    },
  },
})

export const { postUpdated, reactionAdded } = roomsSlice.actions;

export default roomsSlice.reducer;

export const selectAllRooms = (state) => state.rooms.rooms;

export const selectNumberOfRooms = (state) => state.rooms.totalNumber;

export const selectRoomByCreatorId = (state, creatorId) => 
  state.rooms.rooms.find((room) => room.creatorid === creatorId);

export const selectRoomById = (state, roomId) =>
  state.rooms.rooms.find((room) => room.id === roomId)

  export const selectRoomByUsername = (state, username) =>
  state.rooms.rooms.find((room) => room.username === username)
