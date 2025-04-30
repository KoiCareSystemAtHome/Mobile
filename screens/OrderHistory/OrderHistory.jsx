import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { Provider, Toast } from "@ant-design/react-native";
import { styles } from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByAccount, resetOrderTrack } from "../../redux/slices/ghnSlice";
import { orderbyAccountSelector, productSelector } from "../../redux/selector";
import { getProduct } from "../../redux/slices/productSlice";

const OrderHistory = ({ navigation }) => {
  const dispatch = useDispatch();
  const productData = useSelector(productSelector);
  const orderData = useSelector(orderbyAccountSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orderData?.length / itemsPerPage);
  const paginatedOrderData = orderData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("user");
        setIsLoggedIn(userInfo ? JSON.parse(userInfo) : null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getProduct());
      dispatch(getOrderByAccount(isLoggedIn?.id));
      dispatch(resetOrderTrack())
    }
  }, [dispatch, isLoggedIn]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const userInfo = await AsyncStorage.getItem("user");
      const user = userInfo ? JSON.parse(userInfo) : null;
      setIsLoggedIn(user);

      if (user?.id) {
        await Promise.all([
          dispatch(getProduct()).unwrap(),
          dispatch(getOrderByAccount(user.id)).unwrap(),
        ]);
        Toast.success("Dữ liệu đã được làm mới");
      }
    } catch (error) {
      console.error("Refresh failed:", error);
      Toast.fail("Làm mới dữ liệu thất bại");
    } finally {
      setRefreshing(false);
      setCurrentPage(1); // Reset to first page after refresh
    }
  };

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

  const calculateOrderTotal = (order) => {
    return order?.details?.reduce((total, item) => {
      const matchedProduct = productData?.find(
        (product) => product.productId === item.productId
      );
      return (
        total + (matchedProduct ? item.quantity * matchedProduct.price : 0)
      );
    }, 0);
  };


  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Lịch Sử Đơn Hàng</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0077B6"]}
              tintColor="#0077B6"
            />
          }
        >
          {paginatedOrderData?.length > 0 ? (
            paginatedOrderData.map((order) => (
              <TouchableOpacity
                key={order.orderId}
                style={styles.orderCard}
                onPress={() => {
                  navigation.navigate("OrderTracking", { order, userId: isLoggedIn?.id });
                }}
                activeOpacity={0.8}
              >
                <View style={styles.orderHeader}>
                  <Text style={styles.storeName}>{order.store}</Text>
                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          order.status === "Delivered"
                            ? "#10B981"
                            : order.status === "Pending"
                            ? "#FBBF24"
                            : "#EF4444",
                      },
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>

                {order?.details?.map((item) => {
                  const matchedProduct = productData?.find(
                    (product) => product.productId === item.productId
                  );
                  return (
                    matchedProduct && (
                      <View key={item.productId} style={styles.productRow}>
                        <Image
                          source={{ uri: matchedProduct?.image }}
                          style={styles.productImage}
                        />
                        <View style={styles.productDetails}>
                          <Text style={styles.productTitle} numberOfLines={2}>
                            {matchedProduct.productName}
                          </Text>
                          <Text style={styles.price}>
                            ₫{matchedProduct.price.toLocaleString("vi-VN")}
                          </Text>
                          <Text style={styles.quantity}>x{item.quantity}</Text>
                        </View>
                        <Text style={styles.itemTotal}>
                          ₫
                          {(
                            item.quantity * matchedProduct.price
                          ).toLocaleString("vi-VN")}
                        </Text>
                      </View>
                    )
                  );
                })}

                <View style={styles.orderFooter}>
                  <Text style={styles.orderTotal}>
                    Tổng đơn hàng: ₫
                    {calculateOrderTotal(order).toLocaleString("vi-VN")}
                  </Text>
                  <View style={styles.rewardRow}>
                    <AntDesign name="gift" size={16} color="#F59E0B" />
                    <Text style={styles.rewardText}>
                      Đánh giá trước {order.reviewDeadline} để nhận{" "}
                      {order.coins} Xu
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>Chưa có đơn hàng nào</Text>
          )}

          {orderData?.length > 0 && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.disabledButton,
                ]}
                onPress={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <AntDesign
                  name="left"
                  size={20}
                  color={currentPage === 1 ? "#A0AEC0" : "#1A3C5A"}
                />
              </TouchableOpacity>
              <Text style={styles.pageText}>
                {currentPage} / {totalPages}
              </Text>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.disabledButton,
                ]}
                onPress={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <AntDesign
                  name="right"
                  size={20}
                  color={currentPage === totalPages ? "#A0AEC0" : "#1A3C5A"}
                />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default OrderHistory;
