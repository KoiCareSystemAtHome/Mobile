import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Provider } from "@ant-design/react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByAccount } from "../../redux/slices/ghnSlice";
import { orderbyAccountSelector, productSelector } from "../../redux/selector";
import { getProduct } from "../../redux/slices/productSlice";

const OrderHistory = ({ navigation }) => {
  const dispatch = useDispatch();
  const productData = useSelector(productSelector);
  const orderData = useSelector(orderbyAccountSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const orders = [
    {
      id: 1,
      store: "Bán Sỉ Giá Kho",
      status: "Hoàn thành",
      title: "Keo Xịt PJ77 Đa Năng Chuyên Dùng (600ml)",
      originalPrice: 63000,
      discountedPrice: 50400,
      quantity: 1,
      totalPrice: 142500,
      reviewDeadline: "09 Th04",
      coins: 200,
    },
    {
      id: 2,
      store: "Bàn Phím Universe",
      status: "Hoàn thành",
      title: "[Sẵn] Switch Sillyworks Hyacinth V2U",
      originalPrice: 10798,
      discountedPrice: 10390,
      quantity: 13,
      totalPrice: 173861,
      reviewDeadline: "21 Th03",
      coins: 200,
    },
  ];

  useEffect(() => {
    const getData = async (key) => {
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
    dispatch(getProduct());
    if (productData) {
      dispatch(getOrderByAccount(isLoggedIn?.id));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Order History</Text>
          <ScrollView>
            {orderData?.map((order) => (
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
                                ₫{matchedProduct.price}
                              </Text>{" "}
                              <Text style={styles.discountedPrice}>
                                {/* ₫{matchedProduct.discountedPrice.toLocaleString()} */}
                              </Text>
                            </Text>
                            <Text style={styles.quantity}>
                              x{item.quantity}
                            </Text>
                          </View>
                          <Text style={styles.totalPrice}>
                            Tổng số tiền:{" "}
                            <Text style={styles.highlight}>
                              ₫{item.quantity * matchedProduct.price}
                            </Text>
                          </Text>
                        </>
                      )}
                    </View>
                  );
                })}

                <View style={styles.rewardRow}>
                  <Icon name="gift" size={16} color="gold" />
                  <Text style={styles.rewardText}>
                    Đánh giá sản phẩm trước {order.reviewDeadline} để nhận{" "}
                    {order.coins} Xu
                  </Text>
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.returnButton}
                    onPress={() => {
                      navigation.navigate("Report", { orderId: order.orderId });
                    }}
                  >
                    <Text style={styles.returnText}>Báo cáo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reviewButton}>
                    <Text style={styles.reviewText}>Theo dõi đơn hàng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default OrderHistory;
