import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { styles } from "./styles";
import {
  Provider,
  Button,
  Form,
  Input,
  Toast,
  Picker,
} from "@ant-design/react-native"; // Added Picker from Ant Design
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { register } from "../../redux/slices/authSlice";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  // Role options for the Picker
  const roleOptions = [
    { label: "Chọn vai trò", value: "" },
    { label: "Người dùng", value: "user" },
    { label: "Quản trị viên", value: "admin" },
  ];

  // Gender options for the Picker
  const genderOptions = [
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
    { label: "Khác", value: "other" },
  ];

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    // Basic validation
    if (values.Password !== values.confirmPassword) {
      Toast.fail("Mật khẩu không khớp");
      return;
    }
    values.Gender = selectedGender;
    values.Role = "Member";
    console.log(values);
    
    dispatch(register(values))
      .unwrap()
      .then(async (response) => {
        if (response?.status === "200") {
          Toast.success("Đăng ký thành công");
          setTimeout(() => {
            navigation.navigate("OTP", { email: values.Email });
          }, 1000);
        }else{
          Toast.fail(response.message || "Đăng Ký Thất Bại")
        }
      })
      .catch((error) => {
        console.error("Registration Failed:", error);
        Alert.alert(
          "Registration Error",
          "An error occurred. Please try again."
        );
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
    return <Text>'Đang tải font...'</Text>;
  }

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koiimg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Đăng ký</Text>
          <Text style={styles.terms}>
            Khi đăng nhập hệ thống, bạn đồng ý với{" "}
            <Text style={styles.link}>Điều khoản và chính sách bảo mật</Text>
          </Text>

          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.tab}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.tab, styles.activeTab]}>Đăng ký</Text>
            </TouchableOpacity>
          </View>

          <Form
            name="register"
            onFinish={onFinish}
            style={{ backgroundColor: "transparent" }}
            form={form}
          >
            <View style={styles.inputContainer}>
              <Form.Item name="Email" noStyle>
                <Input
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="UserName" noStyle>
                <Input
                  placeholder="Tên đăng nhập"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="Name" noStyle>
                <Input
                  placeholder="Họ Và Tên"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="Password" noStyle>
                <Input
                  placeholder="Mật khẩu"
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

            <View style={styles.inputContainer}>
              <Form.Item name="confirmPassword" noStyle>
                <Input
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry={!showConfirmPassword}
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ marginRight: 10 }}
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye" : "eye-slash"}
                  size={24}
                  color="#6497B1"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="Gender" noStyle>
                <Picker
                  data={genderOptions}
                  cols={1}
                  onChange={(value) => setSelectedGender(value[0])}
                >
                  <Text style={styles.pickerInput}>
                    {genderOptions.find(
                      (gender) => gender.value === selectedGender
                    )?.label || "Chọn giới tính"}
                  </Text>
                </Picker>
              </Form.Item>
            </View>

            <View style={styles.inputContainer}>
              <Form.Item name="Address" noStyle>
                <Input
                  placeholder="Địa chỉ"
                  style={styles.input}
                  placeholderTextColor="#C4C4C4"
                />
              </Form.Item>
            </View>

            <View style={styles.row}>
              <TouchableOpacity>
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            <Button style={styles.loginButton} onPress={onSubmit}>
              <Text style={styles.loginText}>Đăng ký</Text>
            </Button>
          </Form>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default RegisterScreen;
