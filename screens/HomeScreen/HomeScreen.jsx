import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Button, Badge } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Image } from "react-native-elements";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tooltip from "react-native-walkthrough-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector, userSelector, walletSelector } from "../../redux/selector";
import { getWallet } from "../../redux/slices/authSlice";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const walletData = useSelector(walletSelector);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAnimation] = useState(new Animated.Value(-250));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tokenState = useSelector(tokenSelector);
  const userState = useSelector(userSelector);

  const toggleDrawer = () => {
    if (drawerOpen) {
      Animated.timing(drawerAnimation, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDrawerOpen(false));
    } else {
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDrawerOpen(true));
    }
  };

  // Close drawer when pressing outside
  const handleOutsidePress = () => {
    if (drawerOpen) {
      toggleDrawer();
    }
  };

  useEffect(() => {
    const getData = async () => {
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

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getWallet(isLoggedIn?.id));
    }
  }, [isLoggedIn, dispatch]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("accessToken");
      setIsLoggedIn(null);
      setToken(null);
      setTooltipVisible(false);
      navigation.navigate("Login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
              }).start(() => setDrawerOpen(false));
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
        <View style={styles.divider} />
        <View style={styles.drawerItems}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              navigation.navigate("PackageScreen");
            }}
          >
            <Image
              source={require("../../assets/comments.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Gói thành viên</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              navigation.navigate("BlogScreen");
            }}
          >
            <Image
              source={require("../../assets/bookmark.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Bài Viết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              navigation.navigate("ReminderScreen");
            }}
          >
            <Image
              source={require("../../assets/download-removebg-preview (1) 1.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Nhắc Nhở</Text>
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
              <Text style={styles.drawerItemText}>Hồ Sơ</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate("OrderHistory")}
          >
            <Image
              source={require("../../assets/history_svgrepo.com.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Lịch Sử Đơn Hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate("TransactionScreen")}
          >
            <Image
              source={require("../../assets/history_svgrepo.com.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Lịch Sử Giao Dịch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate("ScheduleScreen")}
          >
            <Image
              source={require("../../assets/Calendar.png")}
              style={styles.drawerItemImage}
            />
            <Text style={styles.drawerItemText}>Lịch Trình</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main Content with Outside Press Detection */}
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.container}>
          <View style={styles.headerNav}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Entypo name="menu" size={40} color="#6497B1" />
            </TouchableOpacity>
            <Tooltip
              isVisible={tooltipVisible}
              content={
                token ? (
                  <View style={styles.tooltipContainer}>
                    <TouchableOpacity
                      style={styles.tooltipOption}
                      onPress={handleLogout}
                    >
                      <Text style={styles.tooltipText}>Đăng Xuất</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
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
                      <Text style={styles.tooltipText}>Đăng Nhập</Text>
                    </TouchableOpacity>
                    <View style={styles.tooltipDivider} />
                    <TouchableOpacity
                      style={styles.tooltipOption}
                      onPress={() => {
                        navigation.navigate("Register"); // Assuming there's a Register screen
                        setTooltipVisible(false);
                      }}
                    >
                      <Text style={styles.tooltipText}>Đăng Ký</Text>
                    </TouchableOpacity>
                  </View>
                )
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

          <View style={styles.header}>
            <Text style={styles.userText}>
              Hi {isLoggedIn || userState ? isLoggedIn?.name || userState?.name : "User"}
            </Text>
          </View>

          {token ? (
            <View style={styles.depositCard}>
              <LinearGradient
                colors={["#4da6ff", "#80bfff"]}
                style={styles.depositGradient}
              >
                <View style={styles.depositHeader}>
                  <Text style={styles.depositText}>
                    <Text style={styles.amount}>{walletData?.amount || "100000"}</Text>
                    <Text style={styles.currency}> VND</Text>
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("DepositScreen")}>
                    <Text style={styles.depositLink}>Nạp Tiền</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardDescription}>
                  Nạp tiền ngay để mở khóa các dịch vụ cao cấp của hệ thống chăm sóc Koi!
                </Text>
              </LinearGradient>
            </View>
          ) : (
            <></>
          )}

          {/* Section: My Koi */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Koi Của Tôi</Text>
          </View>

          <View style={styles.buttonGroup}>
            <Button
              onPress={() => navigation.navigate("FishStatistic")}
              style={styles.button}
            >
              Thống Kê Cá 
            </Button>
            <Button
              onPress={() => navigation.navigate("Shopping")}
              style={styles.button}
            >
              Mua Sắm
            </Button>
          </View>

          {/* Section: My Pond */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hồ Của Tôi</Text>
          </View>

          <View style={styles.buttonGroup}>
            <Button
              onPress={() => navigation.navigate("PondStatistic")}
              type="primary"
              style={styles.pondButton}
            >
              Thống Kê Hồ
            </Button>
            <Button
              type="primary"
              style={styles.pondButton}
              onPress={() => {
                navigation.navigate("WaterParameter");
              }}
            >
              Thông Số Nước
            </Button>
            <Button
              type="primary"
              style={styles.pondButton}
              onPress={() => {
                navigation.navigate("FoodCalculator");
              }}
            >
              Tính Thức Ăn
            </Button>
            <Button
              type="primary"
              style={styles.pondButton}
              onPress={() => {
                navigation.navigate("SaltCalculator");
              }}
            >
              Tính Muối
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default HomeScreen;