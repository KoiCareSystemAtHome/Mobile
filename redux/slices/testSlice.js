import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  test: null,
};

export const testSlice = createSlice({
  name: "testSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTest.fulfilled, (state, action) => {
      state.test = action.payload;
    });
  },
});

export const getTest = createAsyncThunk(
  "testSlice/getTest",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getRequest(`shop/1`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to fetch test data.");
      return rejectWithValue("Fetch failed");
    }
  }
);

export const postTest = createAsyncThunk(
  "testSlice/postTest",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`test`, payload);
      Alert.alert("Success", "Test added successfully");
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to add test.");
      return rejectWithValue("Add failed");
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

export const { setData } = testSlice.actions;
export default testSlice;
