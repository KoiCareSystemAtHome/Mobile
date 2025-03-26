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
    values.length = 5;
    values.weight = Number(values?.weight);
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
    console.log(updatedFish)
    dispatch(updateFish(updatedFish))
    .unwrap()
    .then(()=>{
      Toast.success("Fish Updated Successfully");
      dispatch(getFishByOwner(isLoggedIn?.id));
    })
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
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Koi</Text>
              {/* Removed Save button from header */}
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
                  <Text style={styles.inputLabel}>Pond:</Text>
                  <Form.Item name="pond" style={styles.input}>
                    <Input placeholder="Pond" disabled />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>In Pond Since:</Text>
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
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Breeder:</Text>
                  <Form.Item name="breeder" style={styles.input}>
                    <Input placeholder="Breeder" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Purchase Price:</Text>
                  <Form.Item
                    name="purchasePrice"
                    style={styles.input}
                    extra="VND"
                  >
                    <Input placeholder="Purchase Price" />
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
              </View>
              <View style={styles.modalFooter}>
                {/* Replaced Koi Deceased with Save Button */}
                <TouchableOpacity
                  style={styles.modalSaveButton}
                  onPress={() => form.submit()}
                >
                  <Text style={styles.modalSaveText}>Save</Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity style={styles.deleteButton}>
                    <FontAwesome name="trash" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.deleteButtonText}>Delete Koi</Text>
                </View>
              </View>
            </View>
          </Form>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default EditFish;
