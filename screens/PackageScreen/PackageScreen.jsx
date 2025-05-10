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
      if (userData) {
        const user = JSON.parse(userData);
        user.packageID = newPackageId;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(user);
      }
    } catch (error) {
      console.error("Không thể cập nhật packageID trong AsyncStorage:", error);
    }
  };

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

  const currentPackage = packageData?.find(
    (pkg) => pkg.packageId === isLoggedIn?.packageID
  );
  const currentPackageName = currentPackage?.packageTitle || "Không có";

  const handleChoosePackage = (pkg) => {
    const email = isLoggedIn?.email;
    const packageId = pkg?.packageId;
    const packageTitle = pkg?.packageTitle;

    if (isLoggedIn?.packageID) {
      console.log(email, packageId)
      dispatch(payPackage({ email, packageId, confirmPurchase: false }))
        .unwrap()
        .then((res) => {
          if (res && res.confirmationRequired) {
            const daysLeftMatch = res.message.match(
              /\((\d+\.\d+)\s+còn\s+lại\)/
            );
            const daysLeft = daysLeftMatch
              ? parseFloat(daysLeftMatch[1])
              : "không xác định";
            const originalPrice = pkg.packagePrice;
            const discountedPrice = parseFloat(res.discountedPrice);
            const discountPercentage = Math.round(
              ((originalPrice - discountedPrice) / originalPrice) * 100
            );

            Alert.alert(
              "Nâng cấp gói",
              `Gói hiện tại: "${currentPackageName}" có hạn đến ${
                res.expirationDate.split("UTC")[0]
              } (${daysLeft} ngày còn lại).\n\nNâng cấp lên gói "${packageTitle}" chỉ với giá ${discountedPrice.toLocaleString(
                "vi-VN"
              )} VND và tiết kiệm ${discountPercentage}%!\n\nBạn có muốn nâng cấp?`,
              [
                {
                  text: "Hủy",
                  style: "cancel",
                },
                {
                  text: "Nâng cấp",
                  style: "default",
                  onPress: () => {
                    dispatch(
                      payPackage({ email, packageId, confirmPurchase: true })
                    )
                      .unwrap()
                      .then((finalRes) => {
                        if (
                          finalRes.message === "Package upgraded successfully!"
                        ) {
                          updateUserPackage(packageId);
                          dispatch(getWallet(isLoggedIn?.id));
                          navigation.navigate("MainTabs");
                          Alert.alert(
                            "Nâng cấp thành công!",
                            `Bạn đã nâng cấp thành công lên gói "${packageTitle}". Hãy trải nghiệm Koi Guardian với các tính năng nâng cao!`,
                            [
                              {
                                text: "Tuyệt vời!",
                                style: "default",
                              },
                            ],
                            { cancelable: false }
                          );
                        }
                      })
                      .catch((err) => {
                        Alert.alert(
                          "Đã có lỗi xảy ra",
                          "Chúng tôi không thể xử lý nâng cấp của bạn. Vui lòng thử lại hoặc liên hệ hỗ trợ.",
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
          } else {
            Alert.alert("Không thành công", res.message);
          }
        })
        .catch((err) => {
          console.error(err);
          Alert.alert(
            "Không thể kiểm tra gói",
            "Chúng tôi không thể xác minh gói hiện tại của bạn. Vui lòng thử lại hoặc liên hệ hỗ trợ.",
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
        "Xác nhận mua hàng",
        `Bạn đã sẵn sàng mở khóa gói "${packageTitle}" với giá ${pkg.packagePrice.toLocaleString(
          "vi-VN"
        )} VND?\n\nTận hưởng các tính năng độc quyền của Koi Guardian được thiết kế dành riêng cho bạn!`,
        [
          {
            text: "Không phải bây giờ",
            style: "cancel",
          },
          {
            text: "Mua ngay",
            style: "default",
            onPress: () => {
              dispatch(payPackage({ email, packageId, confirmPurchase: true }))
                .unwrap()
                .then((res) => {
                  updateUserPackage(packageId);
                  dispatch(getWallet(isLoggedIn?.id));
                  navigation.navigate("MainTabs");
                  Alert.alert(
                    "Mua hàng thành công!",
                    `Bạn đã mua thành công gói "${packageTitle}". Hãy khám phá trải nghiệm Koi Guardian nâng cao của bạn!`,
                    [
                      {
                        text: "Tuyệt vời!",
                        style: "default",
                      },
                    ],
                    { cancelable: false }
                  );
                })
                .catch((err) => {
                  Alert.alert(
                    "Đã có lỗi xảy ra",
                    "Chúng tôi không thể xử lý giao dịch mua của bạn. Vui lòng thử lại hoặc liên hệ hỗ trợ.",
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Gói Thành Viên</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
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
          Trải nghiệm tất cả các dịch vụ mới từ Koi Guardian
        </Text>
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
