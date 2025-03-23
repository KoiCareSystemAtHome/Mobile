import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

const leftArrowIcon = "←";
const dropdownIcon = "⌄";

const ReminderDetail = ({ navigation, route }) => {
  // Extract reminder data from navigation params
  const { reminder } = route.params;

  // State for dropdown visibility and selected status
  const [isStatusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    reminder.seenDate !== "0001-01-01T00:00:00" ? "Done" : "Pending"
  );

  // Format the date and time
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

  // Determine type dot color
  const typeDotColor = reminder.title.toLowerCase().includes("Pond")
    ? "#A5D6A7" // Light green for Feeding
    : reminder.title.toLowerCase().includes("fish")
    ? "#FFCC80" // Light orange for Maintenance
    : "#B0BEC5"; // Light gray for Notes

  console.log(reminder);

  // Handle status selection
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setStatusDropdownVisible(false);

    // Update the reminder's seenDate based on the selected status
    // For "Pending", set seenDate to "0001-01-01T00:00:00"
    // For "Complete", set seenDate to the current date
    const updatedSeenDate =
      status === "Pending" ? "0001-01-01T00:00:00" : new Date().toISOString();

    // Here, you should dispatch an action or make an API call to update the reminder
    // For now, we'll just log the updated value
    console.log("Updated seenDate:", updatedSeenDate);
    // Example: dispatch(updateReminder({ ...reminder, seenDate: updatedSeenDate }));
  };

  // Close dropdown when pressing outside
  const handleOutsidePress = () => {
    if (isStatusDropdownVisible) {
      setStatusDropdownVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerIcon}>{leftArrowIcon}</Text>
            </TouchableOpacity>
            <Text style={styles.headerDate}>
              {date
                .toLocaleDateString("en-US", { day: "numeric", month: "short" })
                .toUpperCase()}
            </Text>
            <Text style={styles.headerTitle}>REMINDER DETAIL</Text>
          </View>

          {/* Reminder Title and Date/Time */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{reminder.title}</Text>
            <Text style={styles.dateTime}>
              {formattedDate}, {timeRange}
            </Text>
          </View>

          {/* Reminder Details */}
          <View style={styles.detailsContainer}>
            {/* Type */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>TYPE</Text>
              <View style={styles.detailValueContainer}>
                <View style={[styles.typeDot, { backgroundColor: typeDotColor }]} />
                <Text style={styles.detailValue}>{reminder?.reminderType}</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.description}>
              <Text style={styles.detailLabel}>DESCRIPTION</Text>
              <View style={styles.detailValueContainer}>
                <Text style={styles.detailValue}>{reminder.description}</Text>
              </View>
            </View>

            {/* Status with Dropdown */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>STATUS</Text>
              <TouchableOpacity
                style={styles.detailValueContainer}
                onPress={() => setStatusDropdownVisible(!isStatusDropdownVisible)}
              >
                <Text style={styles.detailValue}>{selectedStatus}</Text>
                <Text style={styles.dropdownIcon}>{dropdownIcon}</Text>

              </TouchableOpacity>
            </View>

            {/* Status Dropdown */}
            {isStatusDropdownVisible && (
              <TouchableWithoutFeedback>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleStatusSelect("Pending")}
                  >
                    <Text style={styles.dropdownItemText}>Pending</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleStatusSelect("Complete")}
                  >
                    <Text style={styles.dropdownItemText}>Complete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};



export default ReminderDetail;