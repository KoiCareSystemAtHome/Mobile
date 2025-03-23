import { Provider } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import {
  getOrderByAccount,
  getOrderDetail,
  getOrderTracking,
} from "../../redux/slices/ghnSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  orderDetailSelector,
  orderTrackingSelector,
} from "../../redux/selector";
import AntDesign from "react-native-vector-icons/AntDesign";
const timelineData = [
  { time: "15 Th03 16:54", status: "Giao hàng thành công", active: true },
  {
    time: "15 Th03 16:27",
    status: "Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại",
    active: false,
  },
  {
    time: "15 Th03 15:55",
    status: "Đơn hàng chuẩn bị bàn giao cho đơn vị vận chuyển",
    active: false,
  },
  {
    time: "15 Th03 15:52",
    status: "Người gửi đang chuẩn bị hàng",
    active: false,
  },
  { time: "15 Th03 14:17", status: "Đơn hàng đã được đặt", active: false },
];

const OrderTracking = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const orderDetail = useSelector(orderDetailSelector);
  const orderTrack = useSelector(orderTrackingSelector);
  const orderId = route.params.orderId;
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
          } else if (response?.status === "picking" || "picked" || "delivering") {
            setProgress(1);
          }else{
            setProgress(0)
          }
        });
    }
  }, [dispatch, orderDetail]);
  console.log(orderTrack?.status);
  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Giao vào 15 Th03</Text>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              {/* Line */}
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

              {/* Steps */}
              <View style={[styles.step, progress >= 0 && styles.stepActive]} />
              <View style={[styles.step, progress >= 1 && styles.stepActive]} />
              <View
                style={[styles.step, progress >= 2 && styles.stepCompleted]}
              >
                {progress === 2 && <Text style={styles.checkmark}>✔</Text>}
              </View>
            </View>

            {/* Steps Labels */}
            <View style={styles.progressSteps}>
              <Text
                style={[
                  styles.stepText,
                  progress >= 0 && styles.stepTextActive,
                ]}
              >
                Đã vận chuyển
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
                  hour12: false, // 24-hour format
                })
                .replace(",", "")
                .replace(" ", "-")
                .replace(" ", "-");
              const statusMapping = {
                delivered: "Đã được giao hàng",
                delivering: "Đang được giao hàng, xin hãy chú ý điện thoại",
                storing:"Đang đóng hàng",
                picked: "Đã nhận hàng",
                picking: "Đang nhận hàng",
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
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default OrderTracking;
