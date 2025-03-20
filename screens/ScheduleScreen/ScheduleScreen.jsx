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
      
      reminderByOwner.forEach(reminder => {
        const date = reminder.maintainDate.split("T")[0]; // Get YYYY-MM-DD format
        const isFinished = reminder.seenDate !== "0001-01-01T00:00:00";
        
        // Initialize date object if it doesn't exist
        if (!newMarkedDates[date]) {
          newMarkedDates[date] = { dots: [] };
        }

        // Add dot based on status
        newMarkedDates[date].dots.push({
          key: reminder.pondReminderId,
          color: isFinished ? "#4CAF50" : "#FF6B6B", // Green for finished, Red for unfinished
          selectedDotColor: isFinished ? "#4CAF50" : "#FF6B6B",
          reminder: reminder // Store full reminder data for modal
        });
      });

      setMarkedDates(newMarkedDates);
    }
  }, [reminderByOwner]);

  // Handle date press
  const handleDayPress = (day) => {
    const dateString = day.dateString;
    if (markedDates[dateString] && markedDates[dateString].dots) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

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
        current={"2025-03-20"} // Updated to a more relevant date
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
          <Text style={styles.modalTitle}>{selectedDate}</Text>
          {selectedDateEvents.map((event, index) => (
            <View key={index} style={styles.modalEvent}>
              <View
                style={[styles.modalEventDot, { backgroundColor: event.color }]}
              />
              <View>
                <Text style={styles.modalEventText}>
                  {event.reminder.title}
                </Text>
                <Text style={styles.modalEventDescription}>
                  {event.reminder.description}
                </Text>
                <Text style={styles.modalEventStatus}>
                  Status: {event.reminder.seenDate === "0001-01-01T00:00:00" ? "Unfinished" : "Finished"}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleScreen;