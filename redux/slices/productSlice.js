import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  product: null,
  productById:null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    })
    .addCase(getProductById.fulfilled, (state, action) => {
      state.productById = action.payload;
    })
  },
});

export const getProduct = createAsyncThunk(
  "productSlice/getProduct",
  async () => {
    try {
      const res = await getRequest(`Product`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load product data.");
    }
  }
);

export const getProductById = createAsyncThunk(
  "productSlice/getProductById",
  async (productId) => {
    try {
      const res = await getRequest(`Product/${productId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load product data.");
    }
  }
);

export const createProduct = createAsyncThunk(
  "productSlice/createProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Product/create-product`, payload);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to add test.");
      return rejectWithValue("Add failed");
    }
  }
);

export const createFeedback = createAsyncThunk(
  "productSlice/createFeedback",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Feedback/create-feedback`, payload);
      console.log(res.data)
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to add feedback.");
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

export const { setData } = productSlice.actions;
export default productSlice;
