import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Button,
  Form,
  Input,
  Provider,
  Toast,
  DatePicker,
} from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { pondByOwnerSelector } from "../../../redux/selector";
import { getImage } from "../../../redux/slices/authSlice";
import { createFish, getFishByOwner } from "../../../redux/slices/fishSlice";
import { styles } from "./styles";
import { getPondByOwner } from "../../../redux/slices/pondSlice";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

const AddFish = ({ navigation, route }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { pondID } = route.params || {};

  const pondData = useSelector(pondByOwnerSelector);
  const [open, setOpen] = useState(false);
  const [selectedPond, setSelectedPond] = useState(pondID || null);
  const [pondItems, setPondItems] = useState([]);
  const [imageBlob, setImageBlob] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [inPondSince, setInPondSince] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

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

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getPondByOwner(isLoggedIn.id));
    }
  }, [isLoggedIn?.id, dispatch]);

  useEffect(() => {
    if (pondData) {
      const items = pondData.map((pond) => ({
        label: pond.name,
        value: pond.pondID,
      }));
      setPondItems(items);
      if (pondID && items.some((item) => item.value === pondID)) {
        setSelectedPond(pondID);
      }
    }
  }, [pondData, pondID]);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.fail("Cần quyền truy cập thư viện ảnh!");
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
      setIsImageUploading(true);
      try {
        const response = await dispatch(getImage(formData)).unwrap();
        if (response) {
          setUploadResponse(response.imageUrl);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
        Toast.fail("Tải ảnh thất bại");
      } finally {
        setIsImageUploading(false);
      }
    }
  };

  const onFinish = (values) => {
    const pondIDToUse = selectedPond;
    let image = "string";
    values.age = Number(values?.age);
    values.weight = Number(values?.weight);
    values.price = Number(values?.price);
    values.physique = "string";
    values.size = Number(values?.size);
    values.inPondSince = inPondSince.toISOString();
    if (uploadResponse) {
      image = uploadResponse;
    }
    const requirementFishParam = [
      {
        historyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        value: 0,
      },
    ];
    values = { ...values, pondID: pondIDToUse, requirementFishParam, image };

    dispatch(createFish(values))
      .unwrap()
      .then((response) => {
        if (response?.status === "201") {
          Toast.success("Cá Đã Được Thêm Thành Công");
          dispatch(getFishByOwner(isLoggedIn?.id));
          dispatch(getPondByOwner(isLoggedIn?.id));
          form.resetFields();
          setImageBlob(null);
          setUploadResponse(null);
          navigation.goBack();
        } else {
          Toast.fail("Thêm Cá Thất Bại");
        }
      })
      .catch((error) => {
        console.error("Create fish error:", error);
        Toast.fail("Thêm Cá Thất Bại");
      });
  };

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
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Thêm Cá Koi Mới</Text>
            <View style={{ width: 24 }} />
          </View>

          <Form form={form} onFinish={onFinish} style={styles.form}>
            {imageBlob ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: uploadResponse || imageBlob }}
                  style={styles.selectedImage}
                />
                <TouchableOpacity
                  style={styles.changeImageButton}
                  onPress={handleImagePick}
                >
                  <Text style={styles.changeImageText}>Thay Đổi Ảnh</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleImagePick}
              >
                <FontAwesome name="image" size={24} color="#0077B6" />
                <Text style={styles.imageButtonText}>Chọn Hình Ảnh</Text>
              </TouchableOpacity>
            )}

            <View style={styles.modalFields}>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tên</Text>
                  <Form.Item
                    noStyle
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Tên"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tuổi (ngày)</Text>
                  <Form.Item
                    noStyle
                    name="age"
                    rules={[
                      { required: true, message: "Vui lòng nhập tuổi!" },
                      { pattern: /^[0-9]+$/, message: "Chỉ được nhập số!" },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Tuổi (ngày)"
                      keyboardType="numeric"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Chiều dài</Text>
                  <Form.Item
                    noStyle
                    name="size"
                    extra="cm"
                    rules={[
                      { required: true, message: "Vui lòng nhập chiều dài!" },
                      { pattern: /^[0-9]+$/, message: "Chỉ được nhập số!" },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Chiều dài"
                      keyboardType="numeric"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Cân nặng</Text>
                  <Form.Item
                    noStyle
                    name="weight"
                    extra="kg"
                    rules={[
                      { required: true, message: "Vui lòng nhập cân nặng!" },
                      { pattern: /^[0-9]+$/, message: "Chỉ được nhập số!" },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Cân nặng"
                      keyboardType="numeric"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giới tính</Text>
                  <Form.Item
                    noStyle
                    name="sex"
                    rules={[
                      { required: true, message: "Vui lòng nhập giới tính!" },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Giới tính"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giống</Text>
                  <Form.Item
                    noStyle
                    name="varietyName"
                    rules={[
                      { required: true, message: "Vui lòng nhập giống!" },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Giống"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tình trạng</Text>
                  <Form.Item
                    noStyle
                    name="condition"
                    rules={[
                      { required: true, message: "Vui lòng nhập tình trạng!" },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Tình trạng"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Trong ao từ</Text>
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
                  <Text style={styles.inputLabel}>Nhà lai tạo</Text>
                  <Form.Item
                    noStyle
                    name="breeder"
                    rules={[
                      { required: true, message: "Vui lòng nhập nhà lai tạo!" },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Nhà lai tạo"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giá mua</Text>
                  <Form.Item
                    noStyle
                    name="price"
                    extra="VND"
                    rules={[
                      { required: true, message: "Vui lòng nhập giá mua!" },
                      { pattern: /^[0-9]+$/, message: "Chỉ được nhập số!" },
                      {
                        validator: (_, value) =>
                          value && Number(value) <= 1000
                            ? Promise.reject("Giá phải lớn hơn 1000 VND!")
                            : Promise.resolve(),
                      },
                    ]}
                  >
                    <Input
                      style={styles.input}
                      placeholder="Giá mua"
                      keyboardType="numeric"
                      placeholderTextColor="#A0AEC0"
                    />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Ao</Text>
                  <DropDownPicker
                    open={open}
                    value={selectedPond}
                    items={pondItems}
                    setOpen={setOpen}
                    setValue={setSelectedPond}
                    setItems={setPondItems}
                    placeholder="Chọn một ao"
                    placeholderStyle={styles.dropdownPlaceholder}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownBox}
                    textStyle={styles.dropdownText}
                    listMode="SCROLLVIEW"
                    zIndex={1000}
                    zIndexInverse={2000}
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <Button
                  style={styles.modalCancelButton}
                  onPress={() => navigation.goBack()}
                >
                  Hủy
                </Button>
                <Button
                  style={styles.modalSaveButton}
                  onPress={() => form.submit()}
                  disabled={!selectedPond || isImageUploading}
                  loading={isImageUploading}
                >
                  Lưu
                </Button>
              </View>
            </View>
          </Form>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default AddFish;
