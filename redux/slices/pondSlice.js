import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, getRequestParams, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  pondByOwner: null,
  pondById:null,
  params:null,
};

export const pondSlice = createSlice({
  name: "pondSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPondByOwner.fulfilled, (state, action) => {
      state.pondByOwner = action.payload;
    })
    .addCase(getPondByID.fulfilled, (state, action) => {
      state.pondById = action.payload;
    })
    .addCase(getRequiredParams.fulfilled, (state, action) => {
      state.params = action.payload;
    })
  },
});

export const getPondByOwner = createAsyncThunk(
  "pondSlice/getPondByOwner",
  async (ownerId) => {
    try {
      const res = await getRequest(`Pond/get-by-owner?owner=${ownerId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load pond data.");
    }
  }
);
export const getRequiredParams = createAsyncThunk(
  "pondSlice/getRequiredParams",
  async (ownerId) => {
    try {
      const res = await getRequest(`Pond/pond-required-param`)
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load pond data.");
    }
  }
);

export const getPondByID = createAsyncThunk(
  "pondSlice/getPondByID",
  async (pondId) => {
    try {
      const res = await getRequest(`Pond/get-pond/${pondId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load pond data.");
    }
  }
);

export const createPond = createAsyncThunk(
  "pondSlice/createPond",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Pond/create-pond`, payload);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to add test.");
      return rejectWithValue("Add failed");
    }
  }
);

export const updatePond = createAsyncThunk(
  "pondSlice/updatePond",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("a",payload)
      const res = await putRequest(`Pond/update-pond`, payload);
      return res.data
    } catch (error) {
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

export const { setData } = pondSlice.actions;
export default pondSlice;
