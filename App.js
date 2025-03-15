import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
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


// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Create Stack Navigator
const Stack = createStackNavigator();

// Placeholder Screens
const OverviewScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Overview Screen</Text>
  </View>
);

const FAQScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>FAQ Screen</Text>
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
      name="Overview"
      component={OverviewScreen}
      options={{
        tabBarLabel: 'Overview',
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
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
