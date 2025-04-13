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
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const updateUserPackage = async (newPackageId) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      console.log("a", newPackageId);
      if (userData) {
        const user = JSON.parse(userData);
        user.packageID = newPackageId;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(user);
      }
    } catch (error) {
      console.error("Failed to update packageID in AsyncStorage:", error);
    }
  };
  useEffect(() => {
    dispatch(getPackage());
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        console.log(value);
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

  const currentPackage = packageData?.find(
    (pkg) => pkg.packageId === isLoggedIn?.packageID
  );
  const currentPackageName = currentPackage?.packageTitle || "None";

  const handleChoosePackage = (pkg) => {
    const email = isLoggedIn?.email;
    const packageId = pkg?.packageId;
    const packageTitle = pkg?.packageTitle;
    if (isLoggedIn?.packageID) {
      dispatch(payPackage({ email, packageId, confirmPurchase: false }))
        .unwrap()
        .then((res) => {
          if (res.confirmationRequired) {
            const daysLeftMatch = res.message.match(
              /\((\d+\.\d+)\s+days\s+left\)/
            );
            const daysLeft = daysLeftMatch ? daysLeftMatch[1] : "unknown";
            const originalPrice = pkg.packagePrice;
            const discountedPrice = parseFloat(res.discountedPrice);
            const discountPercentage = Math.round(
              ((originalPrice - discountedPrice) / originalPrice) * 100
            );
            Alert.alert(
              "Upgrade Your Package",
              `Your current package ("${currentPackageName}") is active until ${dayjs(
                res.expirationDate
              ).format(
                "DD/MM/YYYY [at] HH:mm:ss"
              )} (${daysLeft} days left).\n\nUpgrade to the "${packageTitle}" package for just ${discountedPrice.toLocaleString(
                "vi-VN"
              )} VND and save ${discountPercentage}%!\n\nWould you like to proceed?`,
              [
                {
                  text: "Not Now",
                  style: "cancel",
                },
                {
                  text: "Upgrade Now",
                  style: "default",
                  onPress: () => {
                    dispatch(
                      payPackage({ email, packageId, confirmPurchase: true })
                    )
                      .unwrap()
                      .then((finalRes) => {
                        console.log(finalRes)
                        if (finalRes.message === "Package upgraded successfully!") {
                          updateUserPackage(packageId);
                          navigation.navigate("MainTabs");
                          Alert.alert(
                            "Purchase Successful!",
                            `You’ve successfully upgraded to the "${packageTitle}" package. Enjoy your enhanced Koi Guardian experience!`,
                            [
                              {
                                text: "Great!",
                                style: "default",
                              },
                            ],
                            { cancelable: false }
                          );
                          dispatch(getWallet(isLoggedIn?.id));
                        }
                      })
                      .catch((err) => {
                        Alert.alert(
                          "Oops, Something Went Wrong",
                          "We couldn’t process your upgrade. Please try again or contact support.",
                          [
                            {
                              text: "OK",
                              style: "default",
                            },
                          ],
                          { cancelable: false }
                        );
                      });
                  },
                },
              ],
              {
                cancelable: false,
              }
            );
          }
        })
        .catch((err) => {
          console.error(err);
          Alert.alert(
            "Unable to Check Package",
            "We couldn’t verify your current package. Please try again or contact support.",
            [
              {
                text: "OK",
                style: "default",
              },
            ],
            { cancelable: false }
          );
        });
    } else {
      Alert.alert(
        "Confirm Your Purchase",
        `Ready to unlock the "${packageTitle}" package for ${pkg.packagePrice.toLocaleString(
          "vi-VN"
        )} VND?\n\nEnjoy exclusive Koi Guardian features tailored for you!`,
        [
          {
            text: "Not Now",
            style: "cancel",
          },
          {
            text: "Purchase Now",
            style: "default",
            onPress: () => {
              dispatch(payPackage({ email, packageId, confirmPurchase: true }))
                .unwrap()
                .then((res) => {
                  if (res === "Success") {
                    updateUserPackage(packageId); // Update AsyncStorage
                    navigation.navigate("MainTabs");
                    Alert.alert(
                      "Purchase Successful!",
                      `You’ve successfully purchased the "${packageTitle}" package. Dive into your enhanced Koi Guardian experience!`,
                      [
                        {
                          text: "Great!",
                          style: "default",
                        },
                      ],
                      { cancelable: false }
                    );
                    dispatch(getWallet(isLoggedIn?.id));
                  }
                })
                .catch((err) => {
                  Alert.alert(
                    "Oops, Something Went Wrong",
                    "We couldn’t process your purchase. Please try again or contact support.",
                    [
                      {
                        text: "OK",
                        style: "default",
                      },
                    ],
                    { cancelable: false }
                  );
                });
            },
          },
        ],
        { cancelable: false }
      );
    }
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
        <Text style={styles.title}>Gói Thành Viên</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Wallet Balance and Current Package */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Số dư:{" "}
            {walletData?.amount
              ? walletData.amount.toLocaleString("vi-VN")
              : "0"}{" "}
            VND
          </Text>
          <Text style={styles.currentPackageText}>
            Gói hiện tại: {currentPackageName}
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
                <Text style={styles.packagePrice}>
                  Giá: {pkg.packagePrice.toLocaleString("vi-VN")} VND
                </Text>
                <TouchableOpacity
                  style={[
                    styles.chooseButton,
                    isDisabled && styles.disabledButton,
                  ]}
                  onPress={() => !isDisabled && handleChoosePackage(pkg)}
                  disabled={isDisabled}
                >
                  <Text style={styles.chooseButtonText}>Chọn</Text>
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
