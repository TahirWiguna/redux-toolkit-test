import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  User,
  LoginCredentials,
  AuthState,
  UserResponse,
} from "../types/types";

const INITIAL_STATE: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }: LoginCredentials) => {
    try {
      const response = await axios.post<UserResponse>(
        "http://127.0.0.1:3000/v1/api/auth/login",
        { username, password }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error("Failed to login: " + error.response?.data?.message);
      }
      throw new Error("Failed to login");
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to login";
      });
  },
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
