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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80, // Space for the save button
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Changed to match the image
    marginTop: 20,
    marginBottom: 10,
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
  // New Styles for Date Picker, Cycle Days Input, and Save Button
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 16,
    color: "#000",
    paddingVertical: 5,
  },
  saveButton: {
    position: "absolute",
    bottom: 80, // Adjusted to account for bottom navigation
    alignSelf: "center",
    backgroundColor: "#4A90E2", // Blue color from the image
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});