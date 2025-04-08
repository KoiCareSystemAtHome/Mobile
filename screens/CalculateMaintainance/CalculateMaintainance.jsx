import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import {
  calculatedMaintainanceSelector,
  pondByOwnerSelector,
} from "../../redux/selector";
import {
  calculateMaintainance,
  saveMaintainance,
} from "../../redux/slices/reminderSlice";
import { DatePicker, Provider, Picker } from "@ant-design/react-native";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";

const CalculateMaintainance = () => {
  const dispatch = useDispatch();
  const pondData = useSelector(pondByOwnerSelector);
  const maintainanceData = useSelector(calculatedMaintainanceSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      setDatePickerVisible(false);
      setTimePickerVisible(false);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if (isMounted.current) {
          setIsLoggedIn(value ? JSON.parse(value) : null);
        }
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
    if (homePond) {
      const pondId = homePond?.pondID;
      dispatch(calculateMaintainance({ pondId }));
    }
  }, [homePond, dispatch]);

  const handleSave = () => {
    if (maintainanceData) {
      const updatedMaintenanceData = {
        ...maintainanceData,
        maintainDate: endDate.toISOString(),
      };
      console.log(updatedMaintenanceData)
      dispatch(saveMaintainance(updatedMaintenanceData))
        .unwrap()
        .then((res) => {
          if (res.message) {
            Alert.alert(res.message);
          }
        })
        .catch((error) => {
          console.error("Error saving maintenance:", error);
          Alert.alert("Error", "Failed to save maintenance");
        });
    }
  };

  const handleDatePickerChange = (date) => {
    if (isMounted.current) {
      const newDate = new Date(endDate);
      newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setEndDate(newDate);
      setDatePickerVisible(false);
    }
  };

  const handleTimePickerChange = (time) => {
    if (isMounted.current) {
      const [hours, minutes] = time;
      const newDate = new Date(endDate);
      newDate.setUTCHours(hours, minutes, 0, 0);
      setEndDate(newDate);
      setTimePickerVisible(false);
    }
  };

  const timeData = [
    Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: `${i.toString().padStart(2, "0")}`,
      key: `hour-${i}`,
    })),
    Array.from({ length: 60 }, (_, i) => ({
      value: i,
      label: `${i.toString().padStart(2, "0")}`,
      key: `minute-${i}`,
    })),
  ];

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Lịch Trình Bảo Trì</Text>

          {/* Pond Selector */}
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setHomePondOpen(!homePondOpen)}
              style={styles.selector}
            >
              <Text style={styles.selectorText}>
                {homePond ? homePond?.name : "Chọn một ao"}
              </Text>
              <Icon name="down" size={16} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            {homePondOpen && (
              <View style={styles.dropdown}>
                {pondData?.map((item) => (
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

          {homePond && maintainanceData && (
            <View>
              <Text style={styles.subtitle}>{maintainanceData?.title}</Text>
              <Text style={styles.selectorText}>
                {maintainanceData?.description}
              </Text>

              {/* Date Picker */}
              <Text style={styles.label}>NGÀY BẢO TRÌ</Text>
              <DatePicker
                value={endDate}
                mode="date"
                minDate={new Date()}
                format="DD MMMM YYYY"
                onChange={handleDatePickerChange}
                visible={isDatePickerVisible}
                onDismiss={() => setDatePickerVisible(false)}
              >
                <TouchableOpacity
                  style={styles.datePickerContainer}
                  onPress={() => setDatePickerVisible(true)}
                >
                  <Text style={styles.dateText}>
                    {endDate.toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                  <Icon name="calendar" size={20} color="#000" />
                </TouchableOpacity>
              </DatePicker>

              {/* Time Picker */}
              <Text style={styles.label}>GIỜ BẢO TRÌ</Text>
              <Picker
                data={timeData}
                cols={2}
                cascade={false}
                value={[endDate.getUTCHours(), endDate.getUTCMinutes()]}
                onChange={handleTimePickerChange}
                visible={isTimePickerVisible}
                onDismiss={() => setTimePickerVisible(false)}
                okText="Xác nhận"
                dismissText="Hủy"
              >
                <TouchableOpacity
                  style={styles.datePickerContainer}
                  onPress={() => setTimePickerVisible(true)}
                >
                  <Text style={styles.dateText}>
                    {endDate.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "UTC",
                    })}
                  </Text>
                  <Icon name="clockcircleo" size={20} color="#000" />
                </TouchableOpacity>
              </Picker>
            </View>
          )}
        </ScrollView>
        {homePond && maintainanceData && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </Provider>
  );
};

export default CalculateMaintainance;