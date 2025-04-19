import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { reminderByOwnerSelector } from "../../redux/selector";
import { getReminderByOwner } from "../../redux/slices/reminderSlice";
import dayjs from "dayjs"; // Import dayjs
import utc from "dayjs/plugin/utc"; // Import UTC plugin

// Enable UTC plugin
dayjs.extend(utc);

const leftArrowIcon = "←";
const rightArrowIcon = "→";
const addIcon = "+";

const ScheduleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const reminderByOwner = useSelector(reminderByOwnerSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [nextReminder, setNextReminder] = useState(null);
  const [filterType, setFilterType] = useState("RecurringMaintenance");

  // Fetch user data and refresh reminders
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        const user = value ? JSON.parse(value) : null;
        setIsLoggedIn(user);
        if (user?.id) {
          dispatch(getReminderByOwner(user.id));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [dispatch]);

  // Process reminders for calendar and next reminder
  useEffect(() => {
    if (reminderByOwner && reminderByOwner.length > 0) {
      const newMarkedDates = {};
      const now = new Date();

      const futureReminders = reminderByOwner.filter((reminder) => {
        try {
          const maintainDate = new Date(reminder.maintainDate);
          if (isNaN(maintainDate.getTime())) {
            console.warn("Invalid maintainDate:", reminder.maintainDate);
            return false;
          }
          return maintainDate.getTime() > now.getTime();
        } catch (error) {
          console.warn("Error parsing maintainDate:", reminder.maintainDate, error);
          return false;
        }
      });

      if (futureReminders.length > 0) {
        const closestReminder = futureReminders.reduce((prev, curr) => {
          const prevDate = new Date(prev.maintainDate);
          const currDate = new Date(curr.maintainDate);
          return currDate.getTime() < prevDate.getTime() ? curr : prev;
        });
        setNextReminder(closestReminder);
      } else {
        setNextReminder(null);
      }

      const filteredReminders = reminderByOwner.filter(
        (reminder) => reminder.reminderType === filterType
      );

      filteredReminders.forEach((reminder) => {
        try {
          const maintainDate = new Date(reminder.maintainDate);
          const date = maintainDate.toISOString().split("T")[0];
          const isFinished = reminder.seenDate !== "0001-01-01T00:00:00";

          if (!newMarkedDates[date]) {
            newMarkedDates[date] = { dots: [] };
          }

          newMarkedDates[date].dots.push({
            key: reminder.pondReminderId,
            color: isFinished ? "#4CAF50" : "#FF6B6B",
            selectedDotColor: isFinished ? "#4CAF50" : "#FF6B6B",
            reminder: reminder,
          });
        } catch (error) {
          console.warn("Error processing reminder:", reminder, error);
        }
      });

      setMarkedDates(newMarkedDates);
    } else {
      setNextReminder(null);
      setMarkedDates({});
    }
  }, [reminderByOwner, filterType]);

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    if (markedDates[dateString] && markedDates[dateString].dots) {
      setSelectedDate(dateString);
      setSelectedDateEvents(markedDates[dateString].dots);
      setModalVisible(true);
    }
  };

  const getTimeRange = (maintainDate) => {
    // Parse maintainDate as UTC
    const date = dayjs.utc(maintainDate);
    // Format start time in UTC
    const startTime = date.format("HH:mm");
    // Calculate end time (+2 hours)
    const endTime = date.add(2, "hour").format("HH:mm");
    return `${startTime}-${endTime}`;
  };

  const formatNextReminderDate = (maintainDate) => {
    // Parse maintainDate as UTC
    const date = dayjs.utc(maintainDate);
    // Format date in UTC
    return date
      .format("dddd, D MMMM")
      .toUpperCase();
  };

console.log(reminderByOwner)
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>{leftArrowIcon}</Text>
        </TouchableOpacity>
        <Text style={styles.headerIcon}>Lịch trình</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.headerIcon}></Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}></Text>
          </TouchableOpacity>
        </View>
      </View>

      {nextReminder && (
        <View style={styles.nextReminderContainer}>
          <Text style={styles.nextReminderTitle}>LỜI NHẮC TIẾP THEO</Text>
          <View style={styles.nextReminderDetails}>
            <Text style={styles.nextReminderDate}>
              {formatNextReminderDate(nextReminder.maintainDate)} lúc{" "}
              {getTimeRange(nextReminder.maintainDate).split("-")[0]}
            </Text>
            <Text style={styles.nextReminderText}>{nextReminder.title}</Text>
            <Text style={styles.nextReminderDescription}>
              {nextReminder.description}
            </Text>
          </View>
        </View>
      )}

      {/* Toggle Switch */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E0E0E0",
          borderRadius: 20,
          margin: 10,
          width: 330,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor:
              filterType === "RecurringMaintenance" ? "#6A5ACD" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setFilterType("RecurringMaintenance")}
        >
          <Text
            style={{
              color: filterType === "RecurringMaintenance" ? "#FFF" : "#000",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Định kỳ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor:
              filterType === "Maintenance" ? "#6A5ACD" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setFilterType("Maintenance")}
        >
          <Text
            style={{
              color: filterType === "Maintenance" ? "#FFF" : "#000",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Bảo trì
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor: filterType === "Pond" ? "#6A5ACD" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setFilterType("Pond")}
        >
          <Text
            style={{
              color: filterType === "Pond" ? "#FFF" : "#000",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Muối
          </Text>
        </TouchableOpacity>
      </View>

      <Calendar
        current={new Date().toISOString().split("T")[0]}
        markedDates={markedDates}
        markingType={"multi-dot"}
        theme={{
          backgroundColor: "#FFF",
          calendarBackground: "#FFF",
          textSectionTitleColor: "#666",
          dayTextColor: "#000",
          textDisabledColor: "#D9E1E8",
          monthTextColor: "#000",
          textMonthFontSize: 24,
          textMonthFontWeight: "bold",
          textDayHeaderFontSize: 14,
          textDayHeaderFontWeight: "bold",
          arrowColor: "#000",
          todayTextColor: "#ddd",
          selectedDayBackgroundColor: "#6A5ACD",
        }}
        onDayPress={handleDayPress}
        renderArrow={(direction) => (
          <Text style={styles.arrow}>
            {direction === "left" ? leftArrowIcon : rightArrowIcon}
          </Text>
        )}
        style={styles.calendar}
      />

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#FF6B6B" }]} />
          <Text style={styles.legendText}>Chưa hoàn thành</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#4CAF50" }]} />
          <Text style={styles.legendText}>Đã hoàn thành</Text>
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("ReminderScreen")}
      >
        <Text style={styles.fabText}>{addIcon}</Text>
      </TouchableOpacity>

      {/* Modal for Event Details */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalHeaderIcon}>{leftArrowIcon}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>XEM LỜI NHẮC</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalDate}>{selectedDate}</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {selectedDateEvents.map((event, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.modalEvent,
                    {
                      backgroundColor: event.reminder.title
                        .toLowerCase()
                        .includes("feeding")
                        ? "#E6F4EA"
                        : event.reminder.title
                            .toLowerCase()
                            .includes("maintenance")
                        ? "#FFF3E0"
                        : event.reminder.reminderType === "Pond"
                        ? "#E0F7FA"
                        : "#E0E0E0",
                    },
                  ]}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("ReminderDetail", {
                      reminder: event.reminder,
                    });
                  }}
                >
                  <Text style={styles.modalEventTime}>
                    {getTimeRange(event.reminder.maintainDate).split("-")[0]}
                  </Text>
                  <Text style={styles.modalEventText}>
                    {event.reminder.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleScreen;