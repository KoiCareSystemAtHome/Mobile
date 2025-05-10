import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // As specified
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#004D40", // Deep teal
    textAlign: "center",
    letterSpacing: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 10,
  },
  pickerContainer: {
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
  pickerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A",
    padding: 15,
    fontSize: 16,
    color: "#37474F",
    minHeight: 100,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: "#26A69A", // Teal
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  listContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: "#E0F2F1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listItem: {
    paddingVertical: 5,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
  },
  medicineList: {
    paddingVertical: 10,
  },
  medicineCard: {
    width: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  medicineCardSelected: {
    borderColor: "#26A69A", // Teal
  },
  medicineContent: {
    flex: 1,
  },
  medicineHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  medicineImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  medicineName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#004D40",
  },
  medicineDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "#37474F",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#26A69A", // Teal
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  noMedicinesText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    textAlign: "center",
  },
  cartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: "#E0F2F1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItem: {
    paddingVertical: 5,
  },
  cartItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
  },
  checkIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});