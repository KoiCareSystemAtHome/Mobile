import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { getReminderByOwner, updateReminder } from "../../../redux/slices/reminderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set Vietnamese locale
dayjs.locale("vi");

const leftArrowIcon = "←";
const dropdownIcon = "⌄";

const ReminderDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { reminder } = route.params;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStatusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    reminder.seenDate !== "0001-01-01T00:00:00" ? "Complete" : "Pending"
  );

  const isComplete = selectedStatus === "Complete";

  // Format the maintainDate using dayjs
  const date = dayjs.utc(reminder.maintainDate).tz("Asia/Ho_Chi_Minh");
  const weekday = date.format("dddd");
  // Capitalize the first letter of the weekday
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const formattedDate = `${capitalizedWeekday}, ${date.format("D MMM, YYYY, HH:mm")}`;

  const typeDotColor = isComplete
    ? "#4CAF50"
    : reminder.title.toLowerCase().includes("Pond")
    ? "#A5D6A7"
    : reminder.title.toLowerCase().includes("fish")
    ? "#FFCC80"
    : "#B0BEC5";

  const handleStatusSelect = (status) => {
    if (!isComplete) {
      setSelectedStatus(status);
      setStatusDropdownVisible(false);
      if (status === "Complete") {
        dispatch(updateReminder(reminder?.pondReminderId))
          .unwrap()
          .then((res) => {
            if (res === "success") {
              Alert.alert("Updated Successfully");
              dispatch(getReminderByOwner(isLoggedIn?.id));
            }
          });
      }
    }
  };

  const handleOutsidePress = () => {
    if (isStatusDropdownVisible) {
      setStatusDropdownVisible(false);
    }
  };

  const handleDropdownPress = () => {
    if (!isComplete) {
      setStatusDropdownVisible(!isStatusDropdownVisible);
    }
  };

  const handleAddSalt = () => {
    navigation.navigate("AddSaltForm", { pondId: reminder.pondId });
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
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerIcon}>{leftArrowIcon}</Text>
            </TouchableOpacity>
            <Text style={styles.headerDate}>
              {dayjs
                .utc(reminder.maintainDate)
                .tz("Asia/Ho_Chi_Minh")
                .format("D MMM")
                .toUpperCase()}
            </Text>
            <Text style={styles.headerTitle}>CHI TIẾT LỜI NHẮC</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{reminder.title}</Text>
            <Text style={styles.dateTime}>{formattedDate}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{reminder?.pondName}</Text>
              <View style={styles.detailValueContainer}>
                <View
                  style={[styles.typeDot, { backgroundColor: typeDotColor }]}
                />
                <TouchableOpacity
                  style={styles.detailValueContainer}
                  onPress={handleDropdownPress}
                  disabled={isComplete}
                >
                  <Text
                    style={[
                      styles.detailValue,
                      { color: isComplete ? "#4CAF50" : "#000" },
                    ]}
                  >
                    {selectedStatus === "Complete" ? "Hoàn thành" : "Đang chờ"}
                  </Text>
                  {!isComplete && (
                    <Text style={styles.dropdownIcon}>{dropdownIcon}</Text>
                  )}
                </TouchableOpacity>
                {isStatusDropdownVisible && !isComplete && (
                  <TouchableWithoutFeedback>
                    <View style={styles.dropdownContainer}>
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleStatusSelect("Pending")}
                      >
                        <Text style={styles.dropdownItemText}>Đang chờ</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleStatusSelect("Complete")}
                      >
                        <Text style={styles.dropdownItemText}>Hoàn thành</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
            </View>

            <View style={styles.description}>
              <Text style={styles.detailLabel}>MÔ TẢ</Text>
              <View style={styles.detailValueContainer}>
                <Text style={styles.detailValue}>{reminder.description}</Text>
              </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Image
                source={require("../../../assets/ed281664ff39c5251e5ffc26c325d0fc.gif")}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
              />
            </View>

            {reminder.reminderType === "Pond" && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#6A5ACD",
                  padding: 15,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
                onPress={handleAddSalt}
              >
                <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>
                  Add Salt
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ReminderDetail;