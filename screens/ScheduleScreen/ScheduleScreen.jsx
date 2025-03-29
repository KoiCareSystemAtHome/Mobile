import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { reminderByOwnerSelector } from "../../redux/selector";
import { getReminderByOwner } from "../../redux/slices/reminderSlice";

const leftArrowIcon = "←";
const rightArrowIcon = "→";
const searchIcon = "🔍";
const settingsIcon = "⚙️";
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

  // Process reminders into markedDates format and find next reminder
  useEffect(() => {
    if (reminderByOwner && reminderByOwner.length > 0) {
      const newMarkedDates = {};
      const today = new Date();

      // Set next reminder (unfiltered)
      const futureReminders = reminderByOwner.filter((reminder) => {
        const maintainDate = new Date(reminder.maintainDate);
        return maintainDate >= today;
      });

      if (futureReminders.length > 0) {
        const closestReminder = futureReminders.reduce((prev, curr) => {
          const prevDate = new Date(prev.maintainDate);
          const currDate = new Date(curr.maintainDate);
          return currDate < prevDate ? curr : prev;
        });
        setNextReminder(closestReminder);
      } else {
        setNextReminder(null);
      }

      // Filter reminders for calendar marking
      const filteredReminders = reminderByOwner.filter((reminder) =>
        reminder.reminderType === filterType
      );

      // Process marked dates
      filteredReminders.forEach((reminder) => {
        const date = reminder.maintainDate.split("T")[0];
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
      });

      setMarkedDates(newMarkedDates);
    }
  }, [reminderByOwner, filterType]);

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    if (markedDates[dateString] && markedDates[dateString].dots) {
      const date = new Date(dateString);
      const formattedDate = date
        .toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "short",
        })
        .toUpperCase();

      setSelectedDate(formattedDate);
      setSelectedDateEvents(markedDates[dateString].dots);
      setModalVisible(true);
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

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getReminderByOwner(isLoggedIn?.id));
    }
  }, [isLoggedIn?.id, dispatch]);

  const getTimeRange = (maintainDate) => {
    const date = new Date(maintainDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const startHour = hours.toString().padStart(2, "0");
    const startMinutes = minutes.toString().padStart(2, "0");
    const endHour = (hours + 2) % 24;
    const endHourStr = endHour.toString().padStart(2, "0");
    return `${startHour}:${startMinutes}-${endHourStr}:${startMinutes}`;
  };

  const getIconForEvent = (title) => {
    if (title.toLowerCase().includes("feeding")) return "🟢";
    if (title.toLowerCase().includes("maintenance")) return "🟡";
    return "⚪";
  };

  const formatNextReminderDate = (maintainDate) => {
    const date = new Date(maintainDate);
    return date
      .toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
      .toUpperCase();
  };

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
            <Text style={styles.headerIcon}>{}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>{}</Text>
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
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        margin: 10,
        width: 220,
        alignSelf: 'center',
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor: filterType === "RecurringMaintenance" ? "#6A5ACD" : "transparent",
            alignItems: 'center',
          }}
          onPress={() => setFilterType("RecurringMaintenance")}
        >
          <Text style={{
            color: filterType === "RecurringMaintenance" ? "#FFF" : "#000",
            fontWeight: "bold",
            fontSize: 12
          }}>
            Định kỳ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor: filterType === "Maintenance" ? "#6A5ACD" : "transparent",
            alignItems: 'center',
          }}
          onPress={() => setFilterType("Maintenance")}
        >
          <Text style={{
            color: filterType === "Maintenance" ? "#FFF" : "#000",
            fontWeight: "bold",
            fontSize: 12
          }}>
            Bảo trì
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
          todayTextColor: "#FFF",
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
        onPress={() => {
          navigation.navigate("ReminderScreen");
        }}
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
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleScreen;