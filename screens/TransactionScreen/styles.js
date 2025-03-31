import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      marginTop:50
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
    },
    logoutText: {
      fontSize: 16,
      color: "#333",
      fontWeight: "500",
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "#007AFF", // Blue underline for active tab
    },
    tabText: {
      fontSize: 16,
      color: "#666",
      fontWeight: "500",
    },
    activeTabText: {
      color: "#007AFF", // Blue text for active tab
      fontWeight: "bold",
    },
    listContainer: {
      paddingBottom: 20,
    },
    transactionCard: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      elevation: 3, // For Android shadow
      shadowColor: "#000", // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    orderNumber: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 5,
    },
    orderDetails: {
      fontSize: 14,
      color: "#666",
      marginBottom: 5,
    },
    orderTotal: {
      fontSize: 14,
      color: "#FF0000", // Red color for total
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    reviewButton: {
      backgroundColor: "#E6F4EA", // Light green background
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    buyAgainButton: {
      backgroundColor: "#E6F4EA", // Light green background
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    buttonText: {
      fontSize: 14,
      color: "#333",
      fontWeight: "500",
    },
    paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  paginationButton: {
    backgroundColor: "transparent", // You might want to adjust this color
    borderRadius: 8,
    paddingVertical: 10,
    width: 70,
    fontWeight: "bold",
  },
  paginationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "transparent",
    opacity: 0.3,
  },
  pageText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  });
