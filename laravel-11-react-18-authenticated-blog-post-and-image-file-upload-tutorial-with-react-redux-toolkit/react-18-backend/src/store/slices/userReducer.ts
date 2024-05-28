import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeGetUserRequest, makeUpdatetUserRequest } from "../../services/userService";

export interface UpdateUserData {
  name: string;
  phone: string;
  address: string;
}

interface User {
  id: number;
  name: string;
  phone: string;
  address: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk<User, void>(
  "auth/getUser",
  async () => {
    return await makeGetUserRequest();
  }
);

export const updateUser = createAsyncThunk<User, UpdateUserData>(
  "auth/updateUser",
  async (userData) => {
    return await makeUpdatetUserRequest(userData);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get user data";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      });
  },
});

export default authSlice.reducer;
