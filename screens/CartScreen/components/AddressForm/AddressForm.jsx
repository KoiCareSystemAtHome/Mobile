import { Button, Form, View, Input } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { ImageBackground, Text } from "react-native";
import {
  districtSelector,
  provinceSelector,
  wardSelector,
} from "../../../../redux/selector";
import {
  getDistrict,
  getProvince,
  getWard,
} from "../../../../redux/slices/ghnSlice";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddressForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const provinceData = useSelector(provinceSelector);
  const districtData = useSelector(districtSelector);
  const wardData = useSelector(wardSelector);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  // State to store AsyncStorage data and track initial load
  const [storedUserInfo, setStoredUserInfo] = useState(null);
  const [storedAddress, setStoredAddress] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [fetchedProvinceId, setFetchedProvinceId] = useState(null);
  const [fetchedDistrictId, setFetchedDistrictId] = useState(null);

  useEffect(() => {
    // Fetch userInfo and address from AsyncStorage
    const fetchStoredData = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        const storedAddress = await AsyncStorage.getItem("address");

        console.log("Stored userInfo:", storedUserInfo);
        console.log("Stored address:", storedAddress);

        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          setStoredUserInfo(userInfo);
          form.setFieldsValue({
            name: userInfo.name || "",
            phoneNumber: userInfo.phoneNumber || "",
          });
        }

        if (storedAddress) {
          const address = JSON.parse(storedAddress);
          setStoredAddress(address);
          console.log("Parsed address:", address);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    dispatch(getProvince());
    fetchStoredData();
  }, [dispatch, form]);

  useEffect(() => {
    if (isInitialLoad && storedAddress && provinceData?.length > 0 && !selectedProvince) {
      const provinceValue = provinceData.find(
        (prov) => prov.ProvinceID === parseInt(storedAddress.provinceId)
      );
      if (provinceValue) {
        const provinceString = JSON.stringify({
          provinceId: provinceValue.ProvinceID,
          provinceName: provinceValue.ProvinceName,
        });
        setSelectedProvince(provinceString);
        console.log("Set selectedProvince:", provinceString);
      }
    }
  }, [isInitialLoad, storedAddress, provinceData, selectedProvince]);

  useEffect(() => {
    if (selectedProvince) {
      const province = JSON.parse(selectedProvince);
      // Only dispatch getDistrict if not already fetched for this provinceId
      if (fetchedProvinceId !== province.provinceId) {
        dispatch(getDistrict(province.provinceId));
        setFetchedProvinceId(province.provinceId);
        console.log("Dispatched getDistrict for provinceId:", province.provinceId);
      }

      if (isInitialLoad && storedAddress && districtData?.length > 0 && !selectedDistrict) {
        console.log("districtData:", districtData);
        const districtValue = districtData.find(
          (dist) => dist.DistrictID === parseInt(storedAddress.districtId)
        );
        if (districtValue) {
          const districtString = JSON.stringify({
            districtId: districtValue.DistrictID,
            districtName: districtValue.DistrictName,
          });
          setSelectedDistrict(districtString);
          console.log("Set selectedDistrict:", districtString);
        }
      }
    }
  }, [selectedProvince, storedAddress, districtData, isInitialLoad, dispatch, fetchedProvinceId]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = JSON.parse(selectedDistrict);
      // Only dispatch getWard if not already fetched for this districtId
      if (fetchedDistrictId !== district.districtId) {
        dispatch(getWard(district.districtId));
        setFetchedDistrictId(district.districtId);
        console.log("Dispatched getWard for districtId:", district.districtId);
      }

      if (isInitialLoad && storedAddress && wardData?.length > 0 && !selectedWard) {
        console.log("wardData:", wardData);
        const wardValue = wardData.find(
          (w) => w.WardCode === storedAddress.wardId
        );
        if (wardValue) {
          const wardString = JSON.stringify({
            wardCode: wardValue.WardCode,
            wardName: wardValue.WardName,
          });
          setSelectedWard(wardString);
          console.log("Set selectedWard:", wardString);
          setIsInitialLoad(false); // Mark initial load as complete
        }
      }
    }
  }, [selectedDistrict, storedAddress, wardData, isInitialLoad, dispatch, fetchedDistrictId]);

  const onFinish = async (values) => {
    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      console.error("Please select province, district, and ward");
      return;
    }

    const address = {
      provinceId: String(JSON.parse(selectedProvince).provinceId),
      provinceName: JSON.parse(selectedProvince).provinceName,
      districtId: String(JSON.parse(selectedDistrict).districtId),
      districtName: JSON.parse(selectedDistrict).districtName,
      wardId: String(JSON.parse(selectedWard).wardCode),
      wardName: JSON.parse(selectedWard).wardName,
    };
    const userInfo = {
      name: values.name,
      phoneNumber: values.phoneNumber,
    };
    try {
      await AsyncStorage.setItem("address", JSON.stringify(address));
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigation.navigate("CartScreen");
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin người nhận</Text>
        <Form
          form={form}
          onFinish={onFinish}
          style={{ backgroundColor: "transparent", width: "100%" }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
            style={styles.dropdownContainer}
            noStyle
          >
            <Input placeholder="Enter your name" style={styles.input} />
          </Form.Item>

          <Form.Item
            noStyle
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]+$/,
                message: "Please enter a valid phone number",
              },
            ]}
            style={styles.dropdownContainer}
          >
            <Input
              placeholder="Enter your phone number"
              keyboardType="numeric"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item label="Province" style={styles.dropdownContainer} noStyle>
            <DropDownPicker
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
              style={[
                styles.dropdown,
                openProvince ? { marginBottom: 200 } : {},
              ]}
              textStyle={{ fontSize: 16, color: "#333" }}
              dropDownContainerStyle={styles.dropdown}
              placeholder="Chọn tỉnh/thành phố"
            />
          </Form.Item>

          <Form.Item label="District" style={styles.dropdownContainer} noStyle>
            <DropDownPicker
              placeholder={
                selectedProvince ? "Chọn Quận/Huyện" : "Hãy chọn tỉnh/thành phố"
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
              style={[
                styles.dropdown,
                openDistrict ? { marginBottom: 200 } : {},
              ]}
              textStyle={{ fontSize: 16, color: "#333" }}
              dropDownContainerStyle={styles.dropdown}
            />
          </Form.Item>

          <Form.Item label="Ward" style={styles.dropdownContainer} noStyle>
            <DropDownPicker
              placeholder={
                selectedDistrict ? "Chọn Phường/Xã" : "Hãy chọn quận/huyện"
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
              style={[styles.dropdown, openWard ? { marginBottom: 200 } : {}]}
              textStyle={{ fontSize: 16, color: "#333" }}
              dropDownContainerStyle={styles.dropdown}
            />
          </Form.Item>

          <Button
            type="primary"
            onPress={() => form.submit()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Lưu</Text>
          </Button>
        </Form>
      </View>
    </ImageBackground>
  );
};

export default AddressForm;