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
  ScrollView,
  RefreshControl,
} from "react-native";
import { Card, Button, Badge } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Image } from "react-native-elements";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tooltip from "react-native-walkthrough-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  tokenSelector,
  userSelector,
  walletSelector,
} from "../../redux/selector";
import { getWallet, resetState } from "../../redux/slices/authSlice";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const walletData = useSelector(walletSelector);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAnimation] = useState(new Animated.Value(-270));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const tokenState = useSelector(tokenSelector);
  const userState = useSelector(userSelector);

  const toggleDrawer = () => {
    if (drawerOpen) {
      Animated.timing(drawerAnimation, {
        toValue: -270,
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

  const handleOutsidePress = () => {
    if (drawerOpen) {
      toggleDrawer();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const value = await AsyncStorage.getItem("user");
      setIsLoggedIn(value ? JSON.parse(value) : null);

      const newToken = await AsyncStorage.getItem("accessToken");
      setToken(newToken);

      if (isLoggedIn?.id) {
        await dispatch(getWallet(isLoggedIn?.id)).unwrap();
      }
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
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
      await AsyncStorage.removeItem("cart");
      await AsyncStorage.removeItem("address");
      await AsyncStorage.removeItem("userInfo");
      dispatch(resetState());
      setIsLoggedIn(null);
      setToken(null);
      setTooltipVisible(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Determine if buttons should be disabled
  const isRestricted = isLoggedIn?.packageID == null;

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
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
            <Text style={styles.drawerUserName}>Xin chào,</Text>
            <Text style={styles.drawerUserRole}>
              {isLoggedIn || userState
                ? isLoggedIn?.name || userState?.name
                : "User"}
            </Text>
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

      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#6497B1"]}
                tintColor="#6497B1"
              />
            }
          >
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
                          navigation.navigate("Register");
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
                Xin Chào{" "}
                {isLoggedIn || userState
                  ? isLoggedIn?.name || userState?.name
                  : "User"}
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
                      <Text style={styles.amount}>
                        {walletData?.amount?.toLocaleString("vi-VN") || "0"}
                      </Text>
                      <Text style={styles.currency}> VND</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("DepositScreen")}
                    >
                      <Text style={styles.depositLink}>Nạp/Rút</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cardDescription}>
                    Nạp tiền ngay để mở khóa các dịch vụ cao cấp của hệ thống
                    chăm sóc Koi!
                  </Text>
                </LinearGradient>
              </View>
            ) : (
              <></>
            )}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Koi Của Tôi</Text>
            </View>

            <View style={styles.buttonGroup}>
              <Button
                onPress={() => navigation.navigate("FishStatistic")}
                style={[styles.button, isRestricted && styles.disabledButton]}
                disabled={isRestricted}
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

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Hồ Của Tôi</Text>
            </View>

            <View style={styles.buttonGroup}>
              <Button
                onPress={() => navigation.navigate("PondStatistic")}
                type="primary"
                style={[styles.pondButton, isRestricted && styles.disabledButton]}
                disabled={isRestricted}
              >
                Thống Kê Hồ
              </Button>
              <Button
                type="primary"
                style={[styles.pondButton, isRestricted && styles.disabledButton]}
                onPress={() => navigation.navigate("WaterParameter")}
                disabled={isRestricted}
              >
                Thông Số Nước
              </Button>
              <Button
                type="primary"
                style={[styles.pondButton, isRestricted && styles.disabledButton]}
                onPress={() => navigation.navigate("FoodCalculator")}
                disabled={isRestricted}
              >
                Tính Thức Ăn
              </Button>
              <Button
                type="primary"
                style={[styles.pondButton, isRestricted && styles.disabledButton]}
                onPress={() => navigation.navigate("SaltCalculator")}
                disabled={isRestricted}
              >
                Tính Muối
              </Button>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default HomeScreen;