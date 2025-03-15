import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  fishByOwner: null,
};

export const fishSlice = createSlice({
  name: "fishSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFishByOwner.fulfilled, (state, action) => {
      state.fishByOwner = action.payload;
    });
  },
});

export const getFishByOwner = createAsyncThunk(
  "fishSlice/getFishByOwner",
  async (ownerId) => {
    try {
      const res = await getRequest(`Fish/get-by-owner?owner=${ownerId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load fish data.");
    }
  }
);

export const createFish = createAsyncThunk(
  "fishSlice/createFish",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Fish/create-fish`, payload);
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const putTest = createAsyncThunk(
  "testSlice/putTest",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await putRequest(`test`, payload);
      Alert.alert("Success", "Test updated successfully");
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to update test.");
      return rejectWithValue("Update failed");
    }
  }
);

export const deleteTest = createAsyncThunk(
  "testSlice/deleteTest",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await deleteRequest(`test`, {
        data: payload,
      });
      Alert.alert("Success", "Test deleted successfully");
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to delete test.");
      return rejectWithValue("Delete failed");
    }
  }
);

export const { setData } = fishSlice.actions;
export default fishSlice;
