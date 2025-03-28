import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image, // Added Image import
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { getReminderByOwner, updateReminder } from "../../../redux/slices/reminderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const date = new Date(reminder.maintainDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const startHour = date.getHours().toString().padStart(2, "0");
  const startMinutes = date.getMinutes().toString().padStart(2, "0");
  const endHour = ((date.getHours() + 2) % 24).toString().padStart(2, "0");
  const timeRange = `${startHour}:${startMinutes} - ${endHour}:${startMinutes}`;

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
              {date
                .toLocaleDateString("vi-VN", { day: "numeric", month: "short" })
                .toUpperCase()}
            </Text>
            <Text style={styles.headerTitle}>CHI TIẾT LỜI NHẮC</Text>
          </View>
  
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{reminder.title}</Text>
            <Text style={styles.dateTime}>
              {formattedDate}, {timeRange}
            </Text>
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
                      { color: isComplete ? "#4CAF50" : "#000" }
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
  
            {/* GIF added here */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image
                source={require('../../../assets/ed281664ff39c5251e5ffc26c325d0fc.gif')}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ReminderDetail;