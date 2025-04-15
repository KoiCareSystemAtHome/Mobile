import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { getImage } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  Input,
  Provider,
  TextareaItem,
  Toast,
} from "@ant-design/react-native";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { createReport } from "../../redux/slices/reportSlice";
import { loadAsync } from "expo-font";

const ReportScreen = ({navigation}) => {
  const route = useRoute();
  const { orderId } = route.params || {};
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [imageBlob, setImageBlob] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType, // Correct format for Expo 49+
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileType = uri.split(".").pop();

      const fileMimeType = `image/${fileType === "jpg" ? "jpeg" : fileType}`;

      // Create FormData
      let formData = new FormData();
      formData.append("file", {
        uri: uri,
        name: `image.${fileType}`,
        type: fileMimeType,
      });

      setImageBlob(uri);
      try {
        const response = await dispatch(getImage(formData)).unwrap();
        if (response) {
          setUploadResponse(response?.imageUrl);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };
  const onFinish = (values) => {
    const image = uploadResponse ? uploadResponse : "string";
    values = { ...values, image, orderId };
    console.log(values);
    dispatch(createReport(values))
      .unwrap()
      .then((response) => {
        if (response?.status === "200") {
          Toast.success("Report Sent Successfully");
          setTimeout(() => {
            form.resetFields();
            navigation.navigate("OrderHistory")
          });
        } else {
          Toast.fail("Failed to send report");
          setModalVisible(false);
        }
      });
  };
  useEffect(() => {
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      });
      setFontLoaded(true);
      Toast.config({ duration: 2 });
    };

    loadFontAsync();
  }, []);
  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Báo cáo của tôi</Text>
          {imageBlob ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: uploadResponse }}
                style={styles.selectedImage}
              />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={handleImagePick}
              >
                <Text style={styles.changeImageText}>Thay đổi ảnh</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.imageButton}
              onPress={handleImagePick}
            >
              <Text style={styles.imageButtonText}>Chọn ảnh</Text>
            </TouchableOpacity>
          )}
          <Form
            form={form}
            onFinish={onFinish}
            style={{ backgroundColor: "transparent" }}
          >
            <Form.Item name="reason" style={styles.input}>
              <TextareaItem
                placeholder="Reason"
                rows={4} // Number of visible lines
                count={500} // Character limit
                style={{ paddingVertical: 30 }}
              />
            </Form.Item>
            <Button
              type="primary"
              style={styles.submitButton}
              onPress={() => form.submit()}
            >
              <Text style={styles.modalSaveText}>Lưu</Text>
            </Button>
          </Form>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default ReportScreen;
