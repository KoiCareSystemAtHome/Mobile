import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FishStatistic from './screens/FishStatistic';
import FishDetail from './screens/FishDetail';
import PondStatistic from './screens/PondStatistic';

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
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
