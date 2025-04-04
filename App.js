import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import "react-native-reanimated"; // ✅ ADD THIS AT THE TOP
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import FishStatistic from './screens/FishStatistic/FishStatistic';
import FishDetail from './screens/FishDetails/FishDetail';
import PondStatistic from './screens/PondStatistic/PondStatistic';
import PondDetail from './screens/PondDetail/PondDetail';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import Profile from './screens/Profile/Profile';
import EditProfile from './screens/EditProfile/EditProfile';
import Shopping from './screens/Shopping/Shopping';
import ProductDetail from './screens/ProductDetail/ProductDetail';
import CartScreen from './screens/CartScreen/CartScreen';
import AddressForm from './screens/CartScreen/components/AddressForm/AddressForm';
import SaltCalculator from './screens/SaltCalculator/SaltCalculator';
import FoodCalculator from './screens/FoodCalculator/FoodCalculator';
import WaterParameter from './screens/WaterParameter/WaterParameter';
import SymptomScreen from './screens/SymptomScreen/SymptomScreen';
import OrderHistory from './screens/OrderHistory/OrderHistory';
import ReportScreen from './screens/ReportScreen/ReportScreen';
import OrderTracking from './screens/OrderTracking/OrderTracking';
import BlogScreen from './screens/BlogScreen/BlogScreen';
import AddSaltForm from './screens/SaltCalculator/components/AddSaltForm';
import PredictSymptom from './screens/PredictSymptom/PredictSymptom';
import ReminderScreen from './screens/ReminderScreen/ReminderScreen';
import ScheduleScreen from './screens/ScheduleScreen/ScheduleScreen';
import CalculateMaintainance from './screens/CalculateMaintainance/CalculateMaintainance';
import RecurringMaintainance from './screens/ReccuringMaintainance/RecurringMaintainance';
import SuggestFood from './screens/SuggestFood/SuggestFood';
import DepositScreen from './screens/DepositScreen/DepositScreen';
import CreateKoiProfile from './screens/CreateKoiProfile/CreateKoiProfile';
import AddFish from './screens/FishStatistic/AddFish/AddFish';
import EditFish from './screens/FishStatistic/EditFish/EditFish';
import ReminderDetail from './screens/ScheduleScreen/ReminderDetail/ReminderDetail';
import TransactionScreen from './screens/TransactionScreen/TransactionScreen';
import PackageScreen from './screens/PackageScreen/PackageScreen';
import FAQScreen from './screens/FAQ/faq';
import OTPScreen from './screens/OTPScreen/OTPScreen';
import ReviewScreen from './screens/ReviewScreen/ReviewScreen';



// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Create Stack Navigator
const Stack = createStackNavigator();

// Placeholder Screens
const OverviewScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Blog screen, Add block dùm tui dớiii</Text>
  </View>
);


// Bottom Tab Navigation for Home/Overview/FAQ
const MainTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarActiveTintColor: '#6497B1',
      tabBarInactiveTintColor: '#555',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Ionicons name="home-outline" size={24} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
  name="Blog"
  component={BlogScreen} // Đổi từ OverviewScreen -> BlogScreen
  options={{
    tabBarLabel: "Blog",
    tabBarIcon: ({ color }) => (
      <Ionicons name="list-outline" size={24} color={color} />
    ),
    headerShown: false,
  }}
/>
    <Tab.Screen
      name="FAQ"
      component={FAQScreen}
      options={{
        tabBarLabel: "FAQ's",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="question-circle-o" size={24} color={color} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

// Stack Navigator for Login/Register + Main App Flow
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={OTPScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FishStatistic"
            component={FishStatistic}
            options={{ headerShown: false }}
          />
           <Stack.Screen
          name="FishDetail"
          component={FishDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PondStatistic"
          component={PondStatistic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PondDetail"
          component={PondDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Shopping"
          component={Shopping}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddressForm"
          component={AddressForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SaltCalculator"
          component={SaltCalculator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodCalculator"
          component={FoodCalculator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaterParameter"
          component={WaterParameter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SymptomScreen"
          component={SymptomScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="OrderTracking"
          component={OrderTracking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlogScreen"
          component={BlogScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSaltForm"
          component={AddSaltForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PredictSymptom"
          component={PredictSymptom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReminderScreen"
          component={ReminderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleScreen"
          component={ScheduleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CalculateMaintainance"
          component={CalculateMaintainance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecurringMaintainance"
          component={RecurringMaintainance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SuggestFood"
          component={SuggestFood}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DepositScreen"
          component={DepositScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="CreateKoiProfile"
          component={CreateKoiProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddFish"
          component={AddFish}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EditFish"
          component={EditFish}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReminderDetail"
          component={ReminderDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PackageScreen"
          component={PackageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
