import {
  Text,
  Form,
  Modal,
  Input,
  Button,
  Provider,
} from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  pondByOwnerSelector,
  requiredParamsSelector,
} from "../../redux/selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getPondByID,
  getPondByOwner,
  getRequiredParams,
  updatePond,
} from "../../redux/slices/pondSlice";
import Icon from "react-native-vector-icons/AntDesign";

const WaterParameter = () => {
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const requiredParams = useSelector(requiredParamsSelector);
  const [homePond, setHomePond] = useState(null);
  const [selectedPond, setSelectedPond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  const handleChangeParameters = () => {
    setModalVisible(true);
  };

  const handleSubmit = (values) => {
    const pondID = selectedPond?.pondID;
    const name = selectedPond?.name;
    const image = selectedPond?.image;
    const createDate = selectedPond?.createDate;
    const ownerId = selectedPond?.ownerId;
    const requirementPondParam = requiredParams.map((param) => ({
      historyId: param.parameterId,
      value: values[param.parameterId] || 0,
    }));
    const updatedPond = {
      pondID,
      name,
      image,
      createDate,
      ownerId,
      requirementPondParam,
    };
    console.log(updatedPond);
    dispatch(updatePond(updatedPond));
    setModalVisible(false);
  };

  const renderPondCards = (parameters) => {
    if (!parameters || parameters.length === 0) return null;

    // Step 1: Collect all unique caculateDay values and their parameters
    const dayMap = new Map();

    parameters.forEach((param) => {
      param.valueInfors.forEach((valueInfo) => {
        const day = new Date(valueInfo.caculateDay).toLocaleDateString(); // Group by date only (ignore time)
        if (!dayMap.has(day)) {
          dayMap.set(day, new Map());
        }
        // Store only the latest value for each parameter per day
        const paramMap = dayMap.get(day);
        if (
          !paramMap.has(param.parameterName) ||
          new Date(valueInfo.caculateDay) >
            new Date(paramMap.get(param.parameterName).caculateDay)
        ) {
          paramMap.set(param.parameterName, {
            parameterName: param.parameterName,
            unitName: param.unitName,
            value: valueInfo.value,
            caculateDay: valueInfo.caculateDay,
          });
        }
      });
    });

    // Step 2: Sort days in descending order (most recent first)
    const sortedDays = Array.from(dayMap.entries()).sort(
      (a, b) =>
        new Date(b[1].values().next().value.caculateDay) -
        new Date(a[1].values().next().value.caculateDay)
    );

    // Step 3: Render a card for each day with ScrollView and 2 parameters per row
    return sortedDays.map(([day, paramMap], index) => {
      const params = Array.from(paramMap.values());
      const rows = [];
      for (let i = 0; i < params.length; i += 2) {
        rows.push(params.slice(i, i + 2));
      }

      return (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{homePond?.name}</Text>
          <Text style={styles.cardDate}>
            {day} {/* Display only the date */}
          </Text>
          <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.parameterRow}>
                {row.map((param, paramIndex) => (
                  <Text key={paramIndex} style={styles.greenText}>
                    {param.parameterName}:{" "}
                    <Text style={styles.boldText}>
                      {param.value} {param.unitName}
                    </Text>
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
          <Text style={styles.infoText}>
            Outdoor Temp: need to be supervised regularly
          </Text>
        </View>
      );
    });
  };

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
    dispatch(getRequiredParams());
    if (isLoggedIn?.id) {
      dispatch(getPondByOwner(isLoggedIn.id));
    }
    if (homePond?.pondID) {
      dispatch(getPondByID(homePond?.pondID))
        .unwrap()
        .then((response) => {
          setSelectedPond(response);
        });
    }
  }, [isLoggedIn?.id, dispatch, homePond]);

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

          {homePond && renderPondCards(selectedPond?.pondParameters)}
        </ScrollView>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
          style={styles.modal}
        >
          <ScrollView>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Change Water Parameters</Text>
                </View>

                <Form form={form} onFinish={handleSubmit}>
                  {requiredParams?.map((param) => (
                    <View>
                      <Text style={{ backgroundColor: "white" }}>
                        {param.parameterName}
                      </Text>
                      <Form.Item
                        key={param.parameterId}
                        name={param.parameterId}
                        style={{ fontSize: 12 }}
                      >
                        <Input
                          placeholder={`Enter value (${param.unitName})`}
                        />
                      </Form.Item>
                    </View>
                  ))}

                  <Button type="primary" onPress={() => form.submit()}>
                    Submit
                  </Button>
                  <Button onPress={() => setModalVisible(false)}>Cancel</Button>
                </Form>
              </View>
            </View>
          </ScrollView>
        </Modal>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleChangeParameters}
            >
              <Text style={styles.changeButtonText}>Add Parameters</Text>
            </TouchableOpacity>
      </ImageBackground>
    </Provider>
  );
};

export default WaterParameter;
