import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  header: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  formContainer: {
    padding: 20,
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  datePickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  listItem: {
    paddingVertical: 5,
  },
  listItemText: {
    fontSize: 14,
    color: "#333",
  },
  medicineList: {
    paddingVertical: 10,
  },
  medicineCard: {
    width: 160,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor:"transparent",
  },
  medicineCardSelected: {
    borderColor: "#007AFF",
  },
  medicineContent: {
    flex: 1,
    position: "relative",
  },
  medicineImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  medicineDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  noMedicinesText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  cartContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  cartItem: {
    paddingVertical: 5,
  },
  cartItemText: {
    fontSize: 14,
    color: "#333",
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
