import { Alert } from "react-native";

const handleError = (error) => {
  if (error.response) {
    const errorMessage =
      error.response.data.message || error.response.data.Message || "Đã xảy ra lỗi";

    if (error.response.status === 400) {

    }

    if (error.response.status === 401) {
      console.log("401 - Lỗi", error);

    }

    if (error.response.status === 403) {
      console.log("403 - Lỗi", error);

    }

    if (error.response.status === 404) {
      console.log("404 - Không tìm thấy");

    }

    if (error.response.status === 409) {
      console.log("409 - Tạo sổ.", error);

    }

    if (error.response.status === 500) {
      console.log("500 - Lỗi Server", error);

    }
  } else {
    console.log("Error:", error.message);

  }
};

export default handleError;
