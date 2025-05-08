import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { reminderByOwnerSelector } from "../../redux/selector";
import { getReminderByOwner } from "../../redux/slices/reminderSlice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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
      now.setHours(now.getHours() + 7); // Add 7 hours to shift to Vietnam time (UTC+07:00)
      console.log("Adjusted Vietnam time:", now.toISOString()); // Log the adjusted time

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

        // Check if the closest reminder has a seenDate of "0001-01-01T00:00:00"
        if (closestReminder.seenDate === "0001-01-01T00:00:00") {
          setNextReminder(closestReminder);
        } else {
          // Find the next reminder with seenDate "0001-01-01T00:00:00"
          const nextUnseenReminder = futureReminders
            .filter((reminder) => reminder.seenDate === "0001-01-01T00:00:00")
            .sort((a, b) => {
              const dateA = new Date(a.maintainDate);
              const dateB = new Date(b.maintainDate);
              return dateA.getTime() - dateB.getTime();
            })[0];
          setNextReminder(nextUnseenReminder || null);
        }
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
            color: isFinished ? "#4CAF50" : "#26A69A", // Teal for pending
            selectedDotColor: isFinished ? "#4CAF50" : "#26A69A",
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
    const date = dayjs.utc(maintainDate);
    const startTime = date.format("HH:mm");
    const endTime = date.add(2, "hour").format("HH:mm");
    return `${startTime}-${endTime}`;
  };

  const formatNextReminderDate = (maintainDate) => {
    const date = dayjs.utc(maintainDate);
    return date.format("dddd, D MMMM").toUpperCase();
  };

  console.log(reminderByOwner);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Text style={styles.headerIcon}>{leftArrowIcon}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Lịch Trình</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity disabled>
                <Text style={styles.headerIcon}></Text>
              </TouchableOpacity>
              <TouchableOpacity disabled>
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
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                filterType === "RecurringMaintenance" && styles.toggleButtonActive,
              ]}
              onPress={() => setFilterType("RecurringMaintenance")}
            >
              <Text
                style={[
                  styles.toggleText,
                  filterType === "RecurringMaintenance" && styles.toggleTextActive,
                ]}
              >
                Định Kỳ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                filterType === "Maintenance" && styles.toggleButtonActive,
              ]}
              onPress={() => setFilterType("Maintenance")}
            >
              <Text
                style={[
                  styles.toggleText,
                  filterType === "Maintenance" && styles.toggleTextActive,
                ]}
              >
                Bảo Trì
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                filterType === "Pond" && styles.toggleButtonActive,
              ]}
              onPress={() => setFilterType("Pond")}
            >
              <Text
                style={[
                  styles.toggleText,
                  filterType === "Pond" && styles.toggleTextActive,
                ]}
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
              backgroundColor: "#FFFFFF",
              calendarBackground: "#FFFFFF",
              textSectionTitleColor: "#00695C",
              dayTextColor: "#004D40",
              textDisabledColor: "#B0BEC5",
              monthTextColor: "#004D40",
              textMonthFontSize: 24,
              textMonthFontWeight: "700",
              textDayHeaderFontSize: 14,
              textDayHeaderFontWeight: "600",
              arrowColor: "#26A69A",
              todayTextColor: "#26A69A",
              selectedDayBackgroundColor: "#26A69A",
              selectedDayTextColor: "#FFFFFF",
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
              <View style={[styles.legendDot, { backgroundColor: "#26A69A" }]} />
              <Text style={styles.legendText}>Chưa Hoàn Thành</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#4CAF50" }]} />
              <Text style={styles.legendText}>Đã Hoàn Thành</Text>
            </View>
          </View>

          {/* Floating Action Button */}
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate("ReminderScreen")}
            accessibilityLabel="Add reminder"
            accessibilityRole="button"
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
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  accessibilityLabel="Close modal"
                  accessibilityRole="button"
                >
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
                            ? "#E0F2F1" // Light teal
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ScheduleScreen;