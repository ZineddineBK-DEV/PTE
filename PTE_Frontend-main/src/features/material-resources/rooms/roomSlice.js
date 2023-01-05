import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomService from "./roomService";

const initialState = {
  rooms: "",
  roomEvents: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all rooms
export const getRooms = createAsyncThunk(
  "room/getRooms",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.getRooms(token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Add room
export const addRoom = createAsyncThunk(
  "room/addRoom",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.AddRoom(data, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Search Rooms
export const findRooms = createAsyncThunk(
  "room/findRooms",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.findRooms(data, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.deleteRoom(id, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**Events Managment */
/************************************************** */
/**get Room events */
export const getRoomEvents = createAsyncThunk(
  "room/getRoomEvents",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.getRoomEvents(data, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**set Room event  */
export const setRoomEvent = createAsyncThunk(
  "room/setRoomEvent",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.setRoomEvent(data, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**Delete Event */
export const deleteEvent = createAsyncThunk(
  "room/deleteEvent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.deleteEvent(token, id);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**Accept Event */
export const acceptEvent = createAsyncThunk(
  "room/acceptEvent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await roomService.acceptEvent(token, id);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

function setEventDates(events) {
  events.forEach((event) => {
    event.start = event.start.slice(0, -8);
    event.end = event.end.slice(0, -8);
  });
  return events;
}

export const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.message = "INTERNAL SERVER ERROR";
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(setRoomEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Event Added succefully";
      })
      .addCase(setRoomEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "This date is already in use";
      })
      .addCase(getRoomEvents.fulfilled, (state, action) => {
        state.roomEvents = setEventDates(action.payload);
      })
      .addCase(getRoomEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR!";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Event deleted Succefully";
      })
      .addCase(acceptEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Event Accepted";
      })
      .addCase(acceptEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Cannot Accept Event , Check reservation date";
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Room deleted succefully";
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR!";
      })
      .addCase(addRoom.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Room added succefully";
      })
      .addCase(addRoom.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR!";
      })
      .addCase(findRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      });
  },
});

export const { reset } = RoomSlice.actions;
export default RoomSlice.reducer;
