import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Badge } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Image } from "react-native-elements";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tooltip from "react-native-walkthrough-tooltip";
import { useSelector } from "react-redux";
import { tokenSelector, userSelector } from "../../redux/selector";

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAnimation] = useState(new Animated.Value(-250)); // Drawer starts off-screen
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tokenState = useSelector(tokenSelector);
  const userState = useSelector(userSelector);
  const toggleDrawer = () => {
    if (drawerOpen) {
      // Close Drawer
      Animated.timing(drawerAnimation, {
        toValue: -250, // Hide the drawer
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDrawerOpen(false));
    } else {
      // Open Drawer
      Animated.timing(drawerAnimation, {
        toValue: 0, // Slide the drawer into view
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDrawerOpen(true));
    }
  };

  useEffect(() => {
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
        const token = await AsyncStorage.getItem("accessToken");
        setToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);


  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { left: drawerAnimation }]}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(drawerAnimation, {
                toValue: -250,
                duration: 300,
                useNativeDriver: false,
              }).start(() => setDrawerOpen(false)); // Close the drawer
            }}
            style={styles.backArrow}
          >
            <FontAwesome name="arrow-left" size={24} color="#6497B1" />
          </TouchableOpacity>
          <View style={styles.drawerProfile}>
            <FontAwesome name="user-circle" size={50} color="#6497B1" />
            <Text style={styles.drawerUserName}>User</Text>
            <Text style={styles.drawerUserRole}>UX/UI Designer</Text>
          </View>
        </View>
        {/* Divider Line */}
        <View style={styles.divider} />
        <View style={styles.drawerItems}>
          <TouchableOpacity style={styles.drawerItem}>
            <Image
              source={require("../../assets/comments.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image
              source={require("../../assets/bookmark.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image
              source={require("../../assets/download-removebg-preview (1) 1.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Reminder</Text>
          </TouchableOpacity>
          {isLoggedIn || userState ? (
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Image
                source={require("../../assets/user.png")}
                style={styles.drawerItemImage}
              />
              <Text style={styles.drawerItemText}>Profile</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <TouchableOpacity style={styles.drawerItem}>
            <Image
              source={require("../../assets/history_svgrepo.com.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Purchase History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image
              source={require("../../assets/Calendar.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.container}>
        {/* Header with Drawer Toggle */}
        {token ? (
          <View style={styles.headerNav}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Entypo name="menu" size={40} color="#6497B1" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTooltipVisible(true)}>
              <FontAwesome name="user-circle" size={40} color="#6497B1" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerNav}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Entypo name="menu" size={40} color="#6497B1" />
            </TouchableOpacity>
            <Tooltip
              isVisible={tooltipVisible}
              content={
                <View style={styles.tooltipContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tooltipOption,
                      { borderBottomWidth: 1, paddingBottom: 5 },
                    ]}
                    onPress={() => {
                      navigation.navigate("Login");
                      setTooltipVisible(false);
                    }}
                  >
                    <Text style={styles.tooltipText}>Log In</Text>
                  </TouchableOpacity>
                  <View style={styles.tooltipDivider} />
                  <TouchableOpacity
                    style={styles.tooltipOption}
                    onPress={() => {
                      setTooltipVisible(false);
                    }}
                  >
                    <Text style={styles.tooltipText}>Register</Text>
                  </TouchableOpacity>
                </View>
              }
              placement="bottom"
              contentStyle={{
                width: 100,
                borderWidth: 1,
                justifyContent: "center",
              }}
              onClose={() => setTooltipVisible(false)}
            >
              <TouchableOpacity onPress={() => setTooltipVisible(true)}>
                <FontAwesome name="user-circle" size={40} color="#6497B1" />
              </TouchableOpacity>
            </Tooltip>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.userText}>
            Hi{" "}
            {isLoggedIn || userState
              ? isLoggedIn.name || userState.name
              : "User"}
          </Text>
        </View>

        {/* Deposit Section */}
        <Card style={styles.depositCard}>
          <Card.Header
            title={
              <Text style={styles.depositText}>
                <Text style={styles.amount}>100000 </Text> VND
              </Text>
            }
            extra={
              <TouchableOpacity>
                <Text style={styles.depositLink}>Deposit</Text>
              </TouchableOpacity>
            }
          />
          <Card.Body>
            <Text style={styles.cardDescription}>
              Deposit funds now to unlock premium Koi care-system services!
            </Text>
          </Card.Body>
        </Card>

        {/* Section: My Koi */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Koi</Text>
          <Badge text="i" style={styles.badge} />
        </View>

        <View style={styles.buttonGroup}>
          <Button
            onPress={() => navigation.navigate("FishStatistic")}
            style={styles.button}
          >
            Fish Statistic
          </Button>
          <Button
            onPress={() => navigation.navigate("Shopping")}
            style={styles.button}
          >
            Shopping
          </Button>
        </View>

        {/* Section: My Pond */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Pond</Text>
          <Badge text="i" style={styles.badge} />
        </View>

        <View style={styles.buttonGroup}>
          <Button
            onPress={() => navigation.navigate("PondStatistic")}
            type="primary"
            style={styles.pondButton}
          >
            Pond Statistic
          </Button>
          <Button type="primary" style={styles.pondButton} onPress={()=>{navigation.navigate("WaterParameter")}}>
            Water Parameters
          </Button>
          <Button type="primary" style={styles.pondButton} onPress={()=>{navigation.navigate("FoodCalculator")}}>
            Food Calculator
          </Button>
          <Button type="primary" style={styles.pondButton} onPress={()=>{navigation.navigate("SaltCalculator")}}>
            Salt Calculator
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
