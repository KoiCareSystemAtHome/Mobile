import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";
import { Form, Input, Button } from "@ant-design/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import {
  districtSelector,
  provinceSelector,
  wardSelector,
} from "../../redux/selector";
import { getDistrict, getProvince, getWard } from "../../redux/slices/ghnSlice";
import { getImage, updateProfile } from "../../redux/slices/authSlice";

const EditProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // Image states
  const [imageBlob, setImageBlob] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);

  // Address-related states
  const provinceData = useSelector(provinceSelector);
  const districtData = useSelector(districtSelector);
  const wardData = useSelector(wardSelector);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const parsedUser = userData ? JSON.parse(userData) : null;
        setIsLoggedIn(parsedUser);
        const token = await AsyncStorage.getItem("accessToken");
        setToken(token);

        if (parsedUser?.image) {
          setImageBlob(parsedUser.image);
          setUploadResponse(parsedUser.image);
        }
        if (parsedUser?.address) {
          setSelectedProvince(
            JSON.stringify({
              provinceId: parsedUser.address.provinceId,
              provinceName: parsedUser.address.provinceName,
            })
          );
          setSelectedDistrict(
            JSON.stringify({
              districtId: parsedUser.address.districtId,
              districtName: parsedUser.address.districtName,
            })
          );
          setSelectedWard(
            JSON.stringify({
              wardCode: parsedUser.address.wardId,
              wardName: parsedUser.address.wardName,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
    dispatch(getProvince());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      form.setFieldsValue({
        name: isLoggedIn.name,
        email: isLoggedIn.email,
        gender: isLoggedIn.gender,
      });
    }
  }, [isLoggedIn, form]);

  useEffect(() => {
    if (selectedProvince) {
      const province = JSON.parse(selectedProvince);
      dispatch(getDistrict(province.provinceId));
      if (!selectedDistrict) {
        setSelectedDistrict(null);
        setSelectedWard(null);
      }
    }
  }, [selectedProvince, dispatch]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = JSON.parse(selectedDistrict);
      dispatch(getWard(district.districtId));
      if (!selectedWard) {
        setSelectedWard(null);
      }
    }
  }, [selectedDistrict, dispatch]);

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

  const onFinish = async (values) => {
    const address = {
      provinceId: selectedProvince
        ? String(JSON.parse(selectedProvince).provinceId)
        : "",
      provinceName: selectedProvince
        ? JSON.parse(selectedProvince).provinceName
        : "",
      districtId: selectedDistrict
        ? String(JSON.parse(selectedDistrict).districtId)
        : "",
      districtName: selectedDistrict
        ? JSON.parse(selectedDistrict).districtName
        : "",
      wardId: selectedWard ? String(JSON.parse(selectedWard).wardCode) : "",
      wardName: selectedWard ? JSON.parse(selectedWard).wardName : "",
    };

    try {
      const existingUserData = await AsyncStorage.getItem("user");
      const existingUser = existingUserData ? JSON.parse(existingUserData) : {};
      const updatedProfileForApi = {
        name: values.name !== undefined ? values.name : existingUser.name,
        email: values.email !== undefined ? values.email : existingUser.email,
        gender: values.gender !== undefined ? values.gender : existingUser.gender,
        address: Object.keys(address).length > 0 ? address : existingUser.address,
        avatar: uploadResponse || existingUser.image || "",
        userReminder: "2025-04-08T20:40:01.369Z",
        shopDescription: "string",
        bizLicense: "string",
      };
      dispatch(updateProfile(updatedProfileForApi))
        .unwrap()
        .then((res) => {
        });
      const updatedProfile = {
        ...existingUser,
        name: values.name !== undefined ? values.name : existingUser.name,
        email: values.email !== undefined ? values.email : existingUser.email,
        gender: values.gender !== undefined ? values.gender : existingUser.gender,
        address: Object.keys(address).length > 0 ? address : existingUser.address,
        avatar: uploadResponse || existingUser.image || "",
        userReminder: "2025-04-08T20:40:01.369Z",
        shopDescription: "string",
        bizLicense: "string",
      };

      // await AsyncStorage.setItem("user", JSON.stringify(updatedProfile));
      console.log("Profile updated:", updatedProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const renderForm = () => (
    <View style={styles.formWrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Hồ sơ cá nhân</Text>
      </View>

      {imageBlob ? (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={{ uri: uploadResponse || imageBlob }}
              style={styles.selectedImage}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.imageButtonText}>Chạm để Chọn Hình Ảnh</Text>
        </TouchableOpacity>
      )}

      <Form
        form={form}
        name="edit_profile"
        onFinish={onFinish}
        style={styles.formContainer}
      >
        <Form.Item name="name" noStyle>
          <Input placeholder="Họ và tên" style={styles.inputField} />
        </Form.Item>

        <Form.Item
          name="email"
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

        <Form.Item style={styles.dropdownContainer}>
          <DropDownPicker
            placeholder="Select Province"
            open={openProvince}
            value={selectedProvince}
            items={
              provinceData?.map((prov) => ({
                label: prov.ProvinceName,
                value: JSON.stringify({
                  provinceId: prov.ProvinceID,
                  provinceName: prov.ProvinceName,
                }),
              })) || []
            }
            setOpen={setOpenProvince}
            setValue={setSelectedProvince}
            listMode="SCROLLVIEW"
            style={openProvince ? { marginBottom: 200 } : {}}
            dropDownStyle={styles.dropdownBox}
            zIndex={3000} // Ensure proper layering
            zIndexInverse={1000}
          />
        </Form.Item>

        <Form.Item style={styles.dropdownContainer}>
          <DropDownPicker
            placeholder={
              selectedProvince ? "Select District" : "Select Province First"
            }
            open={openDistrict}
            value={selectedDistrict}
            items={
              districtData?.map((dist) => ({
                label: dist.DistrictName,
                value: JSON.stringify({
                  districtId: dist.DistrictID,
                  districtName: dist.DistrictName,
                }),
              })) || []
            }
            setOpen={setOpenDistrict}
            setValue={setSelectedDistrict}
            disabled={!selectedProvince}
            style={openDistrict ? { marginBottom: 200 } : {}}
            dropDownStyle={styles.dropdownBox}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </Form.Item>

        <Form.Item style={styles.dropdownContainer}>
          <DropDownPicker
            placeholder={
              selectedDistrict ? "Select Ward" : "Select District First"
            }
            open={openWard}
            value={selectedWard}
            items={
              wardData?.map((w) => ({
                label: w.WardName,
                value: JSON.stringify({
                  wardCode: w.WardCode,
                  wardName: w.WardName,
                }),
              })) || []
            }
            setOpen={setOpenWard}
            setValue={setSelectedWard}
            disabled={!selectedDistrict}
            style={openWard ? { marginBottom: 200 } : {}}
            dropDownStyle={styles.dropdownBox}
            zIndex={1000}
            zIndexInverse={3000}
          />
        </Form.Item>

        <Button
          type="primary"
          style={styles.submitButton}
          onPress={() => form.submit()}
        >
          <Text style={styles.submitButtonText}>Lưu</Text>
        </Button>
      </Form>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <FlatList
        data={[1]} // Single item to render the form
        renderItem={renderForm}
        keyExtractor={() => "edit-profile"}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

export default EditProfile;