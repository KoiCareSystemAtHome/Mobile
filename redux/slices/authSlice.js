import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  postRequestFormData,
  postRequestMultipartFormData,
  postRequestParams,
  putRequest,
} from "../../services/httpMethods";
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
export const getWallet = createAsyncThunk(
  "authSlice/getWallet",
  async (ownerId, { rejectWithValue }) => {
    try {
      const response = await getRequest(`Account/wallet?ownerid=${ownerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Upload failed");
    }
  }
);

export const register = createAsyncThunk(
  "authSlice/register",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      const response = await postRequest(
        `Account/register?Email=${values.Email}&UserName=${values.UserName}&Name=${values.Name}&Password=${values.Password}&Role=${values.Role}&Gender=${values.Gender}&Address=${values.Address}`,
        values
      );
      return response.data;
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
      return rejectWithValue("Registration failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "authSlice/forgotPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `Account/ForgotPassword?email=${values}`
      );
      return response.data;
    } catch (error) {
      Alert.alert("Error", "Request failed. Please try again.");
      return rejectWithValue("Registration failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "authSlice/resetPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `Account/ConfirmResetPassCode?email=${values.email}&code=${values.code}&newPass=${values.newPass}`
      );
      return response.data;
    } catch (error) {
      Alert.alert("Error", "Request failed. Please try again.");
      return rejectWithValue("Registration failed");
    }
  }
);

export const activateAccount = createAsyncThunk(
  "authSlice/activateAccount",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await putRequest(
        `Account/activate?email=${credentials.email}&code=${credentials.otp}`
      );

      return response.data;
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
      return rejectWithValue("Login failed");
    }
  }
);

export const resendCode = createAsyncThunk(
  "authSlice/resendCode",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await putRequest(
        `Account/resend-code?email=${credentials.email}`
      );

      return response.data;
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
      return rejectWithValue("Login failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "authSlice/updateProfile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await postRequest(`Account/UpdateProfile`, credentials);

      return response.data;
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
      return rejectWithValue("Login failed");
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  wallet: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.wallet = null; // Reset wallet as well
      Alert.alert("Success", "Logged out successfully");
    },
    resetState(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.wallet = null;
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
        handleLogin(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.wallet = action.payload;
      });
  },
});

export const { logout, resetState } = authSlice.actions;
export default authSlice;
