import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, getRequestParams, postRequest, putRequest } from "../../services/httpMethods";
import { Alert } from "react-native";

const initialState = {
  approvedBlogs: null,
  blogById:null,
  params:null,
};

export const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApprovedBlogs.fulfilled, (state, action) => {
      state.approvedBlogs = action.payload;
    })

  },
});

export const getApprovedBlogs = createAsyncThunk(
  "blogSlice/getApprovedBlogs",
  async () => {
    try {
      const res = await getRequest(`Blog/approved-blogs`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load blog data.");
    }
  }
);
export const getRequiredParams = createAsyncThunk(
  "blogSlice/getRequiredParams",
  async (ownerId) => {
    try {
      const res = await getRequest(`Blog/blog-required-param`)
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load blog data.");
    }
  }
);

export const getBlogByID = createAsyncThunk(
  "blogSlice/getBlogByID",
  async (blogId) => {
    try {
      const res = await getRequest(`Blog/get-blog/${blogId}`);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to load blog data.");
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogSlice/createBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest(`Blog/create-blog`, payload);
      return res.data;
    } catch (error) {
      Alert.alert("Error", "Failed to add test.");
      return rejectWithValue("Add failed");
    }
  }
);

export const updateBlog = createAsyncThunk(
  "testSlice/updateBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await putRequest(`Blog/update-blog`, payload);
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

export const { setData } = blogSlice.actions;
export default blogSlice;
