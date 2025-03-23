import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import WebView from "react-native-webview";
import { getPaymentUrl } from "../../redux/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { createdUrlSelector } from "../../redux/selector";
import { getWallet } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const email = isLoggedIn?.email
    const values = {money, description, email}
    dispatch(getPaymentUrl(values))
      .unwrap()
      .then((response) => {
        setPaymentUrl(response.data);
        setShowWebView(true);
      });
  };
  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    if (
      url.includes("http://14.225.206.203:8080/api/Vnpay/CallbackWithUserInfo")
    ) {
      setShowWebView(false);
      setPaymentUrl(null);
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const transactionStatus = urlParams.get("vnp_TransactionStatus");
      if (transactionStatus === "00") {
        Alert.alert("Success", "Giao dịch thành công. Giao dịch thành công.");
        navigation.navigate("MainTabs")
        dispatch(getWallet(isLoggedIn?.id));
      } else {
        Alert.alert("Error", "Payment failed. Please try again.");
      }
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
  

  return (
    <View style={styles.container}>
      {!showWebView ? (
        <>
          <Text style={styles.title}>VNPay Payment</Text>

          <TextInput
            style={styles.input}
            placeholder="Amount (VND)"
            keyboardType="numeric"
            value={money}
            onChangeText={setMoney}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

       

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Create Payment" onPress={handleCreatePayment} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});

export default DepositScreen;
