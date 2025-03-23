import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, getRequestParams, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  maintainReminder: null,
  reminderByOwner: null
};

export const reminderSlice = createSlice({
  name: "reminderSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calculateMaintainance.fulfilled, (state, action) => {
      state.maintainReminder = action.payload;
    })
    .addCase(getReminderByOwner.fulfilled, (state, action) => {
      state.reminderByOwner = action.payload;
    })

  },
});

export const calculateMaintainance = createAsyncThunk(
  "reminderSlice/calculateMaintainance",
  async (values) => {
    try {
      const res = await postRequest(`PondReminder/calculate-maintenance`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load reminder data.");
    }
  }
);
export const getReminderByOwner = createAsyncThunk(
  "reminderSlice/getReminderByOwner",
  async (ownerId) => {
    try {
      const res = await getRequest(`PondReminder/get-by-owner/${ownerId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load reminder data.");
    }
  }
);
export const saveMaintainance = createAsyncThunk(
    "reminderSlice/saveMaintainance",
    async (values) => {
      try {
        const res = await postRequest(`PondReminder/save-maintenance`, values);
        return res.data;
      } catch (error) {
        Alert.alert("Error", "Failed to load reminder data.");
      }
    }
  );

  export const reccuringMaintainance = createAsyncThunk(
    "reminderSlice/reccuringMaintainance",
    async (values) => {
      try {
        const res = await postRequest(`PondReminder/recurring-maintenance`, values);
        return res.data;
      } catch (error) {
        Alert.alert("Error", "Failed to load reminder data.");
      }
    }
  );
  
export const getRequiredParams = createAsyncThunk(
  "reminderSlice/getRequiredParams",
  async (ownerId) => {
    try {
      const res = await getRequest(`Reminder/reminder-required-param`)
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load reminder data.");
    }
  }
);

export const getReminderByID = createAsyncThunk(
  "reminderSlice/getReminderByID",
  async (reminderId) => {
    try {
      const res = await getRequest(`Reminder/get-reminder/${reminderId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load reminder data.");
    }
  }
);

export const createReminder = createAsyncThunk(
  "reminderSlice/createReminder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Reminder/create-reminder`, payload);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to add test.");
      return rejectWithValue("Add failed");
    }
  }
);

export const updateReminder = createAsyncThunk(
  "testSlice/updateReminder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await putRequest(`PondReminder/update?Id=${payload}`);
      return res.data;
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

export const { setData } = reminderSlice.actions;
export default reminderSlice;
