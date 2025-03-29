import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Form, Input, Button } from "@ant-design/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [form] = Form.useForm();

  const onFinish = (values) => {
  };

  useEffect(() => {
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
        const token = await AsyncStorage.getItem("accessToken");
        setToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hồ sơ cá nhân</Text>
        </View>
        <Form
          form={form}
          name="edit_profile"
          onFinish={onFinish}
          style={styles.formContainer}
        >
          <Form.Item name="name" initialValue={isLoggedIn?.name} noStyle>
            <Input placeholder="Họ và tên" style={styles.inputField} />
          </Form.Item>

          <Form.Item
            name="email"
            initialValue={isLoggedIn?.email}
            rules={[{ type: "email", message: "Enter a valid email" }]}
            noStyle
          >
            <Input
              placeholder="Email"
              keyboardType="email-address"
              style={styles.inputField}
            />
          </Form.Item>

          <Form.Item name="gender" noStyle>
            <Input placeholder="Giới tính" style={styles.inputField} />
          </Form.Item>

          <Form.Item
            name="address"
            noStyle
          >
            <Input placeholder="Nhập địa chỉ của bạn" style={styles.inputField} />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            style={styles.submitButton}
            onPress={() => form.submit()}
          >
            <Text style={styles.submitButtonText}>Lưu</Text>
          </Button>
        </Form>
      </View>
    </ImageBackground>
  );
};

export default EditProfile;
