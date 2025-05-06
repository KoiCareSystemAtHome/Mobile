import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import { getPaymentUrl, withdrawal } from "../../redux/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { createdUrlSelector } from "../../redux/selector";
import { getWallet } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
import { styles } from "./styles";

const DepositScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [isDepositMode, setIsDepositMode] = useState(true);

  const handleCreatePayment = () => {
    if (!money || !description) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ các trường");
      return;
    }
    const email = isLoggedIn?.email;
    const values = { money, description, email };
    setLoading(true);
    dispatch(getPaymentUrl(values))
      .unwrap()
      .then((response) => {
        setPaymentUrl(response.data);
        setShowWebView(true);
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Không thể tạo giao dịch. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.includes("https://loco.com.co/api/Vnpay/CallbackWithUserInfo")) {
      setShowWebView(false);
      setPaymentUrl(null);
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const transactionStatus = urlParams.get("vnp_TransactionStatus");
      if (transactionStatus === "00") {
        Alert.alert("Thành Công", "Giao dịch thành công.");
        navigation.navigate("MainTabs");
        dispatch(getWallet(isLoggedIn?.id));
      } else {
        Alert.alert("Lỗi", "Giao dịch thất bại. Vui lòng thử lại.");
      }
    }
  };

  const getSuggestedAmounts = () => {
    const inputAmount = parseFloat(money) || 0;
    if (inputAmount <= 0) return [1000, 10000, 100000];

    const amounts = [
      inputAmount * 10,
      inputAmount * 100,
      inputAmount * 1000,
    ];

    return amounts.filter((amount) => amount <= 100000000);
  };

  const handleSuggestedAmount = (amount) => {
    setMoney(amount.toString());
  };

  const handleWithdrawal = () => {
    if (!money) {
      Alert.alert("Lỗi", "Hãy nhập số tiền cần rút");
      return;
    }
    const amount = Number(money);
    const userId = isLoggedIn?.id;
    const values = { amount, userId };
    setLoading(true);
    dispatch(withdrawal(values))
      .unwrap()
      .then((res) => {
        Alert.alert("Thành Công", res.message);
        setMoney("");
        setDescription("");
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Rút tiền thất bại. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    if (isDepositMode) {
      handleCreatePayment();
    } else {
      handleWithdrawal();
    }
  };

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

  const suggestedAmounts = getSuggestedAmounts();

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      {showWebView ? (
        <WebView
          source={{ uri: paymentUrl }}
          style={styles.webview}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{isDepositMode ? "Nạp Tiền" : "Rút Tiền"}</Text>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                isDepositMode && styles.toggleButtonActive,
              ]}
              onPress={() => setIsDepositMode(true)}
              accessibilityLabel="Select deposit mode"
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  isDepositMode && styles.toggleButtonTextActive,
                ]}
              >
                Nạp Tiền
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                !isDepositMode && styles.toggleButtonActive,
              ]}
              onPress={() => setIsDepositMode(false)}
              accessibilityLabel="Select withdrawal mode"
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  !isDepositMode && styles.toggleButtonTextActive,
                ]}
              >
                Rút Tiền
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Số tiền (VND)"
            placeholderTextColor="#B0BEC5"
            keyboardType="numeric"
            value={money}
            onChangeText={setMoney}
            accessibilityLabel="Enter amount in VND"
          />

          <View style={styles.suggestedAmountContainer}>
            {suggestedAmounts.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedButton}
                onPress={() => handleSuggestedAmount(amount)}
                accessibilityLabel={`Select ${amount.toLocaleString("vi-VN")} VND`}
                accessibilityRole="button"
              >
                <Text style={styles.suggestedButtonText}>
                  {amount.toLocaleString("vi-VN")} VND
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Mô tả"
            placeholderTextColor="#B0BEC5"
            value={description}
            onChangeText={setDescription}
            accessibilityLabel="Enter transaction description"
          />

          {loading ? (
            <ActivityIndicator size="large" color="#26A69A" />
          ) : (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              accessibilityLabel={isDepositMode ? "Create transaction" : "Create withdrawal request"}
              accessibilityRole="button"
            >
              <Text style={styles.submitButtonText}>
                {isDepositMode ? "Tạo Giao Dịch" : "Tạo Yêu Cầu"}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default DepositScreen;