import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import { getPaymentUrl } from "../../redux/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { createdUrlSelector } from "../../redux/selector";
import { getWallet } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

const DepositScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  const handleCreatePayment = () => {
    if (!money || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    const email = isLoggedIn?.email;
    const values = { money, description, email };
    dispatch(getPaymentUrl(values))
      .unwrap()
      .then((response) => {
        setPaymentUrl(response.data);
        setShowWebView(true);
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
        Alert.alert("Success", "Giao dịch thành công. Giao dịch thành công.");
        navigation.navigate("MainTabs");
        dispatch(getWallet(isLoggedIn?.id));
      } else {
        Alert.alert("Error", "Payment failed. Please try again.");
      }
    }
  };

  // Calculate suggested amounts based on the input
  const getSuggestedAmounts = () => {
    const inputAmount = parseFloat(money) || 0;
    if (inputAmount <= 0) return [1000, 10000, 100000]; // Default values if no input

    // Calculate suggested amounts by multiplying the input by 10, 100, and 1,000
    const amounts = [
      inputAmount * 10,    // e.g., 100 -> 1,000
      inputAmount * 100,   // e.g., 100 -> 10,000
      inputAmount * 1000,  // e.g., 100 -> 100,000
    ];

    // Filter out amounts greater than 10 million (10,000,000)
    return amounts.filter((amount) => amount <= 100000000);
  };

  // Handle button press to set the money value
  const handleSuggestedAmount = (amount) => {
    setMoney(amount.toString());
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
      // resizeMode="cover"
    >
      <View style={styles.overlay} />
      {!showWebView ? (
        <>
          <Text style={styles.title}>Nạp tiền</Text>

          <TextInput
            style={styles.input}
            placeholder="Số tiền (VND)"
            keyboardType="numeric"
            value={money}
            onChangeText={setMoney}
          />

          {/* Suggested Amount Buttons */}
          <View style={styles.suggestedAmountContainer}>
            {suggestedAmounts.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedButton}
                onPress={() => handleSuggestedAmount(amount)}
              >
                <Text style={styles.suggestedButtonText}>
                  {amount.toLocaleString('vi-VN')} VND
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Mô tả"
            value={description}
            onChangeText={setDescription}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleCreatePayment}
              >
                <Text style={styles.submitButtonText}>Tạo giao dịch</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <WebView
          source={{ uri: paymentUrl }}
          style={styles.webview}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  webview: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  suggestedAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  suggestedButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  suggestedButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:12
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DepositScreen;