import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../features/global";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/user/userSlice";
import vehicleSlice from "../features/material-resources/vehicles/vehicleSlice";
import roomSlice from "../features/material-resources/rooms/roomSlice";
import userEventsSlice from "../features/userEvents/userEventSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    user: userSlice,
    vehicle: vehicleSlice,
    room: roomSlice,
    userEvents: userEventsSlice,
  },
});
