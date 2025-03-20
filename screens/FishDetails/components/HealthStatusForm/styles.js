import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%", // Responsive width for different screen sizes
    maxHeight: "80%", // Prevent modal from taking up too much vertical space
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalCancelButton: {
    padding: 5,
  },
  modalCancelText: {
    fontSize: 16,
    color: "#ff4d4f", // Red for cancel
  },
  modalSaveButton: {
    padding: 5,
  },
  modalSaveText: {
    fontSize: 16,
    color: "#6497B1", // Blue for save
  },

  // Form styles
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  symptomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9", // Light background for each symptom row
    borderRadius: 8,
    paddingVertical: 10,
  },
  inputRow: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  removeSymptomButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // Picker and DatePicker styles
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#333",
  },

  // Button styles (for Modal footer)
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  cancelButtonText: {
    color: "#ff4d4f",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#6497B1",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  // General container styles
  container: {
    padding: 10,
  },
});