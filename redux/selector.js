// Test Selectors
export const testDataSelector = (state) => state.testSlice.test;

// Pond Selectors
export const pondByOwnerSelector = (state) => state.pondSlice.pondByOwner;
export const pondByIdSelector = (state) => state.pondSlice.pondById;
export const requiredParamsSelector = (state) => state.pondSlice.params;
export const userSelector = (state) => state.pondSlice.user;

// Fish Selectors
export const fishByOwnerSelector = (state) => state.fishSlice.fishByOwner;
export const fishByIdSelector = (state) => state.fishSlice.fishById;
export const profileByFishSelector = (state) => state.fishSlice.profileByFish;

// Product Selectors
export const productSelector = (state) => state.productSlice.product;
export const categorySelector = (state) => state.categorySlice.category;
export const productByIdSelector = (state) => state.productSlice.productById;


// Location Selectors (GHN)
export const provinceSelector = (state) => state.ghnSlice.province;
export const districtSelector = (state) => state.ghnSlice.district;
export const wardSelector = (state) => state.ghnSlice.ward;

// Order Selectors (GHN)
export const orderbyAccountSelector = (state) => state.ghnSlice.orderByAccount;
export const orderDetailSelector = (state) => state.ghnSlice.orderDetail;
export const orderTrackingSelector = (state) => state.ghnSlice.orderTrack;

// Calculator Selectors
export const foodSelector = (state) => state.calculatorSlice.food;
export const saltSelector = (state) => state.calculatorSlice.salt;
export const foodSuggestionSelector = (state) => state.calculatorSlice.foodSuggestion;
export const instructionSelector = (state) => state.calculatorSlice.instructions;
export const saltReminderSelector = (state) => state.calculatorSlice.saltReminder;

// Symptom Selectors
export const symptomByTypeSelector = (state) => state.symptomSlice.symptomByType;
export const symptomPredictionSelector = (state) => state.symptomSlice.symptomPredict;
export const symptomExaminationSelector = (state) => state.symptomSlice.symptomExamination;
export const diseaseByIdSelector = (state) => state.symptomSlice.diseaseById;
export const symptomReminderSelector = (state) => state.symptomSlice.reminder;

// Blog Selectors
export const approvedBlogsSelector = (state) => state.blogSlice.approvedBlogs;

// Reminder Selectors
export const calculatedMaintainanceSelector = (state) => state.reminderSlice.maintainReminder;
export const reminderByOwnerSelector = (state) => state.reminderSlice.reminderByOwner;

// Transaction Selectors
export const createdUrlSelector = (state) => state.transactionSlice.createdUrl;
export const orderTransactionSelector = (state) => state.transactionSlice.orderTransaction;
export const packageTransactionSelector = (state) => state.transactionSlice.packageTransaction;
export const depositTransactionOrder = (state) => state.transactionSlice.depositTransaction;
export const packageSelector = (state) => state.transactionSlice.package;

// Authentication Selectors
export const tokenSelector = (state) => state.authSlice.token;
export const walletSelector = (state) => state.authSlice.wallet;