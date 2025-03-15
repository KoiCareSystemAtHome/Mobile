import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, getRequestParams, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  symptomByType: null,
  symptomPredict: null,
  symptomExamination: null,
};

export const symptomSlice = createSlice({
  name: "symptomSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSymptomByType.fulfilled, (state, action) => {
      state.symptomByType = action.payload;
    })
    .addCase(getPrediction.fulfilled, (state, action) => {
      state.symptomPredict = action.payload;
    })
    .addCase(getExamination.fulfilled, (state, action) => {
      state.symptomExamination = action.payload;
    })
    // .addCase(getRequiredParams.fulfilled, (state, action) => {
    //   state.params = action.payload;
    // })
  },
});

export const getSymptomByType = createAsyncThunk(
  "symptomSlice/getSymptomByType",
  async (type) => {
    try {
      const res = await getRequest(`Symptomp/type?type=${type}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load symptom data.");
    }
  }
);

export const getPrediction = createAsyncThunk(
    "symptomSlice/getPrediction",
    async (type) => {
      try {
        const res = await postRequest(`Symptomp/predict`, type);
        return res.data;
      } catch (error) {
        Alert.alert("Error", "Failed to load symptom data.");
      }
    }
  );
  export const getExamination = createAsyncThunk(
    "symptomSlice/getExamination",
    async (type) => {
      try {
        const res = await postRequest(`Symptomp/examination`, type);
        return res.data;
      } catch (error) {
        Alert.alert("Error", "Failed to load symptom data.");
      }
    }
  );
export const getRequiredParams = createAsyncThunk(
  "symptomSlice/getRequiredParams",
  async (ownerId) => {
    try {
      const res = await getRequest(`Symptom/symptom-required-param`)
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load symptom data.");
    }
  }
);

export const getSymptomByID = createAsyncThunk(
  "symptomSlice/getSymptomByID",
  async (symptomId) => {
    try {
      const res = await getRequest(`Symptom/get-symptom/${symptomId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load symptom data.");
    }
  }
);

export const createSymptom = createAsyncThunk(
  "symptomSlice/createSymptom",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Symptom/create-symptom`, payload);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to add test.");
      return rejectWithValue("Add failed");
    }
  }
);

export const updateSymptom = createAsyncThunk(
  "testSlice/updateSymptom",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await putRequest(`Symptom/update-symptom`, payload);
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

export const { setData } = symptomSlice.actions;
export default symptomSlice;
