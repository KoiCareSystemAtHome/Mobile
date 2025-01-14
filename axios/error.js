import { Alert } from "react-native";

const handleError = (error) => {
  if (error.response) {
    const errorMessage =
      error.response.data.message || error.response.data.Message || "Đã xảy ra lỗi";

    if (error.response.status === 400) {
      Alert.alert("Lỗi", errorMessage);
    }

    if (error.response.status === 401) {
      console.log("401 - Lỗi", error);
      Alert.alert("Lỗi Xác Thực", errorMessage);
    }

    if (error.response.status === 403) {
      console.log("403 - Lỗi", error);
      Alert.alert("Truy Cập Bị Từ Chối", "Không có quyền truy cập hoặc data");
    }

    if (error.response.status === 404) {
      console.log("404 - Không tìm thấy");
      Alert.alert("Lỗi", "Không tìm thấy tài nguyên.");
    }

    if (error.response.status === 409) {
      console.log("409 - Tạo sổ.", error);
      Alert.alert("Xung Đột", errorMessage);
    }

    if (error.response.status === 500) {
      console.log("500 - Lỗi Server", error);
      Alert.alert("Lỗi Hệ Thống", "Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  } else {
    console.log("Error:", error.message);
    Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
  }
};

export default handleError;
