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
    marginVertical: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    elevation: 5, // Adds shadow on Android
    shadowColor: "#000", // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  greenText: {
    color: "green",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  infoText: {
    color: "gray",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    width: "50%",
  },
  selectorText: {
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    width: "50%",
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  changeButton: {
    backgroundColor: "#007BFF", // Blue background
    borderRadius: 10, // Rounded corners
    paddingVertical: 12, // Vertical padding for height
    paddingHorizontal: 25, // Horizontal padding for width
    alignItems: "center", // Centers the text horizontally
    justifyContent: "center", // Centers the text vertically
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity for a subtle effect
    shadowRadius: 5, // Shadow spread for a smoother shadow
  },
  changeButtonText: {
    color: "#FFFFFF", // White text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text
    textAlign: "center", // Centers the text
  },
  modal:{
    width:"350"
  }
});
