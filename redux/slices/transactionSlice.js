import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, getRequestParams, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  createdUrl: null,
  packageTransaction:null,
  orderTransaction:null,
  depositTransaction:null,
  package:null
};

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaymentUrl.fulfilled, (state, action) => {
      state.createdUrl = action.payload;
    })
    .addCase(getOrderTransaction.fulfilled, (state, action) => {
      state.orderTransaction = action.payload;
    })
    .addCase(getPackageTransaction.fulfilled, (state, action) => {
      state.packageTransaction = action.payload;
    })
    .addCase(getDepositTransaction.fulfilled, (state, action) => {
      state.depositTransaction = action.payload;
    })
    .addCase(getPackage.fulfilled, (state, action) => {
      state.package = action.payload;
    })
  },
});

export const getPaymentUrl = createAsyncThunk(
  "transactionSlice/getPaymentUrl",
  async (values) => {
    try {
      const res = await getRequest(`Vnpay/CreatePaymentUrl?money=${values.money}&description=${values.description}&returnUrl=https://loco.com.co/api/Vnpay/CallbackWithUserInfo?email=${values.email}`);
      return res;
    } catch (error) {
      Alert.alert("Error", "Failed to load url data.");
    }
  }
);
export const getPackageTransaction = createAsyncThunk(
  "transactionSlice/getPackageTransaction",
  async (ownerId) => {
    try {
      const res = await getRequest(`Transaction/package-transaction-by-owner?ownerid=${ownerId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load data.");
    }
  }
);
export const getOrderTransaction = createAsyncThunk(
  "transactionSlice/getOrderTransaction",
  async (ownerId) => {
    try {
      const res = await getRequest(`Transaction/order-transaction-by-owner?ownerid=${ownerId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load data.");
    }
  }
);
export const getDepositTransaction = createAsyncThunk(
  "transactionSlice/getDepositTransaction",
  async (ownerId) => {
    try {
      const res = await getRequest(`Transaction/desposit-transaction-by-owner?ownerid=${ownerId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load data.");
    }
  }
);
export const getPackage = createAsyncThunk(
  "transactionSlice/getPackage",
  async (ownerId) => {
    try {
      const res = await getRequest(`Package`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load data.");
    }
  }
);

export const payPackage = createAsyncThunk(
  "transactionSlice/payPackage",
  async (values) => {
    try {
      const res = await postRequest(`Account/pay-package?email=${values.email}&packageId=${values.packageId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load data.");
    }
  }
);

export const payOrder = createAsyncThunk(
  "transactionSlice/payOrder",
  async (values) => {
    try {
      const res = await postRequest(`Account/pay-orders`,values)
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load data.");
    }
  }
);




export const { setData } = transactionSlice.actions;
export default transactionSlice;
