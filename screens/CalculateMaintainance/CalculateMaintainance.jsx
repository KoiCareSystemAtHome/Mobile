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
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const CalculateMaintainance = () => {
  const dispatch = useDispatch();
  const pondData = useSelector(pondByOwnerSelector);
  const maintainanceData = useSelector(calculatedMaintainanceSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [endDate, setEndDate] = useState(dayjs.utc().toDate());
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
      const date = dayjs.utc(maintainanceData.maintainDate);
      if (date.isValid()) {
        setEndDate(date.toDate());
      } else {
        console.warn("Invalid maintainDate:", maintainanceData.maintainDate);
      }
    }
    prevMaintainanceDataRef.current = maintainanceData;
  }, [maintainanceData]);

  const handleSave = () => {
    if (maintainanceData) {
      const formattedSeenDate = maintainanceData.seenDate
        ? maintainanceData.seenDate.replace(" ", "-all")
        : maintainanceData.seenDate;

      const updatedMaintenanceData = {
        ...maintainanceData,
        maintainDate: dayjs.utc(endDate).format("YYYY-MM-DDTHH:mm:ss"),
        seenDate: formattedSeenDate,
      };
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
          Alert.alert("Thất Bại", "Lưu không thành công.");
        });
    }
  };

  const handleDatePickerChange = (date) => {
    if (isMounted.current) {
      const selectedDate = dayjs(date).local();
      const newDate = dayjs.utc(endDate);
      const updatedDate = newDate
        .set("year", selectedDate.year())
        .set("month", selectedDate.month())
        .set("date", selectedDate.date());
      setEndDate(updatedDate.toDate());
      setDatePickerVisible(false);
    }
  };

  const handleTimePickerChange = (time) => {
    if (isMounted.current) {
      const [hours, minutes] = time;
      const newDate = dayjs
        .utc(endDate)
        .set("hour", hours)
        .set("minute", minutes)
        .set("second", 0);
      setEndDate(newDate.toDate());
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
          <Text style={styles.title}>Lịch Trình Bảo Trì</Text>
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

          {homePond && maintainanceData && (
            <View style={styles.maintenanceCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{maintainanceData?.title}</Text>
              </View>
              <Text style={styles.cardDescription}>
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
                  style={styles.pickerContainer}
                  onPress={() => setDatePickerVisible(true)}
                  accessibilityLabel="Select maintenance date"
                  accessibilityRole="button"
                >
                  <Text style={styles.pickerText}>
                    {dayjs.utc(endDate).format("DD MMMM YYYY")}
                  </Text>
                  <Icon name="calendar" size={20} color="#004D40" />
                </TouchableOpacity>
              </DatePicker>
              <Text style={styles.label}>GIỜ BẢO TRÌ</Text>
              <Picker
                data={timeData}
                cols={2}
                cascade={false}
                value={[dayjs.utc(endDate).hour(), dayjs.utc(endDate).minute()]}
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
                    {dayjs.utc(endDate).format("HH:mm")}
                  </Text>
                  <Icon name="clockcircleo" size={20} color="#004D40" />
                </TouchableOpacity>
              </Picker>
            </View>
          )}
        </ScrollView>
        {homePond && maintainanceData && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            accessibilityLabel="Save maintenance schedule"
            accessibilityRole="button"
          >
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </Provider>
  );
};

export default CalculateMaintainance;