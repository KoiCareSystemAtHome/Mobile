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
import { createFish } from "../../../redux/slices/fishSlice";
import { styles } from "./styles";

const AddFish = ({ navigation }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const pondData = useSelector(pondByOwnerSelector);
  const [open, setOpen] = useState(false);
  const [selectedPond, setSelectedPond] = useState(null);
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
      setPondItems(
        pondData.map((pond) => ({
          label: pond.name,
          value: pond.pondID,
        }))
      );
    }
  }, [pondData]);

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
          console.log(response);
          setUploadResponse(response.imageUrl);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const onFinish = (values) => {
    const pondID = selectedPond;
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
    values = { ...values, pondID, requirementFishParam, image };
    dispatch(createFish(values))
      .unwrap()
      .then((response) => {
        if (response?.status === "201") {
          Toast.success("Fish Added Successfully");
          dispatch(getFishByOwner(isLoggedIn.id));
          form.resetFields();
          setInPondSince(new Date());
          navigation.goBack();
        } else {
          Toast.fail("Failed to add fish");
          navigation.goBack();
        }
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
            style={{ backgroundColor: "transparent", borderWidth: 0}}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Koi</Text>
            </View>
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
                  <Text style={styles.changeImageText}>Change Picture</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleImagePick}
              >
                <Text style={styles.imageButtonText}>Tap To Select Image</Text>
              </TouchableOpacity>
            )}

            <View style={styles.modalFields}>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Name:</Text>
                  <Form.Item name="name" style={styles.input}>
                    <Input placeholder="Name" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Age:</Text>
                  <Form.Item name="age" style={styles.input}>
                    <Input placeholder="Age" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Length:</Text>
                  <Form.Item name="length" style={styles.input} extra="cm">
                    <Input placeholder="Length" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Weight:</Text>
                  <Form.Item name="weight" style={styles.input} extra="kg">
                    <Input placeholder="Weight" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Sex:</Text>
                  <Form.Item name="sex" style={styles.input}>
                    <Input placeholder="Sex" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Variety:</Text>
                  <Form.Item name="varietyName" style={styles.input}>
                    <Input placeholder="Variety" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Condition:</Text>
                  <Form.Item name="condition" style={styles.input}>
                    <Input placeholder="Condition" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>In Pond Since:</Text>
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
                          {inPondSince.toLocaleDateString("en-GB", {
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
                  <Text style={styles.inputLabel}>Breeder:</Text>
                  <Form.Item name="breeder" style={styles.input}>
                    <Input placeholder="Breeder" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Purchase Price:</Text>
                  <Form.Item name="price" style={styles.input} extra="VND">
                    <Input placeholder="Price" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Pond:</Text>
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
                    placeholder="Select a Pond"
                    listMode="SCROLLVIEW"
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <Button
                  type="ghost"
                  style={styles.modalSaveButton}
                  onPress={() => form.submit()}
                >
                  <Text style={styles.modalSaveText}>Save</Text>
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
