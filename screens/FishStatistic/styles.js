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
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 20,
    },
    listContent: {
      paddingBottom: 100,
    },
    card: {
      marginBottom: 20,
      borderRadius: 10,
      overflow: "hidden",
      height: 300,
    },
    cardContent: {
      // padding: 10,
    },
    fishImage: {
      width: "100%",
      height: 130,
      borderRadius: 10,
    },
    fishInfo: {
      marginLeft: 10,
    },
    fishText: {
      marginTop: 16,
      fontSize: 16,
      // marginBottom: 15,
    },
    label: {
      fontWeight: "bold",
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
    },
    badge: {
    backgroundColor: "#FFD29D",
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
    badge: {
      backgroundColor: "#FFD29D",
      width: 50,
      height: 50,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "white",
    },
    badgeText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
    addButton: {
      backgroundColor: "#FFD29D",
      width: 50,
      height: 50,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: "#fff",
      width: "90%",
      borderRadius: 10,
      padding: 10,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      marginTop:20
    },
    modalCancelButton: {
      padding: 10,
    },
    modalCancelText: {
      color: "#ff4d4f",
      fontWeight: "bold",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    modalSaveButton: {
      padding: 10,
      borderColor:"white"
    },
    modalSaveText: {
      color: "#4caf50",
      fontWeight: "bold",
    },
    imageButton: {
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      alignItems: "center",
    },
    imageButtonText: {
      color: "#6497B1",
      fontSize: 16,
    },
    modalFields: {
      width: "100%",
      marginVertical: 10,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    inputRow: {
      flex: 1,
      marginHorizontal: 5, // Add spacing between columns
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
      borderRadius: 30,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      paddingLeft:5,
      height: 40,
      borderRadius: 10,
    },
    modalFooter:{
      flexDirection: "row",
      justifyContent:"space-between"
    },
    twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageContainer: {
    alignItems: "center",
  },

  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  changeImageButton: {
    backgroundColor: "#16a085",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },

  changeImageText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  });