import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // As specified
  },
  scrollContainer: {
    paddingHorizontal: 0,
    paddingTop: 50,
    paddingBottom: 100, // Space for submit button
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#004D40", // Deep teal
    textAlign: "center",
    marginVertical: 20,
    letterSpacing: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#26A69A", // Teal
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
  toggleButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A", // Teal
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestedAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  suggestedButton: {
    backgroundColor: "#E0F2F1", // Light teal
    borderWidth: 2,
    borderColor: "#26A69A",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestedButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#004D40",
    textAlign: "center",
  },
  submitButton: {
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
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  webview: {
    flex: 1,
  },
});