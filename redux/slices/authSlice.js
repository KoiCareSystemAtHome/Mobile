import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../services/httpMethods";
import { Alert } from "react-native";
import { handleDangNhap } from "../../axios/axiosInterceptor";

export const login = createAsyncThunk(
  "authSlice/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await postRequest("authentication/login", credentials);
      return response.data;
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
      return rejectWithValue("Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "authSlice/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await postRequest("authentication/register", credentials);
      return response.data;
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
      return rejectWithValue("Registration failed");
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      Alert.alert("Success", "Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        handleDangNhap(action.payload);
        Alert.alert("Success", "Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
