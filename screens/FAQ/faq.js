import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FAQScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/koiimg.jpg")} // Đặt ảnh nền trong thư mục assets
      style={styles.background}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Cảm ơn bạn đã chọn Koi Guardian</Text>
        <Text style={styles.text}>
          <Text style={styles.italic}>Lượng thức ăn khuyến nghị nên được chia đều thành{" "}</Text>
          <Text style={styles.bold}>3 – 5 lần cho ăn mỗi ngày.</Text> Điều này giúp cá koi hấp thụ thức ăn tốt hơn.
        </Text>
        <Text style={styles.text}>
          Lưu ý rằng lượng thức ăn hiển thị và số lần cho ăn chỉ mang tính chất ước lượng.
          Vì vậy, chỉ cho cá ăn lượng thức ăn mà chúng có thể thực sự tiêu thụ.
        </Text>
        <Text style={styles.text}>
          Nhìn chung, nên chia tổng lượng thức ăn thành nhiều lần cho ăn nhất có thể.
          Chế độ <Text style={styles.bold}>tăng trưởng</Text>{" "}
          <Text style={styles.greenText}>"thấp"</Text> phù hợp cho hồ có cá trên 6 năm tuổi.
        </Text>
        <Text style={styles.text}>
          Chế độ <Text style={styles.greenText}>"trung bình"</Text> phù hợp cho cá trên 4 năm tuổi và{" "}
          <Text style={styles.greenText}>"cao"</Text> dành cho cá dưới 4 năm tuổi.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  contentContainer: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Làm nền sáng hơn
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1, // Thêm viền
    borderColor: "#ccc", // Màu viền xám nhẹ
  },  
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  greenText: {
    color: "#228B22", // Màu xanh lá
    fontWeight: "bold",
  },
});

export default FAQScreen;
