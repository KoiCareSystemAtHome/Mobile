import { StyleSheet } from "react-native";

// Styles (update your styles.js file)
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 20,
    },
    headerIcon: {
      fontSize: 24,
      color: "#FF6B6B", // Red color for the back arrow
      marginRight: 15,
    },
    headerDate: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
      marginRight: 10,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    titleContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000",
      marginBottom: 5,
    },
    dateTime: {
      fontSize: 16,
      color: "#666",
    },
    detailsContainer: {
      marginTop: 10,
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    description: {
      alignItems: "flex-start", // Align items to the top for description
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    detailLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#666",
    },
    detailValueContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    typeDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 10,
    },
    detailValue: {
      fontSize: 16,
      color: "#000",
    },
    dropdownIcon: {
      fontSize: 16,
      color: "#666",
      marginLeft: 10,
    },
    dropdownContainer: {
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 5,
      marginTop: 5,
      position: "absolute",
      right: 0,
      bottom: 60, 
      width: 120, 
      zIndex: 1, 
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    dropdownItemText: {
      fontSize: 16,
      color: "#000",
    },
  });