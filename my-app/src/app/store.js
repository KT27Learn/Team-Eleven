import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from './Auth/authSlice';
import libraryReducer from './Library/LibrarySlice';
import roomsReducer from './Rooms/roomsslice';
import timerReducer from './Timer/timerslice';
import profileReducer from './Profile/profileslice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    library: libraryReducer,
    rooms: roomsReducer,
    timer: timerReducer,
    profile: profileReducer,

  },
});
