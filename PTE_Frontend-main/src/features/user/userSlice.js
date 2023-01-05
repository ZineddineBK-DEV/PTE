import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  userProfile: null,
  requests: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all users
export const AddUser = createAsyncThunk(
  "users/AddUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.AddUser(token);
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

// get all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getAllUsers(token);
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

// export const getAllExternal = createAsyncThunk(
//   "users/getAllExternal",
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await userService.getAllExternal(token);
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
//filter users
export const filterUsers = createAsyncThunk(
  "users/filterUsers",
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.filterUsers(body, token);
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

//filter users
export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.searchUsers(body, token);
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

// delete user by ID
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.deleteUserById(token, id);
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

// get sign up requests
export const getSignupRequests = createAsyncThunk(
  "users/getSignupRequests",
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.searchUsers(body, token);
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

// confirm user SignUp
export const confirmSignUp = createAsyncThunk(
  "users/confirmSignUp",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.confirmSignUp(id, token);
      // await userService.getSignupRequests(token);
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

//Update User
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.updateUserById(
        userData._id,
        userData.body,
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
export const updateUserRoles = createAsyncThunk(
  "users/updateUserRoles",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.updateUserRoles(
        userData._id,
        userData.body,
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
export const changePswdAutorisation = createAsyncThunk(
  "users/changePswdAutorisation",
  async (id, thunkAPI) => {
    try {
      return await userService.changePswdAutorisation(id);
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
//Forgot Password
export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await userService.forgotPassword(email);
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
export const codeVerif = createAsyncThunk(
  "users/codeVerif",
  async (body, thunkAPI) => {
    try {
      return await userService.codeVerification(body);
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
export const changePswd = createAsyncThunk(
  "users/changePswd",
  async (body, thunkAPI) => {
    try {
      return await userService.changePswd(body);
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
//get User by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.getUserById(id, token);
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
/*******CV managment */
//Update Cv
export const updateCv = createAsyncThunk(
  "users/updateCv",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.updateCv(data.id_cv, data.body, token);
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
//delete item from Cv
export const deleteItemFromCv = createAsyncThunk(
  "users/deleteItemFromCv",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.deleteItemFromCv(data.id_cv, data.body, token);
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
/****** */
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetUserProfile: (state) => {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.users = [];
      })

      .addCase(confirmSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.requests = action.payload;
        state.message = "User Accepted";
      })
      .addCase(confirmSignUp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "INTERNAL SERVER ERROR!";
        state.isSuccess = false;
      })
      .addCase(getSignupRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })
      .addCase(getSignupRequests.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "INTERNAL SERVER ERROR!";
        state.isSuccess = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "INTERNAL SERVER ERROR!";
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "User deleted succefully";
        state.isSuccess = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "INTERNAL SERVER ERROR !";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.isSuccess = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateCv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateCv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(deleteItemFromCv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
        state.isSuccess = true;
      })
      .addCase(deleteItemFromCv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(filterUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isError = false;

        state.isSuccess = true;
      })
      .addCase(filterUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isError = false;

        state.isSuccess = true;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.message = "Verification code sent to your Email";
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Email does not exist";
        state.isSuccess = false;
      })
      .addCase(codeVerif.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(codeVerif.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(codeVerif.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Wrong verification code";
        state.isSuccess = false;
      })
      .addCase(changePswd.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(changePswd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePswd.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "INTERNAL SERVER ERROR";
        state.isSuccess = false;
      })
      .addCase(changePswdAutorisation.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })

      .addCase(changePswdAutorisation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "INTERNAL SERVER ERROR";
        state.isSuccess = false;
      })
      .addCase(updateUserRoles.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })

      .addCase(updateUserRoles.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "INTERNAL SERVER ERROR";
        state.isSuccess = false;
      })

      .addCase(AddUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "External Added Succesfuly";
        state.isSuccess = true;
      });
  },
});

export const { reset, resetUserProfile } = usersSlice.actions;
export default usersSlice.reducer;
