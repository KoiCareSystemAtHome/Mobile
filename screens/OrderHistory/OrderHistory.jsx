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
import { Provider } from "@ant-design/react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByAccount } from "../../redux/slices/ghnSlice";
import { orderbyAccountSelector, productSelector } from "../../redux/selector";
import { getProduct } from "../../redux/slices/productSlice";
import AntDesign from "react-native-vector-icons/AntDesign";

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
        console.error(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getProduct());
      dispatch(getOrderByAccount(isLoggedIn?.id));
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
      }
    } catch (error) {
      console.error("Refresh failed:", error);
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

        {/* <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            left: 15,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 20,
            padding: 8,
            zIndex: 1,
          }}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrowleft" size={24} color="black" />
        </TouchableOpacity> */}

        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack("MainTabs")}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Lịch Sử Đơn Hàng</Text>
          <ScrollView
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#6497B1"]} // Customize color to match your theme
                tintColor="#6497B1"
              />
            }
          >
            {paginatedOrderData?.map((order) => (
              <View key={order.orderId} style={styles.orderCard}>
                <Text style={styles.storeName}>{order.store}</Text>
                <Text style={styles.status}>{order.status}</Text>

                {order?.details?.map((item) => {
                  const matchedProduct = productData?.find(
                    (product) => product.productId === item.productId
                  );
                  return (
                    <View key={item.productId} style={styles.productRow}>
                      {matchedProduct && (
                        <>
                          <Image
                            source={{ uri: matchedProduct.image }}
                            style={styles.productImage}
                          />
                          <View style={styles.productDetails}>
                            <Text style={styles.productTitle}>
                              {matchedProduct.productName}
                            </Text>
                            <Text style={styles.price}>
                              <Text style={styles.originalPrice}>
                                ₫{matchedProduct.price.toLocaleString("vi-VN")}{" "}
                              </Text>{" "}
                              <Text style={styles.discountedPrice}>
                                {/* ₫{matchedProduct.discountedPrice.toLocaleString()} */}
                              </Text>
                            </Text>
                            <Text style={styles.quantity}>
                              x{item.quantity}
                            </Text>
                          </View>
                          <View style={styles.productFooter}>
                            <Text style={styles.totalPrice}>
                              Tổng số tiền:{" "}
                              <Text style={styles.highlight}>
                                ₫
                                {(
                                  item.quantity * matchedProduct.price
                                ).toLocaleString("vi-VN")}{" "}
                              </Text>
                            </Text>
                            {(order.status === "Completed" ||
                              order.status === "Complete") && (
                              <TouchableOpacity
                                style={styles.productReviewButton}
                                onPress={() => {
                                  navigation.navigate("ReviewScreen", {
                                    product: matchedProduct,
                                  });
                                }}
                              >
                                <Text style={styles.productReviewText}>
                                  <AntDesign
                                    name="star"
                                    size={16}
                                    color="gold"
                                  ></AntDesign>{" "}
                                  Đánh giá
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  );
                })}

                <View style={styles.orderTotalContainer}>
                  <Text style={styles.orderTotalText}>
                    Tổng đơn hàng:{" "}
                    <Text style={styles.orderTotalAmount}>
                      ₫{calculateOrderTotal(order).toLocaleString("vi-VN")}
                    </Text>
                  </Text>
                </View>

                <View style={styles.rewardRow}>
                  <Icon name="gift" size={16} color="gold" />
                  <Text style={styles.rewardText}>
                    Đánh giá sản phẩm trước {order.reviewDeadline} để nhận{" "}
                    {order.coins} Xu
                  </Text>
                </View>
                <View style={styles.buttonRow}>
                  {order?.status === "Complete" ||
                  order?.status === "Completed" ? (
                    <TouchableOpacity
                      style={styles.returnButton}
                      onPress={() => {
                        navigation.navigate("Report", {
                          orderId: order.orderId,
                        });
                      }}
                    >
                      <Text style={styles.returnText}>Báo cáo</Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}

                  {order?.status === "Pending" ? (
                    <></>
                  ) : (
                    <TouchableOpacity
                      style={styles.reviewButton}
                      onPress={() => {
                        navigation.navigate("OrderTracking", {
                          orderId: order.orderId,
                        });
                      }}
                    >
                      <Text style={styles.reviewText}>Theo dõi đơn hàng</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

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
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default OrderHistory;
