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
  getReminderByOwner,
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
  const prevMaintainanceDataRef = useRef(null);

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

  useEffect(() => {
    if (
      maintainanceData &&
      maintainanceData.maintainDate &&
      maintainanceData.maintainDate !== prevMaintainanceDataRef.current?.maintainDate
    ) {
      // Parse maintainDate (format: 2025-04-18 19:44:29) as is
      const date = new Date(maintainanceData.maintainDate.replace(" ", "T"));
      if (!isNaN(date.getTime())) {
        setEndDate(date);
      } else {
        console.warn("Invalid maintainDate:", maintainanceData.maintainDate);
      }
    }
    prevMaintainanceDataRef.current = maintainanceData;
  }, [maintainanceData]);

  const handleSave = () => {
    if (maintainanceData) {
      // Format seenDate to replace space with T (e.g., 0001-01-01 00:00:00 -> 0001-01-01T00:00:00)
      const formattedSeenDate = maintainanceData.seenDate
        ? maintainanceData.seenDate.replace(" ", "T")
        : maintainanceData.seenDate;

      const updatedMaintenanceData = {
        ...maintainanceData,
        maintainDate: endDate.toISOString().split(".")[0], // Format: 2025-04-18T19:44:29
        seenDate: formattedSeenDate, // Format: 0001-01-01T00:00:00
      };
      console.log(updatedMaintenanceData);
      dispatch(saveMaintainance(updatedMaintenanceData))
        .unwrap()
        .then((res) => {
          if (res.message) {
            Alert.alert(res.message);
            dispatch(getReminderByOwner(isLoggedIn?.id));
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
      newDate.setHours(hours, minutes, 0, 0);
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

  console.log("endDate:", endDate.toString());
  console.log("maintainanceData:", maintainanceData);

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Lịch Trình Bảo Trì</Text>
          <View style={{ justifyContent: "center", flexDirection: "rowConstant" }}>
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
              <Text style={styles.label}>GIỜ BẢO TRÌ</Text>
              <Picker
                data={timeData}
                cols={2}
                cascade={false}
                value={[endDate.getHours(), endDate.getMinutes()]} // Use local hours/minutes
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