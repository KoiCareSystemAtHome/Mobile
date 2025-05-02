import { Provider, Toast, Modal } from "@ant-design/react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import {
  getOrderByAccount,
  getOrderDetail,
  getOrderTracking,
  rejectOrder,
  updateOrderStatus,
  updateShipType,
  resetOrderTrack, // Import the new action
} from "../../redux/slices/ghnSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  orderDetailSelector,
  orderTrackingSelector,
  productSelector,
} from "../../redux/selector";
import AntDesign from "react-native-vector-icons/AntDesign";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { getWallet } from "../../redux/slices/authSlice";

const OrderTracking = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const orderDetail = useSelector(orderDetailSelector);
  const orderTrack = useSelector(orderTrackingSelector);
  const productData = useSelector(productSelector);
  const orderId = route.params?.order?.orderId;
  const order = route.params?.order;
  const userId = route.params?.userId;
  const [progress, setProgress] = useState(0);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // Function to check if the Report button should be displayed
  const isReportButtonVisible = () => {
    if (!orderTrack?.log) return false;
    const deliveredLog = orderTrack.log.find(
      (log) => log.status === "delivered"
    );
    if (!deliveredLog) return false;
    const deliveredDate = new Date(deliveredLog.updated_date);
    const currentDate = new Date("2025-04-25");
    const timeDiff = currentDate - deliveredDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff <= 3;
  };

  // Reset state and fetch order details when screen is focused
  useEffect(() => {
    dispatch(resetOrderTrack()); // Reset on mount
    dispatch(getOrderDetail(orderId));
  
    return () => {
      dispatch(resetOrderTrack()); // Reset on unmount
    };
  }, [dispatch, orderId]);
  // Fetch order tracking data
  useEffect(() => {
    if (orderDetail?.oder_code) {
      const order_code = orderDetail?.oder_code;
      dispatch(getOrderTracking({ order_code }))
        .unwrap()
        .then((response) => {
          if (response?.order_code === order_code) {
            if (response?.status === "delivered") {
              setProgress(2);
            } else if (
              response?.status === "picking" ||
              response?.status === "picked" ||
              (orderDetail?.status === "Complete" &&
                response?.status === "delivering")
            ) {
              setProgress(1);
            } else {
              setProgress(0);
            }
          } else {
            setProgress(0);
          }
        })
        .catch((error) => {
          console.error("Error fetching order tracking:", error);
          Toast.fail("Không thể tải trạng thái đơn hàng");
          setProgress(0);
        });
    }
  }, [dispatch, orderDetail?.oder_code]);

  // Update order status based on tracking
  useEffect(() => {
    if (orderTrack?.status) {
      const values = { orderId, status: orderTrack.status };
      dispatch(updateShipType(values));
      let payload;
      if (["picked", "picking", "storing"].includes(orderTrack?.status)) {
        payload = { orderId, status: "In Progress" };
      } else if (orderTrack?.status === "delivery_fail") {
        payload = { orderId, status: "Fail" };
      } else if (orderTrack?.status === "delivering" && orderDetail?.status !== "Delivered") {
        payload = { orderId, status: "In Progress" };
      } else if (orderTrack?.status === "delivered") {
        payload = { orderId, status: "Complete" };
      } else if (orderTrack?.status === "return") {
        payload = { orderId, status: "Return" };
      }
      if (payload) {
        dispatch(updateOrderStatus(payload));
      }
    }
  }, [orderId, dispatch, orderTrack?.status]);

  const handleCancelOrder = () => {
    setCancelModalVisible(true);
  };

  const confirmCancelOrder = () => {
    if (!cancelReason.trim()) {
      Toast.fail("Vui lòng nhập lý do hủy đơn hàng");
      return;
    }
    const payload = { orderId, reason: cancelReason };
    dispatch(rejectOrder(payload))
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          Toast.success("Đơn hàng đã được hủy");
          dispatch(getOrderByAccount(userId));
          dispatch(getWallet(userId));
          setCancelModalVisible(false);
          setCancelReason("");
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error("Error cancelling order:", error);
        Toast.fail("Hủy đơn hàng thất bại");
      });
  };

  const formatPaymentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Provider locale={enUS}>
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
          <Text style={styles.title}>Theo Dõi Đơn Hàng</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {/* Rest of the JSX remains unchanged */}
          <View style={styles.orderCard}>
            <Text style={styles.sectionTitle}>Chi Tiết Đơn Hàng</Text>
            {orderDetail?.details?.length > 0 ? (
              orderDetail.details.map((item) => {
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
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.price}>
                            ₫{matchedProduct.price.toLocaleString("vi-VN")}
                          </Text>
                          <Text style={styles.quantity}>
                            {" "}
                            x {item.quantity}
                          </Text>
                        </View>
                        <Text style={styles.itemTotal}>
                          ₫
                          {(
                            item.quantity * matchedProduct.price
                          ).toLocaleString("vi-VN")}
                        </Text>
                        {(orderTrack?.status === "delivered" ||
                          orderDetail?.status === "Complete" ||
                          orderDetail?.status === "Completed") && (
                          <TouchableOpacity
                            style={[styles.actionButton, styles.reviewButton]}
                            onPress={() => {
                              navigation.navigate("ReviewScreen", {
                                product: matchedProduct,
                              });
                            }}
                          >
                            <Text style={styles.buttonText}>
                              <AntDesign
                                name="star"
                                size={16}
                                color="#F59E0B"
                              />{" "}
                              Đánh Giá
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )
                );
              })
            ) : (
              <Text style={styles.noDataText}>Không có sản phẩm nào</Text>
            )}

            {order?.transactionInfo?.payment && (
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentTitle}>
                  {order.transactionInfo.payment.description}
                </Text>
                <Text style={styles.paymentAmount}>
                  Tổng đơn hàng: ₫
                  {order.transactionInfo.payment.amount.toLocaleString("vi-VN")}
                </Text>
                <Text style={styles.paymentDueDate}>
                  Ngày thanh toán:{" "}
                  {formatPaymentDate(order.transactionInfo.payment.date)}
                </Text>
                <Text style={styles.paymentSource}>{order.shopName}</Text>
              </View>
            )}
          </View>

          <View style={styles.progressCard}>
            <Text style={styles.sectionTitle}>Tiến Độ Đơn Hàng</Text>
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
                {progress >= 2 && (
                  <AntDesign name="check" size={12} color="#fff" />
                )}
              </View>
            </View>
            <View style={styles.progressSteps}>
              <Text
                style={[
                  styles.stepText,
                  progress >= 0 && styles.stepTextActive,
                ]}
              >
                Đã Xác Nhận
              </Text>
              <Text
                style={[
                  styles.stepText,
                  progress >= 1 && styles.stepTextActive,
                ]}
              >
                Đang Giao
              </Text>
              <Text
                style={[
                  styles.stepText,
                  progress >= 2 && styles.stepTextActive,
                ]}
              >
                Đã Giao
              </Text>
            </View>
          </View>

          <View style={styles.trackingCard}>
            <Text style={styles.sectionTitle}>Nhật Ký Theo Dõi</Text>
            {orderTrack?.log?.length > 0 ? (
              orderTrack.log.map((item, index) => {
                const latestDate = Math.max(
                  ...orderTrack.log.map((log) =>
                    new Date(log.updated_date).getTime()
                  )
                );
                const formattedDate = new Date(
                  item.updated_date
                ).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });
                const statusMapping = {
                  delivered: "Đã giao hàng",
                  delivering: "Đang giao hàng",
                  storing: "Đang đóng gói",
                  picked: "Đã lấy hàng",
                  picking: "Đang lấy hàng",
                  delivery_fail: "Giao hàng thất bại",
                  return: "Trả hàng",
                  transporting: "Đang vận chuyển",
                  sorting: "Đang phân loại",
                };
                return (
                  <View key={index} style={styles.trackingItem}>
                    <View style={styles.iconContainer}>
                      {new Date(item.updated_date).getTime() === latestDate ? (
                        <AntDesign
                          name="checkcircle"
                          size={20}
                          color="#10B981"
                        />
                      ) : (
                        <AntDesign
                          name="clockcircleo"
                          size={20}
                          color="#A0AEC0"
                        />
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          styles.trackingTime,
                          new Date(item.updated_date).getTime() ===
                            latestDate && styles.activeText,
                        ]}
                      >
                        {formattedDate}
                      </Text>
                      <Text
                        style={[
                          styles.trackingStatus,
                          new Date(item.updated_date).getTime() ===
                            latestDate && styles.activeText,
                        ]}
                      >
                        {statusMapping[item.status] || item.status}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.noDataText}>Chưa có nhật ký theo dõi</Text>
            )}
          </View>

          {(orderTrack?.status || orderDetail?.status) && (
            <View style={styles.buttonContainer}>
              {(orderTrack?.status === "delivered" ||
                orderDetail?.status === "Complete" ||
                orderDetail?.status === "Completed") &&
                isReportButtonVisible() && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      navigation.navigate("Report", { orderId });
                    }}
                  >
                    <Text style={styles.buttonText}>Báo Cáo</Text>
                  </TouchableOpacity>
                )}
              {orderTrack?.status === "delivering" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.confirmButton]}
                  onPress={() => {
                    const payload = { orderId, status: "Delivered" };
                    dispatch(updateOrderStatus(payload))
                      .unwrap()
                      .then(() => {
                        Toast.success("Xác nhận nhận hàng thành công");
                        dispatch(getOrderDetail(orderId));
                      })
                      .catch((error) => {
                        console.error("Error confirming order:", error);
                        Toast.fail("Xác nhận nhận hàng thất bại");
                      });
                  }}
                >
                  <Text style={styles.buttonText}>Đã Nhận Hàng</Text>
                </TouchableOpacity>
              )}
              {orderDetail?.status === "Pending" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={handleCancelOrder}
                >
                  <Text style={styles.buttonText}>Hủy Đơn Hàng</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>

        <Modal
          title="Hủy Đơn Hàng"
          transparent
          visible={cancelModalVisible}
          onClose={() => {
            setCancelModalVisible(false);
            setCancelReason("");
          }}
          maskClosable
          footer={[
            {
              text: "Hủy",
              onPress: () => {
                setCancelModalVisible(false);
                setCancelReason("");
              },
            },
            {
              text: "Xác Nhận",
              onPress: confirmCancelOrder,
            },
          ]}
        >
          <View style={{ paddingVertical: 20 }}>
            <TextInput
              style={styles.cancelReasonInput}
              onChangeText={(text) => setCancelReason(text)}
              placeholder="Nhập lý do hủy đơn hàng"
              multiline
            />
          </View>
        </Modal>
      </ImageBackground>
    </Provider>
  );
};

export default OrderTracking;