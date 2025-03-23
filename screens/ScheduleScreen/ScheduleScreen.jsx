import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPondByOwner } from "../../redux/slices/pondSlice";
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

  // Process reminders into markedDates format
  useEffect(() => {
    if (reminderByOwner && reminderByOwner.length > 0) {
      const newMarkedDates = {};

      reminderByOwner.forEach((reminder) => {
        const date = reminder.maintainDate.split("T")[0]; // Get YYYY-MM-DD format
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
  }, [reminderByOwner]);


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
        .toUpperCase(); // Format like "WEDNESDAY, 1 JAN"

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
    const endHour = (hours + 2) % 24; // Assuming a 2-hour duration for simplicity
    const endHourStr = endHour.toString().padStart(2, "0");
    return `${startHour}:${startMinutes}-${endHourStr}:${startMinutes}`;
  };

  // Helper function to determine icon based on title
  const getIconForEvent = (title) => {
    if (title.toLowerCase().includes("feeding")) return "🟢"; // Green circle for Feeding
    if (title.toLowerCase().includes("maintenance")) return "🟡"; // Yellow circle for Maintenance
    return "⚪"; // White circle for Notes or others
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>{leftArrowIcon}</Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>{searchIcon}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>{settingsIcon}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar */}
      <Calendar
        current={"2025-03-20"}
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
          <Text style={styles.legendText}>Unfinished</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#4CAF50" }]} />
          <Text style={styles.legendText}>Finished</Text>
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          console.log("Add new reminder");
        }}
      >
        <Text style={styles.fabText}>{addIcon}</Text>
      </TouchableOpacity>

      {/* Today Label */}
      <View style={styles.todayLabel}>
        <Text style={styles.todayLabelText}>Today</Text>
      </View>

      {/* Modal for Event Details */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalHeaderIcon}>{leftArrowIcon}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>VIEW REMINDER</Text>
          </View>

          {/* Modal Body */}
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
                      ? "#E6F4EA" // Light green for Feeding
                      : event.reminder.title
                          .toLowerCase()
                          .includes("maintenance")
                      ? "#FFF3E0" // Light orange for Maintenance
                      : "#E0E0E0", // Light gray for Notes
                  },
                ]}
                onPress={() => {
                  setModalVisible(false); // Close the modal
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
