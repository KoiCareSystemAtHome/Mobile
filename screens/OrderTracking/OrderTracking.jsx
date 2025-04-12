import { Provider } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import {
  getOrderDetail,
  getOrderTracking,
  updateOrderStatus,
  updateShipType,
} from "../../redux/slices/ghnSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  orderDetailSelector,
  orderTrackingSelector,
  productSelector,
} from "../../redux/selector";
import AntDesign from "react-native-vector-icons/AntDesign";

const OrderTracking = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const orderDetail = useSelector(orderDetailSelector);
  const orderTrack = useSelector(orderTrackingSelector);
  const productData = useSelector(productSelector);
  const orderId = route.params?.order?.orderId;
  const order = route.params?.order;
  const [progress, setProgress] = useState(2);

  useEffect(() => {
    dispatch(getOrderDetail(orderId));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetail?.oder_code) {
      const order_code = orderDetail?.oder_code;
      dispatch(getOrderTracking({ order_code }))
        .unwrap()
        .then((response) => {
          if (response?.status === "delivered") {
            setProgress(2);
          } else if (
            response?.status === "picking" ||
            "picked" ||
            "delivering"
          ) {
            setProgress(1);
          } else {
            setProgress(0);
          }
        });
    }
  }, [dispatch, orderDetail]);

  useEffect(() => {
    const values = { orderId, status: orderTrack?.status };
    dispatch(updateShipType(values));
    if (
      orderTrack?.status === "picked" ||
      orderTrack?.status === "picking" ||
      orderTrack?.status === "delivering" ||
      orderTrack?.status === "storing"
    ) {
      const payload = { orderId, status: "In Progress" };
      dispatch(updateOrderStatus(payload));
    } else if (orderTrack?.status === "delivery_fail") {
      const payload = { orderId, status: "Fail" };
      dispatch(updateOrderStatus(payload));
    } else if (orderTrack?.status === "delivered") {
      const payload = { orderId, status: "Complete" };
      dispatch(updateOrderStatus(payload));
    }
  }, [orderId, dispatch, orderTrack?.status]);

  const handleCancelOrder = () => {
    const payload = { orderId, status: "Cancelled" };
    dispatch(updateOrderStatus(payload));
    navigation.goBack();
  };

  // Format the payment date
  const formatPaymentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          {/* Product Details */}
          <View style={styles.orderCard}>
            <Text style={styles.orderTitle}>Chi tiết đơn hàng</Text>
            {orderDetail?.details?.map((item) => {
              const matchedProduct = productData?.find(
                (product) => product.productId === item.productId
              );
              return (
                matchedProduct && (
                  <View key={item.productId} style={styles.productRow}>
                    <Image
                      source={{ uri: matchedProduct.image }}
                      style={styles.productImage}
                    />
                    <View style={styles.productDetails}>
                      <Text style={styles.productTitle}>
                        {matchedProduct.productName}
                      </Text>
                      <View style={styles.productFooter}>
                        <Text style={styles.price}>
                          {matchedProduct.price.toLocaleString("vi-VN")}₫
                        </Text>
                        <Text style={styles.quantity}>x{item.quantity}</Text>
                      </View>
                      <Text style={styles.totalPrice}>
                        Tổng số tiền:{" "}
                        <Text style={styles.highlight}>
                          {(
                            item.quantity * matchedProduct.price
                          ).toLocaleString("vi-VN")}
                          ₫
                        </Text>
                      </Text>
                    </View>
                  </View>
                )
              );
            })}

            {/* Payment Details */}
            {order?.transactionInfo?.payment && (
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentTitle}>
                  {order.transactionInfo.payment.description}
                </Text>
                <Text style={styles.paymentAmount}>
                  Tổng đơn hàng:{" "}
                  {order.transactionInfo.payment.amount.toLocaleString("vi-VN")}
                  ₫
                </Text>
                <Text style={styles.paymentDueDate}>
                  Due date:{" "}
                  {formatPaymentDate(order.transactionInfo.payment.date)}
                </Text>
                <Text style={styles.paymentSource}>
                  {order.shopName} •{" "}
                  <Text style={styles.paymentStatus}>
                    {order.transactionInfo.transactionType}
                  </Text>
                </Text>
              </View>
            )}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressLine,
                  progress >= 1 && styles.progressLineActive,
                ]}
              />
              <View
                style={[
                  styles.progressLine,
                  progress >= 2 && styles.progressLineActive,
                ]}
              />
              <View style={[styles.step, progress >= 0 && styles.stepActive]} />
              <View style={[styles.step, progress >= 1 && styles.stepActive]} />
              <View
                style={[styles.step, progress >= 2 && styles.stepCompleted]}
              >
                {progress === 2 && <Text style={styles.checkmark}>✔</Text>}
              </View>
            </View>
            <View style={styles.progressSteps}>
              <Text
                style={[
                  styles.stepText,
                  progress >= 0 && styles.stepTextActive,
                ]}
              >
                Đã xác nhận
              </Text>
              <Text
                style={[
                  styles.stepText,
                  progress >= 1 && styles.stepTextActive,
                ]}
              >
                Đang giao hàng
              </Text>
              <Text
                style={[
                  styles.stepText,
                  progress >= 2 && styles.stepTextActive,
                ]}
              >
                Đã giao hàng
              </Text>
            </View>
          </View>

          {/* Tracking Log */}
          <View style={styles.progressContainer}>
            {orderTrack?.log?.map((item, index) => {
              const latestDate = Math.max(
                ...orderTrack.log.map((log) =>
                  new Date(log.updated_date).getTime()
                )
              );
              const formattedDate = new Date(item.updated_date)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(",", "")
                .replace(" ", "-")
                .replace(" ", "-");
              const statusMapping = {
                delivered: "Đã được giao hàng",
                delivering: "Đang được giao hàng, xin hãy chú ý điện thoại",
                storing: "Đang đóng hàng",
                picked: "Đã nhận hàng",
                picking: "Đang nhận hàng",
                delivery_fail: "Nỗ lực giao hàng không thành công",
              };
              return (
                <View key={index} style={styles.item}>
                  <View style={styles.iconContainer}>
                    {new Date(item.updated_date).getTime() === latestDate ? (
                      <AntDesign name="checkcircle" size={20} color="green" />
                    ) : (
                      <AntDesign name="clockcircleo" size={20} color="gray" />
                    )}
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={[
                        styles.time,
                        new Date(item.updated_date).getTime() === latestDate &&
                          styles.activeText,
                      ]}
                    >
                      {formattedDate}
                    </Text>
                    <Text
                      style={[
                        styles.status,
                        new Date(item.updated_date).getTime() === latestDate &&
                          styles.activeText,
                      ]}
                    >
                      {statusMapping[item.status] || item.status}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {(orderTrack?.status === "delivered" ||
              orderDetail?.status === "Complete" ||
              orderDetail?.status === "Completed") && (
              <>
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => {
                    navigation.navigate("Report", { orderId });
                  }}
                >
                  <Text style={styles.buttonText}>Báo cáo</Text>
                </TouchableOpacity>
                {orderDetail?.details?.map((item) => {
                  const matchedProduct = productData?.find(
                    (product) => product.productId === item.productId
                  );
                  return (
                    matchedProduct && (
                      <TouchableOpacity
                        key={item.productId}
                        style={styles.reviewButton}
                        onPress={() => {
                          navigation.navigate("ReviewScreen", {
                            product: matchedProduct,
                          });
                        }}
                      >
                        <Text style={styles.buttonText}>
                          <AntDesign name="star" size={16} color="gold" /> Đánh
                          giá
                        </Text>
                      </TouchableOpacity>
                    )
                  );
                })}
              </>
            )}
            {orderDetail?.status === "Pending" && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelOrder}
              >
                <Text style={styles.buttonText}>Hủy đơn hàng</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default OrderTracking;
