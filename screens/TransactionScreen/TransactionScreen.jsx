import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using expo-vector-icons
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDepositTransaction, getOrderTransaction, getPackageTransaction } from "../../redux/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { depositTransactionOrder, orderTransactionSelector, packageTransactionSelector } from "../../redux/selector";
import dayjs from "dayjs";

const paymentData = [
  {
    id: "123",
    date: "Wed, 1 November 2023",
    total: "200,000",
  },
  {
    id: "124",
    date: "Thu, 2 November 2023",
    total: "300,000",
  },
];

const productData = [
  {
    id: "125",
    date: "Fri, 3 November 2023",
    total: "150,000",
  },
];

const membershipData = [
  {
    id: "126",
    date: "Sat, 4 November 2023",
    total: "500,000",
  },
];

const TransactionScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Thanh toán");
  const orderTransactionData = useSelector(orderTransactionSelector)
  const packageTransactionData = useSelector(packageTransactionSelector)
  const depositeTransactionData = useSelector(depositTransactionOrder)
  const getDataForTab = () => {
    switch (activeTab) {
      case "Thanh toán":
        return depositeTransactionData;
      case "Sản phẩm":
        return orderTransactionData;
      case "Gói member":
        return packageTransactionData;
      default:
        return paymentData;
    }
  };

  // Render each transaction item
  const renderDepositData = ({ item }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.orderNumber}>ĐƠN SỐ #{item.vnPayTransactionId}</Text>
      <Text style={styles.orderDetails}>
        Mua ngày: {dayjs(item.transactionDate).format("ddd, D MMMM YYYY")}
      </Text>
    <Text style={styles.orderTotal}>Tổng tiền: {item.amount}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.buttonText}>Đánh giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyAgainButton}>
          <Text style={styles.buttonText}>Mua lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          dispatch(getOrderTransaction(isLoggedIn.id));
          dispatch(getPackageTransaction(isLoggedIn.id));
          dispatch(getDepositTransaction(isLoggedIn.id));
        }
      }, [isLoggedIn?.id, dispatch]);
    

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Purchase History</Text>
          <TouchableOpacity onPress={() => console.log("Logout")}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Thanh toán" && styles.activeTab]}
            onPress={() => setActiveTab("Thanh toán")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Thanh toán" && styles.activeTabText,
              ]}
            >
              Thanh toán
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Sản phẩm" && styles.activeTab]}
            onPress={() => setActiveTab("Sản phẩm")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Sản phẩm" && styles.activeTabText,
              ]}
            >
              Sản phẩm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Gói member" && styles.activeTab]}
            onPress={() => setActiveTab("Gói member")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Gói member" && styles.activeTabText,
              ]}
            >
              Gói member
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        <FlatList
          data={getDataForTab()}
          renderItem={renderDepositData}
          keyExtractor={(item) => item.transactionId}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

// Update styles.js

export default TransactionScreen;
