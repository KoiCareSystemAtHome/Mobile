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
          Toast.success("Login Successful");
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
          <Text style={styles.title}>Login</Text>
          <Text style={styles.terms}>
            By signing in you are agreeing to our{" "}
            <Text style={styles.link}>Term and privacy policy</Text>
          </Text>

          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.tab, styles.activeTab]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.tab}>Register</Text>
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
                  placeholder="Email Address"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="password" noStyle>
                <Input
                  placeholder="Password"
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
              <Text style={styles.remember}>Remember password</Text>
              <TouchableOpacity>
                <Text style={styles.forgot}>Forget password</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity>
                <Text
                  style={styles.forgot}
                  onPress={() => {
                    navigation.navigate("MainTabs");
                  }}
                >
                  Log in as guest?
                </Text>
              </TouchableOpacity>
            </View>

            <Button style={styles.loginButton} onPress={onSubmit}>
              <Text style={styles.loginText}>Login</Text>
            </Button>
          </Form>
          <Text style={styles.connectText}>or connect with</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/facebook 1.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/google-icon-2048x2048-czn3g8x8 1.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default LoginScreen;