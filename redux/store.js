import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import testSlice from "./slices/testSlice";
import pondSlice from "./slices/pondSlice";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import fishSlice from "./slices/fishSlice";
import ghnSlice from "./slices/ghnSlice";
import calculatorSlice from "./slices/calculatorSlice";


const store = configureStore({
  reducer: {
    testSlice: testSlice.reducer,
    authSlice: authSlice.reducer,
    pondSlice: pondSlice.reducer,
    fishSlice: fishSlice.reducer,
    productSlice: productSlice.reducer,
    categorySlice: categorySlice.reducer,
    ghnSlice: ghnSlice.reducer,
    calculatorSlice: calculatorSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
