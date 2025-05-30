import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  fishByOwner: null,
  fishById:null,
  profileByFish: null
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
    })
    .addCase(getFishById.fulfilled, (state, action) => {
      state.fishById = action.payload;
    })
    .addCase(getKoiProfile.fulfilled, (state, action) => {
      state.profileByFish = action.payload;
    })
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

export const getFishById = createAsyncThunk(
  "fishSlice/getFishById",
  async (koiId) => {
    try {
      const res = await getRequest(`Fish/${koiId}`);
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

export const updateFish = createAsyncThunk(
  "fishSlice/updateFish",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await putRequest(`Fish/update-fish`, payload);
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const getKoiProfile = createAsyncThunk(
  "fishSlice/createKoiProfile",
  async (fishId, { rejectWithValue }) => {
    try {
      const res = await getRequest(`KoiProfile/fish?fishId=${fishId}`);
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const createKoiProfile = createAsyncThunk(
  "fishSlice/createKoiProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`KoiProfile/create`, payload);
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const addFishNote = createAsyncThunk(
  "fishSlice/addFishNote",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Fish/note?koiId=${payload.koiId}&note=${payload.note}`);
      console.log(res.data)
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
