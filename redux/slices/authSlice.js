import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, postRequestFormData, postRequestMultipartFormData } from "../../services/httpMethods";
import { Alert } from "react-native";
import { handleLogin } from "../../axios/axiosInterceptor";

export const login = createAsyncThunk(
  "authSlice/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `Account/login?username=${credentials.username}&password=${credentials.password}`
      );
      return response.data;
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
      return rejectWithValue("Login failed");
    }
  }
);

export const getImage = createAsyncThunk(
  "authSlice/getImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postRequestFormData(`Account/test`, formData);
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      return rejectWithValue("Upload failed");
    }
  }
);

export const register = createAsyncThunk(
  "authSlice/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        "authentication/register",
        credentials
      );
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
      state.user = null;
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
        state.token = action.payload.token;
        state.user = action.payload.user;
        handleLogin(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
