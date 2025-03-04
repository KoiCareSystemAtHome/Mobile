import {  Text, Form, Modal, Input, Button, Provider } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import {  useDispatch, useSelector } from "react-redux";
import { pondByOwnerSelector } from "../../redux/selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import Icon from "react-native-vector-icons/AntDesign";

const WaterParameter = () => {
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  const handleChangeParameters = () => {
    setModalVisible(true);
  };

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    setModalVisible(false);
  };


  useEffect(() => {
    const getData = async (key) => {
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
  return (
    <Provider>
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Water Parameter</Text>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => setHomePondOpen(!homePondOpen)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>
              {homePond ? homePond?.name : "Select a Pond"}
            </Text>
            <Icon name="down" size={16} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          {homePondOpen && (
            <View style={styles.dropdown}>
              {pondData.map((item) => (
                <TouchableOpacity
                  key={item?.pondID}
                  onPress={() => {
                    setHomePond(item);
                    setHomePondOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItem}>{item?.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{homePond?.name}</Text>
          <Text style={styles.cardDate}>01/01/2023 - 8:30</Text>
          <View style={styles.columns}>
            {/* First Column */}
            <View style={styles.column}>
              <Text style={styles.greenText}>
                Nitrate (NO2): <Text style={styles.boldText}>0mg/L</Text>
              </Text>
              <Text style={styles.greenText}>
                Nitrate (NO3): <Text style={styles.boldText}>0mg/L</Text>
              </Text>
              <Text style={styles.greenText}>
                Phosphate (PO4): <Text style={styles.boldText}>0mg/L</Text>
              </Text>
              <Text style={styles.greenText}>
                Ammonium (NH4): <Text style={styles.boldText}>0mg/L</Text>
              </Text>
              <Text style={styles.greenText}>
                Hardness (SH): <Text style={styles.boldText}>0°dH</Text>
              </Text>
              <Text style={styles.greenText}>
                Salt: <Text style={styles.boldText}>0 %</Text>
              </Text>
              <Text style={styles.greenText}>
                Outdoor temp: <Text style={styles.boldText}>0°C</Text>
              </Text>
            </View>

            {/* Second Column */}
            <View style={styles.column}>
              <Text style={styles.greenText}>
                Oxygen (O2): <Text style={styles.boldText}>0mg/L</Text>
              </Text>
              <Text style={styles.greenText}>
                Temp(°C): <Text style={styles.boldText}>0°C</Text>
              </Text>
              <Text style={styles.greenText}>
                pH-value: <Text style={styles.boldText}>-</Text>
              </Text>
              <Text style={styles.greenText}>
                KH: <Text style={styles.boldText}>10°dH</Text>
              </Text>
              <Text style={styles.greenText}>
                Chlorine: <Text style={styles.boldText}>0mg/L</Text>
              </Text>
              <Text style={styles.greenText}>
                Nitrate: <Text style={styles.boldText}>0mg/L</Text>
              </Text>
              <Text style={styles.greenText}>
                Amount fed: <Text style={styles.boldText}>10g</Text>
              </Text>
            </View>
          </View>

          {/* Additional Info */}
          <Text style={styles.infoText}>
            Outdoor Temp: need to be supervised regularly
          </Text>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={handleChangeParameters}
          >
            <Text style={styles.changeButtonText}>Change Parameters</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Change Water Parameters</Text>
              </View>

              <Form form={form} onFinish={onFinish} style={styles.form}>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please enter the pond name" },
                  ]}
                >
                  <Input placeholder="Pond Name" style={styles.input} />
                </Form.Item>

                <View style={styles.modalFooter}>
                  <Button
                    style={styles.modalCancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    style={styles.modalSaveButton}
                    onPress={() => form.submit()}
                  >
                    Save
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
</Provider>

  );
};

export default WaterParameter;
