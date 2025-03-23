import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert, // Added Alert import
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
  const [endDate, setEndDate] = useState(new Date());
  const [cycleDays, setCycleDays] = useState("30"); // Default to 30 days
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // Toggle options for cycle days
  const cycleOptions = ["30", "60", "90"];

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

  const handleSave = () => {
    if (homePond?.pondID) {
      const pondId = homePond?.pondID;
      const values = { pondId, endDate, cycleDays };
      dispatch(reccuringMaintainance(values))
        .unwrap()
        .then((res) => {
          console.log("endDate:", endDate);
          console.log("maintain date:", res );
          console.log("Recurring Maintenance Saved", res);
          if (Array.isArray(res) && res.length > 0) {
            Alert.alert("Success", "Recurring Maintenance Saved");
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
      console.log("Selected Time (UTC):", newDate.toISOString());
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
          <Text style={styles.title}>Maintenance Schedule</Text>

          {/* Pond Dropdown */}
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

          <View>

            {/* Date Picker */}
            <Text style={styles.label}>DATE END OF SCHEDULE</Text>
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
                  {endDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <Icon name="calendar" size={20} color="#000" />
              </TouchableOpacity>
            </DatePicker>

            {/* Time Picker */}
            <Text style={styles.label}>TIME END OF SCHEDULE</Text>
            <Picker
              data={timeData}
              cols={2}
              cascade={false}
              value={[endDate.getUTCHours(), endDate.getUTCMinutes()]}
              onChange={handleTimePickerChange}
              visible={isTimePickerVisible}
              onDismiss={() => setTimePickerVisible(false)}
              okText="Confirm"
              dismissText="Cancel"
            >
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setTimePickerVisible(true)}
              >
                <Text style={styles.dateText}>
                  {endDate.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                </Text>
                <Icon name="clockcircleo" size={20} color="#000" />
              </TouchableOpacity>
            </Picker>


            {/* Cycle Days Toggle */}
            <Text style={styles.label}>CYCLE DAYS</Text>
            <View style={styles.toggleContainer}>
              {cycleOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.toggleButton,
                    cycleDays === option && styles.activeToggle,
                  ]}
                  onPress={() => setCycleDays(option)}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      cycleDays === option && styles.activeText,
                    ]}
                  >
                    {option} days
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Provider>
  );
};

export default CalculateMaintainance;