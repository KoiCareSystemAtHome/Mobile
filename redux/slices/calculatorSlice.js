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
  food: null,
  salt: null,
  instructions: null,
  foodSuggestion: null,
  saltReminder:null,
};

export const calculatorSlice = createSlice({
  name: "calculatorSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateFood.fulfilled, (state, action) => {
        state.food = action.payload;
      })
      .addCase(calculateSalt.fulfilled, (state, action) => {
        state.salt = action.payload;
      })
      .addCase(additionProccess.fulfilled, (state, action) => {
        state.instructions = action.payload;
      })
      .addCase(recommendFood.fulfilled, (state, action) => {
        state.foodSuggestion = action.payload;
      })
      .addCase(generateReminder.fulfilled, (state, action) => {
        state.saltReminder = action.payload;
      })
  },
});

export const calculateFood = createAsyncThunk(
  "calculatorSlice/calculateFood",
  async (values) => {
    try {
      const res = await getRequestParams(`FoodCalculate`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const recommendFood = createAsyncThunk(
  "calculatorSlice/recommendFood",
  async (pondId) => {
    try {
      const res = await getRequest(`FoodCalculate/suggest-food?pondId=${pondId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const calculateSalt = createAsyncThunk(
  "calculatorSlice/calculateSalt",
  async (values) => {
    try {
      const res = await postRequest(`SaltCalculate/calculate`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const generateReminder = createAsyncThunk(
  "calculatorSlice/generateReminder",
  async (values) => {
    try {
      const res = await postRequest(`SaltCalculate/generate-salt-reminders`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);


export const saveReminder = createAsyncThunk(
  "calculatorSlice/saveReminder",
  async (values) => {
    try {
      const res = await postRequest(`SaltCalculate/save-reminders`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);


export const updateSalt = createAsyncThunk(
  "calculatorSlice/updateSalt",
  async (values) => {
    try {
      const res = await postRequest(`SaltCalculate/update-salt-amount`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const additionProccess = createAsyncThunk(
  "calculatorSlice/additionProccess",
  async (values) => {
    try {
      const res = await postRequest(
        `SaltCalculate/addition-process?pondId=${values}`
      );
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const createCategory = createAsyncThunk(
  "calculatorSlice/createCategory",
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

export const { setData } = calculatorSlice.actions;
export default calculatorSlice;
