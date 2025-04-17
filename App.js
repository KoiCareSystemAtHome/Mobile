import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { getReminderByOwner } from './redux/slices/reminderSlice';
import { reminderByOwnerSelector } from './redux/selector';
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
import ForgetPassword from './screens/FogetPassword/ForgetPassword';
import ResetPasswordForm from './screens/FogetPassword/components/ResetPasswordForm';
import "react-native-reanimated";

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Create Stack Navigator
const Stack = createStackNavigator();

// Function to schedule a local notification one hour before the maintenance date
const scheduleNotification = async (reminder) => {
  try {
    const maintainDate = new Date(reminder.maintainDate);
    const notificationDate = new Date(maintainDate.getTime() - 60 * 60 * 1000); // 1 hour before
    const now = new Date();

    if (notificationDate > now && reminder.seenDate === "0001-01-01T00:00:00") {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Reminder: ${reminder.title}`,
          body: `Your maintenance "${reminder.title}" is due in 1 hour!`,
          data: { reminderId: reminder.pondReminderId },
          sound: true,
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          date: notificationDate,
        },
      });

      // Store the notification ID in AsyncStorage to avoid duplicates
      const storedNotifications = await AsyncStorage.getItem('scheduledNotifications');
      const notifications = storedNotifications ? JSON.parse(storedNotifications) : {};
      notifications[reminder.pondReminderId] = notificationId;
      await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(notifications));
    }
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
};

// Bottom Tab Navigation
const MainTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#ddd', height: 60 },
      tabBarLabelStyle: { fontSize: 14 },
      tabBarActiveTintColor: '#6497B1',
      tabBarInactiveTintColor: '#555',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Blog"
      component={BlogScreen}
      options={{
        tabBarLabel: "Blog",
        tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={24} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="FAQ"
      component={FAQScreen}
      options={{
        tabBarLabel: "FAQ's",
        tabBarIcon: ({ color }) => <FontAwesome name="question-circle-o" size={24} color={color} />,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

// Component to handle Redux and notifications
const AppContent = () => {
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();
  const reminderByOwner = useSelector(reminderByOwnerSelector);

  // Initialize app: permissions, user data, and reminders
  useEffect(() => {
    const initializeApp = async () => {
      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn("Notification permissions not granted!");
        return;
      }

      // Set notification handler for foreground notifications
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Fetch user data and reminders
      try {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) : null;
        if (parsedUser?.id) {
          dispatch(getReminderByOwner(parsedUser.id));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    initializeApp();
  }, [dispatch]);

  // Schedule notification for the next reminder within the next 1 hour
  useEffect(() => {
    const scheduleNextNotification = async () => {
      if (reminderByOwner && reminderByOwner.length > 0) {
        const now = new Date();
        const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now

        // Load stored notification IDs
        const storedNotifications = await AsyncStorage.getItem('scheduledNotifications');
        const scheduledNotificationIds = storedNotifications ? JSON.parse(storedNotifications) : {};

        // Cancel any outdated or seen notifications
        for (const reminderId in scheduledNotificationIds) {
          const reminder = reminderByOwner.find(r => r.pondReminderId === reminderId);
          if (!reminder || reminder.seenDate !== "0001-01-01T00:00:00" || new Date(reminder.maintainDate) <= now) {
            await Notifications.cancelScheduledNotificationAsync(scheduledNotificationIds[reminderId]);
            delete scheduledNotificationIds[reminderId];
          }
        }
        await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(scheduledNotificationIds));

        // Find the next reminder within the next 1 hour
        const nextReminder = reminderByOwner
          .filter((reminder) => {
            const maintainDate = new Date(reminder.maintainDate);
            return (
              maintainDate > now &&
              maintainDate <= oneHourFromNow &&
              reminder.seenDate === "0001-01-01T00:00:00"
            );
          })
          .sort((a, b) => new Date(a.maintainDate) - new Date(b.maintainDate))[0]; // Earliest reminder

        // Schedule notification for the next reminder, if it exists and isn't already scheduled
        if (nextReminder && !scheduledNotificationIds[nextReminder.pondReminderId]) {
          await scheduleNotification(nextReminder);
        }
      }
    };

    scheduleNextNotification();
  }, [reminderByOwner]);

  // Handle notification clicks
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const reminderId = response.notification.request.content.data.reminderId;
      if (reminderId && navigationRef.isReady()) {
        const selectedReminder = reminderByOwner.find(
          (reminder) => reminder.pondReminderId === reminderId
        );
        if (selectedReminder) {
          navigationRef.navigate("ReminderDetail", { reminder: selectedReminder });
        } else {
          console.warn(`Reminder with ID ${reminderId} not found in reminderByOwner`);
          navigationRef.navigate("ReminderDetail", { reminder: { pondReminderId: reminderId } });
        }
      }
    });

    return () => subscription.remove();
  }, [navigationRef, reminderByOwner]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FishStatistic" component={FishStatistic} options={{ headerShown: false }} />
        <Stack.Screen name="FishDetail" component={FishDetail} options={{ headerShown: false }} />
        <Stack.Screen name="PondStatistic" component={PondStatistic} options={{ headerShown: false }} />
        <Stack.Screen name="PondDetail" component={PondDetail} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Shopping" component={Shopping} options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name="AddressForm" component={AddressForm} options={{ headerShown: false }} />
        <Stack.Screen name="SaltCalculator" component={SaltCalculator} options={{ headerShown: false }} />
        <Stack.Screen name="FoodCalculator" component={FoodCalculator} options={{ headerShown: false }} />
        <Stack.Screen name="WaterParameter" component={WaterParameter} options={{ headerShown: false }} />
        <Stack.Screen name="SymptomScreen" component={SymptomScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderTracking" component={OrderTracking} options={{ headerShown: false }} />
        <Stack.Screen name="BlogScreen" component={BlogScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddSaltForm" component={AddSaltForm} options={{ headerShown: false }} />
        <Stack.Screen name="PredictSymptom" component={PredictSymptom} options={{ headerShown: false }} />
        <Stack.Screen name="ReminderScreen" component={ReminderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CalculateMaintainance" component={CalculateMaintainance} options={{ headerShown: false }} />
        <Stack.Screen name="RecurringMaintainance" component={RecurringMaintainance} options={{ headerShown: false }} />
        <Stack.Screen name="SuggestFood" component={SuggestFood} options={{ headerShown: false }} />
        <Stack.Screen name="DepositScreen" component={DepositScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateKoiProfile" component={CreateKoiProfile} options={{ headerShown: false }} />
        <Stack.Screen name="AddFish" component={AddFish} options={{ headerShown: false }} />
        <Stack.Screen name="EditFish" component={EditFish} options={{ headerShown: false }} />
        <Stack.Screen name="ReminderDetail" component={ReminderDetail} options={{ headerShown: false }} />
        <Stack.Screen name="TransactionScreen" component={TransactionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PackageScreen" component={PackageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPasswordForm" component={ResetPasswordForm} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Main App Component
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}