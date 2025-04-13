import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDepositTransaction,
  getOrderTransaction,
  getPackageTransaction,
} from "../../redux/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  depositTransactionOrder,
  orderTransactionSelector,
  packageTransactionSelector,
} from "../../redux/selector";
import dayjs from "dayjs";

const TransactionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Thanh toán");
  const [expandedItems, setExpandedItems] = useState({}); // State to track expanded transactions

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 10 transactions per page

  const orderTransactionData = useSelector(orderTransactionSelector);
  const packageTransactionData = useSelector(packageTransactionSelector);
  const depositeTransactionData = useSelector(depositTransactionOrder);

  const getDataForTab = () => {
    switch (activeTab) {
      case "Thanh toán":
        return depositeTransactionData;
      case "Sản phẩm":
        return orderTransactionData;
      case "Gói member":
        return packageTransactionData;
      default:
        return [];
    }
  };

  // Get transactions data and calculate pagination
  const transactions = getDataForTab();
  const totalPages = Math.ceil(transactions?.length / itemsPerPage);
  const paginatedTransactions = transactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle expanded state for a transaction
  const toggleExpand = (transactionId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  // Render each transaction item
  const renderDepositData = ({ item }) => {
    const isExpanded = expandedItems[item.transactionId] || false;

    return (
      <View style={styles.transactionCard}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={styles.orderNumber}>
              {item?.pakageName
                ? `Gói ${item?.pakageName}`
                : `Đơn ${item?.vnPayTransactionId}`}
            </Text>
            <Text style={styles.orderDetails}>
              Mua ngày: {dayjs(item.transactionDate).format("ddd, D MMMM YYYY")}
            </Text>
            <Text style={styles.orderTotal}>Tổng tiền: {item.amount.toLocaleString('vi-VN')} VND</Text>
          </View>
          {/* Show down arrow only for "Sản phẩm" tab and if payment details exist */}
          {activeTab === "Sản phẩm" && item.payment && (
            <TouchableOpacity onPress={() => toggleExpand(item.transactionId)}>
              <AntDesign
                name={isExpanded ? "up" : "down"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Payment Details (shown when expanded) */}
        {activeTab === "Sản phẩm" && isExpanded && item.payment && (
          <View style={{ marginTop: 10, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 5 }}>
            <Text style={styles.orderDetails}>
              Số tiền thanh toán: {item.payment.amount.toLocaleString('vi-VN')} VND
            </Text>
            <Text style={styles.orderDetails}>
              Ngày thanh toán: {dayjs(item.payment.date).format("ddd, D MMMM YYYY, HH:mm:ss")}
            </Text>
            <Text style={styles.orderDetails}>
              Mô tả: {item.payment.description}
            </Text>
          </View>
        )}
      </View>
    );
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


  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getOrderTransaction(isLoggedIn.id));
      dispatch(getPackageTransaction(isLoggedIn.id));
      dispatch(getDepositTransaction(isLoggedIn.id));
    }
  }, [isLoggedIn?.id, dispatch]);

  // Pagination controls
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
    setExpandedItems({}); // Reset expanded state when tab changes
  }, [activeTab]);

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
          <Text style={styles.title}>Lịch Sử Giao Dịch</Text>
          <View style={{ width: 24 }} />
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
          data={paginatedTransactions}
          renderItem={renderDepositData}
          keyExtractor={(item) => item.transactionId}
          contentContainerStyle={styles.listContainer}
        />

        {/* Pagination Controls */}
        {transactions?.length > 0 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                currentPage === 1 && styles.disabledButton,
              ]}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationText}>
                <AntDesign name="left" size={20} color="black" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.pageText}>
              {currentPage}/{totalPages}
            </Text>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                currentPage === totalPages && styles.disabledButton,
              ]}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationText}>
                <AntDesign name="right" size={20} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TransactionScreen;