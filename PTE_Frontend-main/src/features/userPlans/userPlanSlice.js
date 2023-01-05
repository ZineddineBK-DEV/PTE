import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userPlansService from "./userPlansService";

const initialState = {
  userPlans: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getPlanById = createAsyncThunk(
  "Plans/getPlanById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userPlansService.getPlanById(id, token);
    } catch (error) {
      console.log("qwerty",error);

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


// export const uploadPlan = createAsyncThunk(
//   "Plans/uploadPlan",
//   async (id,data, thunkAPI) => {
//     console.log(id);
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await userPlansService.uploadPlan(id,data, token);
//     } catch (error) {
//       let message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
export const uploadPlan = createAsyncThunk(
  "Plans/uploadPlan",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userPlansService.uploadPlan(data, token);
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


export const filterPlans = createAsyncThunk(
  "Plans/filterPlans",
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userPlansService.filterPlans(body, token);
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

export const deletePlan = createAsyncThunk(
  "Plans/deletePlan",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userPlansService.deletePlan(token, id);
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




export const userPlansSlice = createSlice({
  name: "Plans",
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
      .addCase(getPlanById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
    
      .addCase(uploadPlan.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "error";
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Plan deleted succefully";
      })
      .addCase(deletePlan.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR!";
      })
      
      },
});

export const { reset } = userPlansSlice.actions;
export default userPlansSlice.reducer;
