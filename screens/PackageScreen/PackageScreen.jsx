import React, { useEffect, useState } from 'react';
import { 
  ImageBackground, 
  Text, 
  TouchableOpacity, 
  View, 
  ScrollView,
  Alert
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { packageSelector, walletSelector } from '../../redux/selector';
import { getPackage, payPackage } from '../../redux/slices/transactionSlice';
import dayjs from 'dayjs';
import { getWallet } from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PackageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const packageData = useSelector(packageSelector);
  const walletData = useSelector(walletSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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

  console.log(isLoggedIn, "isLoggedIn");

  const handleChoosePackage = (pkg) => {
    const email = isLoggedIn?.email;
    const packageId = pkg?.packageId;

    // Check if the user already has an active package (isLoggedIn.packageID exists)
    if (isLoggedIn?.packageID) {
      // Dispatch payPackage with confirmPurchase: false to check the existing package
      dispatch(payPackage({ email, packageId, confirmPurchase: false }))
        .unwrap()
        .then((res) => {
          // Display the confirmation popup based on the response
          Alert.alert(
            "Existing Package Detected",
            `Your current package is active until ${res.expirationDate} UTC (${res.daysLeft} days left).\nYou can upgrade to the new package for ${res.discountPrice.toLocaleString('vi-VN')} VND, a discount of ${res.discountPercentage}%.\nConfirm to proceed?`,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Confirm",
                onPress: () => {
                  // Dispatch payPackage again with confirmPurchase: true
                  dispatch(payPackage({ email, packageId, confirmPurchase: true }))
                    .unwrap()
                    .then((finalRes) => {
                      if (finalRes === "Success") {
                        navigation.navigate("MainTabs");
                        Alert.alert("Success", "You have successfully purchased the package");
                        dispatch(getWallet(isLoggedIn?.id));
                      }
                    })
                    .catch((err) => {
                      Alert.alert("Error", "Failed to purchase the package. Please try again.");
                    });
                },
              },
            ],
            { cancelable: false }
          );
        })
        .catch((err) => {
          Alert.alert("Error", "Failed to check your current package. Please try again.");
        });
    } else {
      // No existing package, proceed with confirmPurchase: true directly
      Alert.alert(
        "Confirm Package Selection",
        `Are you sure you want to choose the ${pkg.packageTitle} package for ${pkg.packagePrice.toLocaleString('vi-VN')} VND?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => {
              dispatch(payPackage({ email, packageId, confirmPurchase: true }))
                .unwrap()
                .then((res) => {
                  if (res === "Success") {
                    navigation.navigate("MainTabs");
                    Alert.alert("Success", "You have successfully purchased the package");
                    dispatch(getWallet(isLoggedIn?.id));
                  }
                })
                .catch((err) => {
                  Alert.alert("Error", "Failed to purchase the package. Please try again.");
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
      source={require('../../assets/koimain3.jpg')}
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
            Số dư: {walletData?.amount ? walletData.amount.toLocaleString('vi-VN') : '0'} VND
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
                <Text style={styles.packageDescription}>{pkg.packageDescription}</Text>
                <Text style={styles.packageDescription}>
                  Mở bán từ: {dayjs(pkg.startDate).format('DD/MM/YYYY')} đến{' '}
                  {dayjs(pkg.endDate).format('DD/MM/YYYY')}
                </Text>
                {/* Price Row */}
                <Text style={styles.packagePrice}>
                  Giá: {pkg.packagePrice.toLocaleString('vi-VN')} VND
                </Text>
                <TouchableOpacity 
                  style={[
                    styles.chooseButton,
                    isDisabled && styles.disabledButton
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