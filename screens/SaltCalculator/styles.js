import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // As specified
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100, // Space for fixed button
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#004D40", // Deep teal
    textAlign: "center",
    marginVertical: 20,
    letterSpacing: 1,
  },
  selectorWrapper: {
    zIndex: 2000, // Above all elements
    alignItems: "center",
    marginBottom: 20,
  },
  selector: {
    width: "80%",
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A", // Teal
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  selectorInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
  },
  dropdown: {
    backgroundColor: "#E0F2F1",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A",
    marginTop: 5,
    width: "80%",
    maxHeight: 1000, // Enable scrolling
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2000,
  },
  dropdownItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F2F1",
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
  },
  noPondText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#37474F",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26A69A",
  },
  slider: {
    marginTop: 10,
    height: 40,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E0F2F1",
    borderRadius: 12,
    padding: 8,
    marginTop: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#26A69A", // Teal
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#004D40",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  saltBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F2F1",
    paddingBottom: 5,
  },
  saltItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  saltIcon: {
    marginRight: 10,
  },
  saltText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#37474F",
    flex: 1,
  },
  saltLabel: {
    fontWeight: "500",
  },
  saltValue: {
    fontWeight: "700",
    color: "#26A69A",
  },
  instructionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#37474F",
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    borderWidth: 2,
    borderColor: "#26A69A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#004D40",
    textAlign: "center",
    marginBottom: 15,
  },
  reminderList: {
    maxHeight: 300,
    marginBottom: 15,
  },
  reminderItem: {
    backgroundColor: "#E0F2F1",
    borderRadius: 12,
    padding: 12,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
  },
  reminderDate: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    marginTop: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    borderColor: "#26A69A",
    borderWidth: 2,
  },
  saveButton: {
    backgroundColor: "#26A69A",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#26A69A", // Teal
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#B0BEC5",
    opacity: 0.6,
  },
});