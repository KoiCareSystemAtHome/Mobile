import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
  Modal,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import {
  getReminderByOwner,
  updateReminder,
} from "../../../redux/slices/reminderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { styles } from "./styles";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set Vietnamese locale
dayjs.locale("vi");

const { width } = Dimensions.get("window");

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
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const formattedDate = `${capitalizedWeekday}, ${date.format(
    "D MMM, YYYY, HH:mm"
  )}`;

  const typeDotColor = isComplete
    ? "#4CAF50"
    : reminder.title.toLowerCase().includes("pond")
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
              Alert.alert("Cập nhật thành công");
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
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <Text style={styles.headerIcon}>←</Text>
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

            {/* Title and Date */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{reminder.title}</Text>
              <Text style={styles.dateTime}>{formattedDate}</Text>
            </View>

            {/* Details Section */}
            <View style={styles.detailsContainer}>
              {/* Status Row */}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{reminder?.pondName}</Text>
                <View style={styles.detailValueContainer}>
                  <View
                    style={[styles.typeDot, { backgroundColor: typeDotColor }]}
                  />
                  <TouchableOpacity
                    onPress={handleDropdownPress}
                    disabled={isComplete}
                    accessibilityLabel="Select status"
                    accessibilityRole="button"
                  >
                    <View style={styles.statusWrapper}>
                      <Text
                        style={[
                          styles.detailValue,
                          { color: isComplete ? "#4CAF50" : "#004D40" },
                        ]}
                      >
                        {selectedStatus === "Complete"
                          ? "Hoàn thành"
                          : "Đang chờ"}
                      </Text>
                      {!isComplete && (
                        <Text style={styles.dropdownIcon}>⌄</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Description */}
              <View style={styles.description}>
                <Text style={styles.detailLabel}>MÔ TẢ</Text>
                <Text style={styles.detailValue}>{reminder.description}</Text>
              </View>

              {/* GIF */}
              <View style={styles.gifContainer}>
                <Image
                  source={require("../../../assets/ed281664ff39c5251e5ffc26c325d0fc.gif")}
                  style={styles.gif}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Add Salt Button */}
            {reminder.reminderType === "Pond" && (
              <TouchableOpacity
                style={styles.addSaltButton}
                onPress={handleAddSalt}
                accessibilityLabel="Add salt"
                accessibilityRole="button"
              >
                <Text style={styles.addSaltButtonText}>Thêm Muối</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>

        {/* Dropdown Modal */}
        <Modal
          transparent={true}
          visible={isStatusDropdownVisible && !isComplete}
          onRequestClose={() => setStatusDropdownVisible(false)}
          animationType="fade"
        >
          <TouchableWithoutFeedback
            onPress={() => setStatusDropdownVisible(false)}
          >
            <View style={styles.modalOverlay}>
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
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ReminderDetail;
