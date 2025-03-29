import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Provider, Button, Form, Input, Toast } from "@ant-design/react-native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Add this import

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    dispatch(login(values))
      .unwrap()
      .then(async (response) => {
        if (response?.user?.status === "Active") {
          Toast.success("Đăng nhập thành công");
          await AsyncStorage.setItem("accessToken", response?.token);
          await AsyncStorage.setItem("user", JSON.stringify(response?.user));
          setTimeout(() => {
            navigation.navigate("MainTabs");
          }, 2000);
        } else {
          Toast.fail("Invalid Credentials");
        }
      })
      .catch((error) => {
        console.error("Login Failed:", error);
        Alert.alert("Login Error", "An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    Toast.config({ duration: 2 });
  }, []);

  const [fontLoaded, setFontLoaded] = useState(false);

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
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.terms}>
          Khi đăng nhập hệ thống, bạn đồng ý vớir{" "}
            <Text style={styles.link}>Điều khoản và chính sách bảo mật</Text>
          </Text>

          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.tab, styles.activeTab]}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.tab}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <Form
            name="basic"
            onFinish={onFinish}
            style={{ backgroundColor: "transparent" }}
            form={form}
          >
            <View style={styles.inputContainer}>
              <Form.Item name="username" noStyle>
                <Input
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="password" noStyle>
                <Input
                  placeholder="Mật khẩu"
                  secureTextEntry={!showPassword} // Toggle visibility based on state
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
                style={{marginRight:10}} 
              >
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"} // Switch between eye and eye-slash icons
                  size={24}
                  color="#6497B1" // Adjust color as needed
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity>
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            
              <TouchableOpacity>
                <Text
                  style={styles.forgot}
                  onPress={() => {
                    navigation.navigate("MainTabs");
                  }}
                >
                  Bỏ qua  
                </Text>
              </TouchableOpacity>  
            </View>

            <Button style={styles.loginButton} onPress={onSubmit}>
              <Text style={styles.loginText}>Đăng nhập</Text>
            </Button>
          </Form>
          
          
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default LoginScreen;