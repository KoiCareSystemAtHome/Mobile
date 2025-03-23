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
      paddingTop: 60,
    },
    headerNav: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    header: {
      marginBottom: 20,
      alignItems: "flex-end",
    },
    userText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
    },
depositCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  depositGradient: {
    padding: 15,
  },
  depositHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  depositText: {
    fontSize: 24,
    color: "#fff",
  },
  amount: {
    fontWeight: "bold",
  },
  depositLink: {
    color: "#fff",
    fontSize: 18,
  },
    cardDescription: {
      color: "#fff",
      fontSize: 14,
      padding: 10,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      marginTop: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
    },
    badge: {
      marginLeft: 10,
      backgroundColor: "#ff4d4f",
    },
    buttonGroup: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#B4FBE2",
      width: "48%",
      marginBottom: 15,
      borderWidth: 0,
      color: "black",
      height: 60,
      borderRadius: 20,
    },
    pondButton: {
      backgroundColor: "#7EABC5",
      width: "48%",
      marginBottom: 15,
      borderWidth: 0,
      height: 60,
      borderRadius: 20,
      overflow: "hidden",
    },
    drawer: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 250,
      backgroundColor: "#A7C4B6",
      paddingHorizontal: 20,
      paddingVertical: 30,
      zIndex: 1,
    },
    drawerHeader: {
      alignItems: "center",
      marginBottom: 20,
    },
    backArrow: {
      alignSelf: "flex-start",
      marginBottom: 20,
    },
    drawerProfile: {
      marginTop: 10,
    },
    drawerUserName: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
    },
    drawerUserRole: {
      fontSize: 14,
      color: "#555",
    },
    divider: {
      height: 1,
      backgroundColor: "#ccc",
      marginVertical: 20,
    },
    drawerItemImage: {
    width: 20,    // Adjust the width as needed
    height: 20,   // Adjust the height as needed
  },
    drawerItems: {
      marginTop: 20,
    },
    drawerItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
    },
    drawerItemText: {
      marginLeft: 15,
      fontSize: 16,
      color: "#000",
    },
    tooltipOption:{
      width:80,
      fontSize:16,
    },
    tooltipText:{
      fontSize:20
    }
  });