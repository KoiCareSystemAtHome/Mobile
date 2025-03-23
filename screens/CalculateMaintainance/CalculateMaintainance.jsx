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
import WebView from "react-native-webview";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getPaymentUrl } from "../../redux/slices/transactionSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

const DepositScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, []);

  const handleCreatePayment = () => {
    if (!money || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    const email = isLoggedIn?.email;
    const values = { money, description, email };
    dispatch(getPaymentUrl(values))
      .unwrap()
      .then((response) => {
        setPaymentUrl(response.data);
        setShowWebView(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", "Failed to create payment URL");
        console.error(error);
      });
  };

  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.includes("http://14.225.206.203:8080/api/Vnpay/CallbackWithUserInfo")) {
      setShowWebView(false);
      setPaymentUrl(null);
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const transactionStatus = urlParams.get("vnp_TransactionStatus");
      if (transactionStatus === "00") {
        Alert.alert("Success", "Transaction completed successfully!");
        navigation.navigate("MainTabs");
        dispatch(getWallet(isLoggedIn?.id));
      } else {
        Alert.alert("Error", "Payment failed. Please try again.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      {showWebView ? (
        <WebView
          source={{ uri: paymentUrl }}
          style={styles.webview}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              size="large"
              color="#FFA500"
              style={styles.loading}
            />
          )}
        />
      ) : (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Deposit</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Amount (VND)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={money}
              onChangeText={setMoney}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleCreatePayment}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create Payment</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default DepositScreen;