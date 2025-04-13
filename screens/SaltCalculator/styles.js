import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  container: {
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
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-center",
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
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  slider: {
    marginTop: 10,
  },
  saltBox: {
    backgroundColor: "#fff", // Changed from #222 to white for better readability
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  saltText: {
    fontSize: 16,
    color: "#333", // Changed from white to dark gray for contrast on white background
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  activeToggle: {
    backgroundColor: "#FFA500",
  },
  toggleText: {
    fontSize: 12,
    color: "#fff",
  },
  activeText: {
    fontWeight: "bold",
    color: "#000",
  },
  instructionLabel: {
    fontSize: 16,
    color: "#333", // Changed from white to dark gray for contrast
    fontWeight: "bold",
  },
  instructionItem: {
    fontSize: 14,
    color: "#444", // Adjusted for better readability
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButtonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  saveReminderButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
  },
  saveReminderText: {
    color: "#fff",
    fontSize: 16,
  },
  reminderItem: {
    marginVertical: 5,
  },
  reminderText: {
    fontSize: 16,
    color: "#333", // Adjusted for contrast
  },
  reminderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  // New styles for the updated design
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 5,
  },
  saltItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  saltIcon: {
    marginRight: 10,
  },
  saltLabel: {
    fontWeight: "500",
  },
  saltValue: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  instructionContainer: {
    marginTop: 5,
  },
  instructionText: {
    fontSize: 15,
    color: "#444",
    marginVertical: 3,
    lineHeight: 22,
  },
});
