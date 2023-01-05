import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vehicleService from "./vehicleService";

const initialState = {
  vehicles: "",
  vehicleEvents: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all vehicles
export const getVehicles = createAsyncThunk(
  "vehicle/getVehicles",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.getVehicles(token);
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
//Add vehicle
export const addVehicle = createAsyncThunk(
  "vehicle/addVehicle",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.AddVehicle(data, token);
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

//Search vehicles
export const findVehicles = createAsyncThunk(
  "vehicle/findVehicles",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.findVehicles(data, token);
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

export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.deleteVehicle(id, token);
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
/**get vehicle events */
export const getVehicleEvents = createAsyncThunk(
  "vehicle/getVehicleEvents",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.getVehicleEvents(
        { ...data, user: thunkAPI.getState().auth.user._id },
        token
      );
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
/**set vehicle event  */
export const setVehicleEvent = createAsyncThunk(
  "vehicle/setVehicleEvent",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.setVehicleEvent(data, token);
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
  "vehicle/deleteEvent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.deleteEvent(token, id);
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
  "vehicle/acceptEvent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await vehicleService.acceptEvent(token, id);
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

export const vehicleSlice = createSlice({
  name: "vehicle",
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
      .addCase(getVehicles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.message = "INTERNAL SERVER ERROR";
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(setVehicleEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Event Added succefully";
      })
      .addCase(setVehicleEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "This date is already in use";
      })
      .addCase(getVehicleEvents.fulfilled, (state, action) => {
        state.vehicleEvents = setEventDates(action.payload);
      })
      .addCase(getVehicleEvents.rejected, (state, action) => {
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
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Vehicle deleted succefully";
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR!";
      })
      .addCase(addVehicle.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Vehicle added succefully";
      })
      .addCase(addVehicle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR!";
      })
      .addCase(findVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload;
      });
  },
});

export const { reset } = vehicleSlice.actions;
export default vehicleSlice.reducer;
