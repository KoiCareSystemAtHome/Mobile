import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // As specified
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100, // Space for save button
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#004D40", // Deep teal
    textAlign: "center",
    marginVertical: 20,
    letterSpacing: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
    marginTop: 20,
    marginBottom: 10,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A", // Teal
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#37474F",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A",
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#26A69A", // Teal
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  saveButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#26A69A", // Teal
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100,
  },
  saveButtonDisabled: {
    backgroundColor: "#B0BEC5",
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});