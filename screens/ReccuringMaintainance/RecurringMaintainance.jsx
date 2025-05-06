import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
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
  reccuringMaintainance,
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
  const [endDate, setEndDate] = useState(() => {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 2);
    return minDate;
  });
  const [cycleDays, setCycleDays] = useState("30");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const cycleOptions = ["30", "60", "90"];
  const isMounted = useRef(true);

  const getMinDate = () => {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 2);
    return minDate;
  };

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

  const handleSave = () => {
    if (homePond?.pondID) {
      const pondId = homePond?.pondID;
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(adjustedEndDate.getHours() + 7);
      const formattedEndDate = adjustedEndDate.toISOString().split(".")[0];
      const values = { pondId, endDate: formattedEndDate, cycleDays };
      dispatch(reccuringMaintainance(values))
        .unwrap()
        .then((res) => {
          dispatch(getReminderByOwner(isLoggedIn?.id));
          if (Array.isArray(res) && res.length > 0) {
            Alert.alert("Thành công", "Lịch Định Kỳ Được Lưu Thành Công");
          }
        })
        .catch((error) => {
          console.error("Error saving maintenance:", error);
          Alert.alert("Thất Bại", "Lưu lịch không thành công");
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

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Lịch Trình Định Kỳ</Text>

          <Text style={styles.label}>CHỌN AO</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setHomePondOpen(!homePondOpen)}
            accessibilityLabel="Select a pond"
            accessibilityRole="button"
          >
            <Text style={styles.selectorText}>
              {homePond ? homePond?.name : "Chọn một ao"}
            </Text>
            <Icon name="down" size={16} color="#004D40" />
          </TouchableOpacity>
          {homePondOpen && (
            <View style={styles.dropdown}>
              {pondData?.map((item) => (
                <TouchableOpacity
                  key={item?.pondID}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setHomePond(item);
                    setHomePondOpen(false);
                  }}
                  accessibilityLabel={`Select pond ${item?.name}`}
                  accessibilityRole="button"
                >
                  <Text style={styles.dropdownItemText}>{item?.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>NGÀY KẾT THÚC LỊCH TRÌNH</Text>
          <DatePicker
            value={endDate}
            mode="date"
            minDate={getMinDate()}
            format="DD MMMM YYYY"
            onChange={handleDatePickerChange}
            visible={isDatePickerVisible}
            onDismiss={() => setDatePickerVisible(false)}
          >
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setDatePickerVisible(true)}
              accessibilityLabel="Select end date"
              accessibilityRole="button"
            >
              <Text style={styles.pickerText}>
                {endDate.toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </Text>
              <Icon name="calendar" size={20} color="#004D40" />
            </TouchableOpacity>
          </DatePicker>

          <Text style={styles.label}>GIỜ BẢO TRÌ</Text>
          <Picker
            data={timeData}
            cols={2}
            cascade={false}
            value={[endDate.getHours(), endDate.getMinutes()]}
            onChange={handleTimePickerChange}
            visible={isTimePickerVisible}
            onDismiss={() => setTimePickerVisible(false)}
            okText="Xác nhận"
            dismissText="Hủy"
          >
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setTimePickerVisible(true)}
              accessibilityLabel="Select maintenance time"
              accessibilityRole="button"
            >
              <Text style={styles.pickerText}>
                {endDate.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </Text>
              <Icon name="clockcircleo" size={20} color="#004D40" />
            </TouchableOpacity>
          </Picker>

          <Text style={styles.label}>NGÀY CHU KỲ</Text>
          <View style={styles.toggleContainer}>
            {cycleOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.toggleButton,
                  cycleDays === option && styles.activeToggle,
                ]}
                onPress={() => setCycleDays(option)}
                accessibilityLabel={`Select ${option} day cycle`}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.toggleText,
                    cycleDays === option && styles.activeText,
                  ]}
                >
                  {option} ngày
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.saveButton, !homePond && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!homePond}
          accessibilityLabel="Save maintenance schedule"
          accessibilityRole="button"
        >
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Provider>
  );
};

export default CalculateMaintainance;