import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import testSlice from "./slices/testSlice";
import pondSlice from "./slices/pondSlice";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import fishSlice from "./slices/fishSlice";
import ghnSlice from "./slices/ghnSlice";
import calculatorSlice from "./slices/calculatorSlice";
import symptomSlice from "./slices/symptomSlice";
import reportSlice from "./slices/reportSlice";
import blogSlice from "./slices/blogSlice";
import reminderSlice from "./slices/reminderSlice";


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
    symptomSlice: symptomSlice.reducer,
    reportSlice: reportSlice.reducer,
    blogSlice: blogSlice.reducer,
    reminderSlice: reminderSlice.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
