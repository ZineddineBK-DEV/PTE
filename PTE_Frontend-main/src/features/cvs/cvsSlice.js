
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cvsService from "./cvsService";
import { getAllUsers } from "../user/userSlice";

const initialState = {
    requests: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };

export const filterCvs = createAsyncThunk(
    "cvs/filterCvs",
    async (body, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.Cv.token;
  
        return await cvsService.filterCvs(body, token);
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
  
  //filter Cvs
  export const searchCvs = createAsyncThunk(
    "cvs/searchCvs",
    async (body, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.Cv.token;
        return await cvsService.searchCvs(body, token);
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


  export const cvsSlice = createSlice({
    name: "cvs",
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
      builder.addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      });
      builder
              .addCase(filterCvs.fulfilled, (state, action) => {
          state.Cvs = action.payload;
          state.isLoading = false;
          state.isError = false;
  
          state.isSuccess = true;
        })
        .addCase(filterCvs.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.isSuccess = false;
        })
        .addCase(searchCvs.fulfilled, (state, action) => {
          state.Cvs = action.payload;
          state.isLoading = false;
          state.isError = false;
  
          state.isSuccess = true;
        })
        .addCase(searchCvs.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.isSuccess = false;
        })
        
    },
  });
  
  export const { reset, } = cvsSlice.actions;
  export default cvsSlice.reducer;
  