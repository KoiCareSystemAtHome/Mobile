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
  RefreshControl,
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
  const [warnings, setWarnings] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const [form] = Form.useForm();

  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      dispatch(getRequiredParams()),
      isLoggedIn?.id && dispatch(getPondByOwner(isLoggedIn.id)),
      homePond?.pondID &&
        dispatch(getPondByID(homePond?.pondID))
          .unwrap()
          .then((response) => {
            setSelectedPond(response);
          }),
    ]).finally(() => {
      setRefreshing(false);
    });
  };

  const handleChangeParameters = () => {
    setModalVisible(true);
  };

  const handleParamChange = (text, param) => {
    const value = parseFloat(text);
    let message = "";
    let type = "";
    const dangerLower = param.dangerLower ?? -Infinity;
    const dangerUpper = param.dangerUpper ?? Infinity;
    const warningLowwer = param.warningLowwer ?? dangerLower;
    const warningUpper = param.warningUpper ?? dangerUpper;

    if (!isNaN(value)) {
      if (value < dangerLower || value > dangerUpper) {
        message = `Nguy hiểm! (${value}) vượt ngoài ${dangerLower === -Infinity ? '0' : dangerLower} - ${dangerUpper === Infinity ? '100' : dangerUpper}`;
        type = "danger";
      } else if (
        (value >= dangerLower && value < warningLowwer) ||
        (value > warningUpper && value <= dangerUpper)
      ) {
        message = `Cảnh báo! (${value}) ngoài vùng ${warningLowwer === -Infinity ? '0' : warningLowwer} - ${warningUpper === Infinity ? '100' : warningUpper}`;
        type = "warning";
      }
    }

    setWarnings((prev) => ({
      ...prev,
      [param.parameterId]: { message, type },
    }));
  };

  const handleSubmit = (values) => {
    const pondID = selectedPond?.pondID;
    const name = selectedPond?.name;
    const image = selectedPond?.image;
    const createDate = selectedPond?.createDate;
    const ownerId = selectedPond?.ownerId;

    const requirementPondParam = requiredParams
      .filter((param) => {
        const value = values[param.parameterId];
        return value !== undefined && value !== "" && value !== null;
      })
      .map((param) => ({
        historyId: param.parameterId,
        value: parseFloat(values[param.parameterId]),
      }));

    if (requirementPondParam.length === 0) {
      setModalVisible(false);
      return;
    }

    const updatedPond = {
      pondID,
      name,
      image,
      createDate,
      ownerId,
      requirementPondParam,
    };

    dispatch(updatePond(updatedPond))
      .unwrap()
      .then(() => {
        dispatch(getRequiredParams());
        dispatch(getPondByOwner(isLoggedIn.id));
        dispatch(getPondByID(homePond?.pondID))
          .unwrap()
          .then((response) => {
            setSelectedPond(response);
          });
      });
    setModalVisible(false);
  };
console.log(requiredParams)

  const renderPondCards = (parameters) => {
    if (!parameters || parameters.length === 0) return null;

    const dayMap = new Map();

    parameters.forEach((param) => {
      param.valueInfors.forEach((valueInfo) => {
        const day = new Date(valueInfo.caculateDay).toLocaleDateString();
        if (!dayMap.has(day)) {
          dayMap.set(day, new Map());
        }
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

    const sortedDays = Array.from(dayMap.entries()).sort(
      (a, b) =>
        new Date(b[1].values().next().value.caculateDay) -
        new Date(a[1].values().next().value.caculateDay)
    );

    return sortedDays.map(([day, paramMap], index) => {
      const params = Array.from(paramMap.values());
      const rows = [];
      for (let i = 0; i < params.length; i += 2) {
        rows.push(params.slice(i, i + 2));
      }

      return (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{homePond?.name}</Text>
          <Text style={styles.cardDate}>{day}</Text>
          <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.parameterRow}>
                {row.map((param, paramIndex) => (
                  <Text key={paramIndex} style={styles.parameterText}>
                    {param.parameterName}:{" "}
                    <Text style={styles.parameterValue}>
                      {param.value.toFixed(2)} {param.unitName}
                    </Text>
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
          <Text style={styles.infoText}>
            Nhiệt độ ngoài trời: cần được giám sát thường xuyên
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
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#26A69A"
            />
          }
        >
          <Text style={styles.title}>Thông số nước</Text>
          <View style={styles.selectorContainer}>
            <TouchableOpacity
              onPress={() => setHomePondOpen(!homePondOpen)}
              style={styles.selector}
              accessibilityLabel="Select a pond"
              accessibilityRole="button"
            >
              <View style={styles.selectorInner}>
                <Text style={styles.selectorText}>
                  {homePond ? homePond?.name : "Chọn hồ"}
                </Text>
                <Icon
                  name={homePondOpen ? "up" : "down"}
                  size={16}
                  color="#004D40"
                />
              </View>
            </TouchableOpacity>
            {homePondOpen && (
              <View style={styles.dropdown}>
                {pondData.length === 0 ? (
                  <Text style={styles.dropdownEmpty}>Không có hồ nào</Text>
                ) : (
                  pondData.map((item) => (
                    <TouchableOpacity
                      key={item?.pondID}
                      onPress={() => {
                        setHomePond(item);
                        setHomePondOpen(false);
                      }}
                      style={styles.dropdownItem}
                      accessibilityLabel={`Select pond ${item?.name}`}
                      accessibilityRole="button"
                    >
                      <Text style={styles.dropdownItemText}>{item?.name}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </View>
          {homePond && renderPondCards(selectedPond?.pondParameters)}
        </ScrollView>
        <TouchableOpacity
          style={styles.addParamsFab}
          onPress={handleChangeParameters}
          accessibilityLabel="Add water parameters"
          accessibilityRole="button"
        >
          <Icon name="plus" size={28} color="#FFFFFF" />
        </TouchableOpacity>
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
                  <Text style={styles.modalTitle}>Lưu thông số nước</Text>
                </View>

                <Form form={form} onFinish={handleSubmit}>
                  {requiredParams?.map((param) => (
                    <View key={param.parameterId} style={styles.paramContainer}>
                      <Text style={styles.paramName}>
                        {param.parameterName} ({param.unitName})
                      </Text>
                      <Text style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={styles.dangerText}>
                          ← {param.dangerLower ?? '0'}
                        </Text>
                        <Text style={styles.warningText}>
                          --{param.warningLowwer ?? param.dangerLower ?? '0'}
                        </Text>
                        <Text style={styles.greenText}>-- an toàn --</Text>
                        <Text style={styles.warningText}>
                          {param.warningUpper ?? param.dangerUpper ?? '100'}--
                        </Text>
                        <Text style={styles.dangerText}>
                          {param.dangerUpper ?? '100'}→
                        </Text>
                      </Text>
                      <Form.Item name={param.parameterId}>
                        <Input
                          placeholder={`Nhập giá trị`}
                          style={styles.paramInput}
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleParamChange(text, param)
                          }
                        />
                      </Form.Item>
                      {warnings[param.parameterId]?.message ? (
                        <Text
                          style={
                            warnings[param.parameterId].type === "danger"
                              ? styles.dangerText
                              : styles.warningText
                          }
                        >
                          {warnings[param.parameterId].message}
                        </Text>
                      ) : null}
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
      </ImageBackground>
    </Provider>
  );
};

export default WaterParameter;