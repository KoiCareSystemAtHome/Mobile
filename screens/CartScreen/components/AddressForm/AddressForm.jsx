import { Button, Form, View } from "@ant-design/react-native";
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

const AddressForm = ({navigation}) => {
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

  const onFinish = async (values) => {
    const address = {
      provinceId: String(JSON.parse(selectedProvince).provinceId),
      provinceName: JSON.parse(selectedProvince).provinceName,
      districtId: String(JSON.parse(selectedDistrict).districtId),
      districtName: JSON.parse(selectedDistrict).districtName,
      wardId: String(JSON.parse(selectedWard).wardCode),
      wardName: JSON.parse(selectedWard).wardName,
    };
    try {
      await AsyncStorage.setItem('address', JSON.stringify(address));
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error('Error saving address to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    dispatch(getProvince());
  }, [dispatch]);

  useEffect(() => {
    console.log(selectedDistrict);

    if (selectedProvince) {
      const province = JSON.parse(selectedProvince);
      dispatch(getDistrict(province.provinceId));
      setSelectedDistrict(null);
      setSelectedWard(null);
    }
  }, [selectedProvince, dispatch]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = JSON.parse(selectedDistrict);
      dispatch(getWard(district.districtId));
      setSelectedWard(null);
    }
  }, [selectedDistrict, dispatch]);

  return (
    <ImageBackground
      source={require("../../../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Add an address</Text>
        <Form form={form} onFinish={onFinish} style={{ backgroundColor: "transparentr" }}>
          <Form.Item label="Province" style={styles.dropdownContainer}>
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
              style={openProvince ? { marginBottom: 200 } : {}}
            />
          </Form.Item>

          <Form.Item label="District" style={styles.dropdownContainer}>
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
            />
          </Form.Item>

          <Form.Item label="Ward" style={styles.dropdownContainer}>
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
            />
          </Form.Item>

          <Button type="primary" onPress={() => form.submit()}>
            Submit
          </Button>
        </Form>
      </View>
    </ImageBackground>
  );
};

export default AddressForm;
