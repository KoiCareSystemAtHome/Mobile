import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./styles"; // Assuming this is in the same directory
import { Provider, Button, Form, Input, Toast } from "@ant-design/react-native";
import { loadAsync } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/slices/authSlice";

const ResetPasswordForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    dispatch(resetPassword(values))
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response === "success") {
          Toast.success("Mật khẩu được đặt lại thành công");
          setTimeout(() => {
            navigation.navigate("Login");
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
        source={require("../../../assets/koiimg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Đặt lại mật khẩu</Text>
          <Text style={styles.terms}>
            Vui lòng check mail để có mã xác nhận
          </Text>

          <Form
            name="reset-password"
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

            <View style={styles.inputContainer}>
              <Form.Item name="code" noStyle>
                <Input
                  placeholder="Mã xác nhận"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="newPass" noStyle>
                <Input
                  placeholder="Mật khẩu mới"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ marginRight: 10 }}
              >
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"}
                  size={24}
                  color="#6497B1"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.forgot}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
            </View>

            <Button style={styles.loginButton} onPress={onSubmit}>
              <Text style={styles.loginText}>Xác nhận</Text>
            </Button>
          </Form>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default ResetPasswordForm;
