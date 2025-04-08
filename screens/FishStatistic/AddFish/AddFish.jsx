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

const AddFish = ({ navigation, route }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { pondID } = route.params || {}; // Default to empty object if route.params is undefined

  const pondData = useSelector(pondByOwnerSelector);
  const [open, setOpen] = useState(false);
  const [selectedPond, setSelectedPond] = useState(pondID || null); // Set initial value to pondID if it exists
  const [pondItems, setPondItems] = useState([]);
  const [imageBlob, setImageBlob] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [inPondSince, setInPondSince] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    if (pondData) {
      const items = pondData.map((pond) => ({
        label: pond.name,
        value: pond.pondID,
      }));
      setPondItems(items);
      
      // If pondID exists and matches an item, set it as selected
      if (pondID && items.some(item => item.value === pondID)) {
        setSelectedPond(pondID);
      }
    }
  }, [pondData, pondID]);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
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

  const onFinish = (values) => {
    const pondIDToUse = selectedPond; // Use selectedPond instead of route param directly
    let image = "string";
    values.age = Number(values?.age);
    values.length = Number(values?.length);
    values.weight = Number(values?.weight);
    values.price = Number(values?.price);
    values.physique = "string";
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
          Toast.success("Fish Added Successfully");
          return dispatch(getFishByOwner(isLoggedIn?.id)).unwrap();
        } else {
          Toast.fail("Failed to add fish");
        }
      })
      .then(() => {
        form.resetFields();
        navigation.goBack();
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
          <Form
            form={form}
            onFinish={onFinish}
            style={{ backgroundColor: "transparent", borderWidth: 0 }}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Thêm Cá Koi Mới</Text>
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
                <Text style={styles.imageButtonText}>Chạm để Chọn Hình Ảnh</Text>
              </TouchableOpacity>
            )}
  
            <View style={styles.modalFields}>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tên:</Text>
                  <Form.Item 
                    name="name" 
                    style={styles.input}
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                  >
                    <Input placeholder="Tên" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tuổi:</Text>
                  <Form.Item 
                    name="age" 
                    style={styles.input}
                    rules={[
                      { required: true, message: 'Vui lòng nhập tuổi!' },
                      { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' }
                    ]}
                  >
                    <Input placeholder="Tuổi" keyboardType="numeric" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Chiều dài:</Text>
                  <Form.Item 
                    name="size" 
                    style={styles.input} 
                    extra="cm"
                    rules={[
                      { required: true, message: 'Vui lòng nhập chiều dài!' },
                      { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' }
                    ]}
                  >
                    <Input placeholder="Chiều dài" keyboardType="numeric" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Cân nặng:</Text>
                  <Form.Item 
                    name="weight" 
                    style={styles.input} 
                    extra="kg"
                    rules={[
                      { required: true, message: 'Vui lòng nhập cân nặng!' },
                      { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' }
                    ]}
                  >
                    <Input placeholder="Cân nặng" keyboardType="numeric" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giới tính:</Text>
                  <Form.Item 
                    name="sex" 
                    style={styles.input}
                    rules={[{ required: true, message: 'Vui lòng nhập giới tính!' }]}
                  >
                    <Input placeholder="Giới tính" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giống:</Text>
                  <Form.Item 
                    name="varietyName" 
                    style={styles.input}
                    rules={[{ required: true, message: 'Vui lòng nhập giống!' }]}
                  >
                    <Input placeholder="Giống" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Tình trạng:</Text>
                  <Form.Item 
                    name="condition" 
                    style={styles.input}
                    rules={[{ required: true, message: 'Vui lòng nhập tình trạng!' }]}
                  >
                    <Input placeholder="Tình trạng" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Trong ao từ:</Text>
                  <View style={{ backgroundColor: "white", borderRadius: 5 }}>
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
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Nhà lai tạo:</Text>
                  <Form.Item 
                    name="breeder" 
                    style={styles.input}
                    rules={[{ required: true, message: 'Vui lòng nhập nhà lai tạo!' }]}
                  >
                    <Input placeholder="Nhà lai tạo" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Giá mua:</Text>
                  <Form.Item 
                    name="price" 
                    style={styles.input} 
                    extra="VND"
                    rules={[
                      { required: true, message: 'Vui lòng nhập giá mua!' },
                      { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },
                      { 
                        validator: (_, value) => 
                          value && Number(value) <= 1000 
                            ? Promise.reject('Giá phải lớn hơn 1000 VND!') 
                            : Promise.resolve()
                      }
                    ]}
                  >
                    <Input placeholder="Giá mua" keyboardType="numeric" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Ao:</Text>
                  <DropDownPicker
                    open={open}
                    value={selectedPond}
                    items={pondItems}
                    setOpen={setOpen}
                    setValue={setSelectedPond}
                    setItems={setPondItems}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownStyle={styles.dropdownBox}
                    placeholder="Chọn một ao"
                    listMode="SCROLLVIEW"
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.modalCancelText}>Hủy</Text>
                </TouchableOpacity>
                <Button
                  type="ghost"
                  style={styles.modalSaveButton}
                  onPress={() => form.submit()}
                  disabled={!selectedPond || !imageBlob}
                >
                  <Text style={selectedPond ? styles.modalSaveText : styles.modalSaveTextDisabled}>Lưu</Text>
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