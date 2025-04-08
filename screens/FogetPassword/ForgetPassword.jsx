import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { styles } from "./styles"; // Importing styles from your styles file
import { Provider, Button, Form, Input, Toast } from "@ant-design/react-native";
import { loadAsync } from "expo-font";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";

const ForgetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fontLoaded, setFontLoaded] = useState(false);

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    dispatch(forgotPassword(values.email))
      .unwrap()
      .then((response) => {
        if (response === "success") {
          Toast.success("Yêu cầu đặt lại mật khẩu được gửi");
          setTimeout(() => {
            navigation.navigate("ResetPasswordForm");
          }, 1000);
        } else {
          Toast.fail("Yêu cầu thất bại");
        }
      });
  };

  useEffect(() => {
    Toast.config({ duration: 2 });
  }, []);

  useEffect(() => {
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      });
      setFontLoaded(true);
    };

    loadFontAsync();
  }, []);

  if (!fontLoaded) {
    return <Text>'字体加载中...'</Text>;
  }

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koiimg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Quên mật khẩu</Text>
          <Text style={styles.terms}>
            Vui lòng nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </Text>

          <Form
            name="forget-password"
            onFinish={onFinish}
            style={{ backgroundColor: "transparent" }}
            form={form}
          >
            <View style={styles.inputContainer}>
              <Form.Item name="email" noStyle>
                <Input
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.forgot}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
            </View>

            <Button style={styles.loginButton} onPress={onSubmit}>
              <Text style={styles.loginText}>Gửi yêu cầu</Text>
            </Button>
          </Form>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default ForgetPassword;
