import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  data: null,
  province: null,
  district: null,
  ward: null,
  orderByAccount: null,
  orderDetail: null,
  orderTrack: null,
};

export const ghnSlice = createSlice({
  name: "ghnSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProvince.fulfilled, (state, action) => {
        state.province = action.payload;
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.district = action.payload;
      })
      .addCase(getWard.fulfilled, (state, action) => {
        state.ward = action.payload;
      })
      .addCase(getOrderByAccount.fulfilled, (state, action) => {
        state.orderByAccount = action.payload;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
      })
      .addCase(getOrderTracking.fulfilled, (state, action) => {
        state.orderTrack = action.payload;
      });
  },
});

export const getProvince = createAsyncThunk(
  "ghnSlice/getProvince",
  async () => {
    try {
      const res = await postRequest(`Ghn/get-province`, "");
      return res.data.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const getDistrict = createAsyncThunk(
  "ghnSlice/getDistrict",
  async (province_id) => {
    try {
      const res = await postRequest(`Ghn/get-district`, { province_id });
      return res.data.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const getWard = createAsyncThunk(
  "ghnSlice/getWard",
  async (district_id) => {
    try {
      const res = await postRequest(`Ghn/get-ward`, { district_id });
      return res.data.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const getOrderByAccount = createAsyncThunk(
  "ghnSlice/getOrderByAccount",
  async (values) => {
    try {
      const res = await getRequest(`Order?AccountId=${values}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);
export const getOrderDetail = createAsyncThunk(
  "ghnSlice/getOrderDetail",
  async (values) => {
    try {
      const res = await getRequest(`Order/detail?orderId=${values}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const getOrderTracking = createAsyncThunk(
  "ghnSlice/getOrderTracking",
  async (values) => {
    try {
      console.log("a",values)
      const res = await postRequest(`Ghn/tracking-order`, values);
      return res.data.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const createOrder = createAsyncThunk(
  "ghnSlice/createOrder",
  async (values) => {
    try {
      const res = await postRequest(`Order/create`, values);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load category data.");
    }
  }
);

export const { setData } = ghnSlice.actions;
export default ghnSlice;
