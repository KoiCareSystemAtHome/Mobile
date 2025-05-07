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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDepositTransaction,
  getOrderTransaction,
  getPackageTransaction,
  getUserWithdraw,
} from "../../redux/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  depositTransactionOrder,
  orderTransactionSelector,
  packageTransactionSelector,
  userWithdrawalSelector,
} from "../../redux/selector";
import dayjs from "dayjs";

const TransactionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Thanh toán");
  const [expandedItems, setExpandedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const orderTransactionData = useSelector(orderTransactionSelector);
  const packageTransactionData = useSelector(packageTransactionSelector);
  const depositeTransactionData = useSelector(depositTransactionOrder);
  const withdrawalData = useSelector(userWithdrawalSelector);

  const getDataForTab = () => {
    switch (activeTab) {
      case "Thanh toán":
        return depositeTransactionData;
      case "Sản phẩm":
        return orderTransactionData;
      case "Gói member":
        return packageTransactionData;
      case "Yêu cầu rút":
        return withdrawalData;
      default:
        return [];
    }
  };

  const transactions = getDataForTab();
  const totalPages = Math.ceil(transactions?.length / itemsPerPage);
  const paginatedTransactions = transactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleExpand = (transactionId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const renderTransactionData = ({ item }) => {
    const isExpanded = expandedItems[item.transactionId] || false;

    if (activeTab === "Yêu cầu rút") {
      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      };

      const translateStatus = (status) => {
        switch (status) {
          case "Pending":
            return "Đang chờ";
          case "Approve":
            return "Đã duyệt";
          case "Reject":
            return "Bị từ chối";
          default:
            return status;
        }
      };

      return (
        <View style={styles.transactionCard}>
          <View style={styles.cardContent}>
            <View style={styles.infoHeader}>
              <Text style={styles.orderNumber}>
                Yêu cầu rút tiền {formatDate(item.createDate)}
              </Text>
              <FontAwesome
                name="money"
                size={20}
                color="#26A69A"
                style={styles.icon}
              />
            </View>
            <Text style={styles.orderDetails}>
              Ngày yêu cầu: {formatDate(item.createDate)}
            </Text>
            <Text style={styles.orderTotal}>
              Số tiền: {item.money.toLocaleString("vi-VN")} VND
            </Text>
            <Text style={styles.orderDetails}>
              Trạng thái: {translateStatus(item.status)}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.transactionCard}>
        <View style={styles.cardContent}>
          <View style={styles.infoHeader}>
            <Text style={styles.orderNumber}>
              {item?.pakageName
                ? `Gói ${item?.pakageName}`
                : `Đơn ${item?.vnPayTransactionId}`}
            </Text>
            <FontAwesome
              name="money"
              size={20}
              color="#26A69A"
              style={styles.icon}
            />
          </View>
          {activeTab === "Sản phẩm" && (
            <>
              {((item.refund && item.payment) || (item.transactionType === "Cancel")) && (
                <Text style={[styles.statusText, { color: "#EF5350" }]}>
                  Đơn đã được hủy
                </Text>
              )}
              {item.payment && !item.refund && (
                <Text style={[styles.statusText, { color: "#26A69A" }]}>
                  Đơn đã được trả
                </Text>
              )}
              {!item.payment && !item.refund && item.transactionType !== "Cancel" && (
                <Text style={[styles.statusText, { color: "#FFB300" }]}>
                  Chờ thanh toán
                </Text>
              )}
            </>
          )}
          <Text style={styles.orderDetails}>
            Mua ngày: {dayjs(item.transactionDate).format("ddd, D MMMM YYYY")}
          </Text>
          <Text style={styles.orderTotal}>
            Tổng tiền: {item.amount.toLocaleString("vi-VN")} VND
          </Text>
          {(item.payment || item.refund) && (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleExpand(item.transactionId)}
              accessibilityLabel={isExpanded ? "Collapse details" : "Expand details"}
              accessibilityRole="button"
            >
              <AntDesign
                name={isExpanded ? "up" : "down"}
                size={20}
                color="#004D40"
              />
            </TouchableOpacity>
          )}
        </View>

        {isExpanded && (item.payment || item.refund) && (
          <View style={styles.expandedContent}>
            {item.payment && (
              <View style={styles.paymentContainer}>
                <Text style={styles.detailText}>
                  Số tiền thanh toán:{" "}
                  {item.payment.amount.toLocaleString("vi-VN")} VND
                </Text>
                <Text style={styles.detailText}>
                  Ngày thanh toán:{" "}
                  {dayjs(item.payment.date).format(
                    "ddd, D MMMM YYYY, HH:mm:ss"
                  )}
                </Text>
                <Text style={styles.detailText}>
                  Phương thức: {item.payment.paymentMethod || "Không xác định"}
                </Text>
                <Text style={styles.detailText}>
                  Mô tả: {item.payment.description}
                </Text>
              </View>
            )}
            {item.refund && (
              <View style={styles.refundContainer}>
                <Text style={styles.detailText}>
                  Số tiền hoàn: {item.refund.amount.toLocaleString("vi-VN")} VND
                </Text>
                <Text style={styles.detailText}>
                  Ngày hoàn:{" "}
                  {dayjs(item.refund.date).format("ddd, D MMMM YYYY, HH:mm:ss")}
                </Text>
                <Text style={styles.detailText}>
                  Mô tả: {item.refund.description}
                </Text>
              </View>
            )}
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
      dispatch(getUserWithdraw(isLoggedIn.id));
    }
  }, [isLoggedIn?.id, dispatch]);

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

  useEffect(() => {
    setCurrentPage(1);
    setExpandedItems({});
  }, [activeTab]);

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <AntDesign name="left" size={24} color="#004D40" />
          </TouchableOpacity>
          <Text style={styles.title}>Lịch Sử Giao Dịch</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Thanh toán" && styles.activeTab]}
            onPress={() => setActiveTab("Thanh toán")}
            accessibilityLabel="View payment transactions"
            accessibilityRole="button"
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
            accessibilityLabel="View product transactions"
            accessibilityRole="button"
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
            accessibilityLabel="View package transactions"
            accessibilityRole="button"
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
          <TouchableOpacity
            style={[styles.tab, activeTab === "Yêu cầu rút" && styles.activeTab]}
            onPress={() => setActiveTab("Yêu cầu rút")}
            accessibilityLabel="View withdrawal requests"
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Yêu cầu rút" && styles.activeTabText,
              ]}
            >
              Yêu cầu rút
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={paginatedTransactions}
          renderItem={renderTransactionData}
          keyExtractor={(item) => item.transactionId || item.id}
          contentContainerStyle={styles.listContainer}
        />
        {transactions?.length > 0 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                currentPage === 1 && styles.disabledButton,
              ]}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
              accessibilityLabel="Previous page"
              accessibilityRole="button"
            >
              <AntDesign name="left" size={20} color="#FFFFFF" />
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
              accessibilityLabel="Next page"
              accessibilityRole="button"
            >
              <AntDesign name="right" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TransactionScreen;