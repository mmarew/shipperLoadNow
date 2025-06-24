import {configureStore} from '@reduxjs/toolkit';
// import passengerReducer from '../slices/Slices111111'; // Adjust the path to where your slice is located
import passengerSlices from '../slices/PassengerSlice'; // Path to the WebSocket slice

const store = configureStore({
  reducer: {passengerSlices},
});
export default store;
