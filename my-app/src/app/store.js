import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import libraryReducer from './Library/LibrarySlice';
import roomsReducer from './Rooms/roomsslice';
import timerReducer from './Timer/timerslice';
import profileReducer from './Profile/profileslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    library: libraryReducer,
    rooms: roomsReducer,
    timer: timerReducer,
    profile: profileReducer,

  },
});
