import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import {
  Button,
  Form,
  Input,
  Provider,
  Toast,
  DatePicker,
} from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { getImage } from "../../../redux/slices/authSlice";
import { styles } from "./style";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { getFishByOwner, updateFish } from "../../../redux/slices/fishSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPondByOwner } from "../../../redux/slices/pondSlice";

const EditFish = ({ route, navigation }) => {
  const { fish } = route.params;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageBlob, setImageBlob] = useState(fish?.image || null);
  const [uploadResponse, setUploadResponse] = useState(fish?.image || null);
  const [inPondSince, setInPondSince] = useState(
    fish?.inPondSince ? new Date(fish.inPondSince) : new Date()
  );
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Handle image selection
  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileType = uri.split(".").pop();
      const fileMimeType = `image/${fileType === "jpg" ? "jpeg" : fileType}`;

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
          setUploadResponse(response.imageUrl);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  // Handle form submission
  const onFinish = (values) => {
    let image = fish?.image || "string";
    values.age = Number(values?.age);
    values.price = Number(values?.purchasePrice);
    values.inPondSince = inPondSince.toISOString();
    values.physique = "string";
    values.koiID = fish?.koiID;
    if (uploadResponse) {
      image = uploadResponse;
    }
    const updatedFish = {
      ...values,
      image,
      pondID: fish.pond?.pondID,
    };
    dispatch(updateFish(updatedFish))
      .unwrap()
      .then(() => {
        Toast.success("Fish Updated Successfully");
        dispatch(getFishByOwner(isLoggedIn?.id));
      });
    navigation.navigate("FishStatistic");
  };

  // Initial form values
  useEffect(() => {
    if (fish) {
      form.setFieldsValue({
        name: fish.name,
        age: fish.age?.toString(),
        length: fish.length?.toString(),
        weight: fish.weight?.toString() || "4.33",
        sex: fish.sex,
        varietyName: fish.variety?.varietyName,
        pond: fish.pond?.name,
        breeder: fish.variety?.varietyName,
        purchasePrice: fish.price?.toString(),
        condition: fish.condition || "Healthy",
      });
    }
  }, [fish, form]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleDatePickerChange = (date) => {
    setInPondSince(date);
    setDatePickerVisible(false);
  };

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Form
            form={form}
            onFinish={onFinish}
            style={{ backgroundColor: "transparent" }}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chỉnh Sửa Cá Koi</Text>
            </View>

            {imageBlob ? (
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleImagePick}>
                  <Image
                    source={{ uri: uploadResponse }}
                    style={styles.selectedImage}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleImagePick}
              >
                <Text style={styles.imageButtonText}>
                  Chạm để Chọn Hình Ảnh
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.modalFields}>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tên:</Text>
                  <Form.Item name="name" style={styles.input}>
                    <Input placeholder="Tên" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tuổi (ngày):</Text>
                  <Form.Item name="age" style={styles.input}>
                    <Input placeholder="Tuổi (ngày)" />
                  </Form.Item>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giới tính:</Text>
                  <Form.Item name="sex" style={styles.input}>
                    <Input placeholder="Giới tính" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giống:</Text>
                  <Form.Item name="varietyName" style={styles.input}>
                    <Input placeholder="Giống" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Ao:</Text>
                  <Form.Item name="pond" style={styles.input}>
                    <Input placeholder="Ao" disabled />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Trong ao từ:</Text>
                  <DatePicker
                    value={inPondSince}
                    mode="date"
                    minDate={new Date(2000, 0, 1)}
                    format="DD MMMM YYYY"
                    onChange={handleDatePickerChange}
                    visible={isDatePickerVisible}
                    onDismiss={() => setDatePickerVisible(false)}
                  >
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setDatePickerVisible(true)}
                    >
                      <Text style={styles.dateText}>
                        {inPondSince.toLocaleDateString("vi-VN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Text>
                    </TouchableOpacity>
                  </DatePicker>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Nhà lai tạo:</Text>
                  <Form.Item name="breeder" style={styles.input}>
                    <Input placeholder="Nhà lai tạo" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giá mua:</Text>
                  <Form.Item
                    name="purchasePrice"
                    style={styles.input}
                    extra="VND"
                  >
                    <Input placeholder="Giá mua" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tình trạng:</Text>
                  <Form.Item name="condition" style={styles.input}>
                    <Input placeholder="Tình trạng" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.modalFooter}>
                {/* Replaced Koi Deceased with Save Button */}
                <TouchableOpacity
                  style={styles.modalSaveButton}
                  onPress={() => form.submit()}
                >
                  <Text style={styles.modalSaveText}>Lưu</Text>
                </TouchableOpacity>
                <View></View>
              </View>
            </View>
          </Form>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default EditFish;
