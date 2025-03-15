import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  report: null,
};

export const reportSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(reportFood.fulfilled, (state, action) => {
    //   state.food = action.payload;
    // })
  },
});

export const createReport = createAsyncThunk(
  "reportSlice/createReport",
  async (values) => {
    try {
      const res = await postRequest(`Report/create-report`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const reportSalt = createAsyncThunk(
  "reportSlice/reportSalt",
  async (values) => {
    try {
      console.log("a", values);
      const res = await postRequest(`SaltReport/report`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const additionProccess = createAsyncThunk(
  "reportSlice/additionProccess",
  async (values) => {
    try {
      const res = await postRequest(
        `SaltReport/addition-process?pondId=${values}`
      );
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const createCategory = createAsyncThunk(
  "reportSlice/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Category/create-category`, payload);
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

export const { setData } = reportSlice.actions;
export default reportSlice ;
