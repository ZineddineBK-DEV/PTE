import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userEventsService from "./userEventsService";

const initialState = {
  userEvents: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUserEvents = createAsyncThunk(
  "userEv/getUserEvents",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userEventsService.getUserEvents(data, token);
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

export const setUserEvent = createAsyncThunk(
  "userEv/setUserEvent",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userEventsService.setUserEvent(data, token);
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

export const deleteEvent = createAsyncThunk(
  "userEv/deleteEvent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userEventsService.deleteEvent(token, id);
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

export const acceptEvent = createAsyncThunk(
  "userEv/acceptEvent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userEventsService.acceptEvent(token, id);
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

export const userEventsSlice = createSlice({
  name: "userEv",
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
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.userEvents = setEventDates(action.payload);
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(setUserEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Event added succefully";
      })
      .addCase(setUserEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "This date is already in use";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Event deleted succefully";
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR!";
      })
      .addCase(acceptEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Event confimed succefully";
      })
      .addCase(acceptEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Cannot confim event,Please check the dates";
      });
  },
});

export const { reset } = userEventsSlice.actions;
export default userEventsSlice.reducer;
