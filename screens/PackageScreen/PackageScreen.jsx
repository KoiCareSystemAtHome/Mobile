import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { packageSelector, walletSelector } from "../../redux/selector";
import { getPackage, payPackage } from "../../redux/slices/transactionSlice";
import dayjs from "dayjs";
import { getWallet } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PackageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const packageData = useSelector(packageSelector);
  const walletData = useSelector(walletSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    dispatch(getPackage());
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
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

  const handleChoosePackage = (pkg) => {
    Alert.alert(
      "Confirm Package Selection",
      `Are you sure you want to choose the ${
        pkg.packageTitle
      } package for ${pkg.packagePrice.toLocaleString("vi-VN")} đ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            const email = isLoggedIn?.email;
            const packageId = pkg?.packageId;
            dispatch(payPackage({ email, packageId }))
              .unwrap()
              .then((res) => {
                if (res === "Success") {
                  navigation.navigate("MainTabs");
                  Alert.alert(
                    "Success",
                    "You have successfully purchased the package"
                  );
                  dispatch(getWallet(isLoggedIn?.id));
                }
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Gói Thành Viên</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Wallet Balance */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Số dư:{" "}
            {walletData?.amount
              ? walletData.amount.toLocaleString("vi-VN")
              : "0"}{" "}
            đ
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Trải nghiệm tất cả dịch vụ mới từ Koi Guardian
        </Text>

        {/* Package Cards */}
        {packageData?.map((pkg, index) => {
          const isDisabled = walletData?.amount < pkg.packagePrice;

          return (
            <View key={index} style={styles.packageCard}>
              <View style={styles.cardContent}>
                <Text style={styles.packageTitle}>{pkg.packageTitle}</Text>
                <Text style={styles.packageDescription}>
                  {pkg.packageDescription}
                </Text>
                <Text style={styles.packageDescription}>
                  Mở bán từ: {dayjs(pkg.startDate).format("DD/MM/YYYY")} đến{" "}
                  {dayjs(pkg.endDate).format("DD/MM/YYYY")}
                </Text>
                {/* Price Row */}
                <Text style={styles.packagePrice}>
                  Giá: {pkg.packagePrice.toLocaleString("vi-VN")} đ
                </Text>
                <TouchableOpacity
                  style={[
                    styles.chooseButton,
                    isDisabled && styles.disabledButton,
                  ]}
                  onPress={() => !isDisabled && handleChoosePackage(pkg)}
                  disabled={isDisabled}
                >
                  <Text style={styles.chooseButtonText}>Chọn</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardIcon}>
                <Text style={styles.iconText}>{pkg.type}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
};

export default PackageScreen;
