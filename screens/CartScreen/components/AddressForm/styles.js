import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly more opaque for better contrast
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80, // Increased for better header spacing
    alignItems: "center", // Center content
  },
  title: {
    fontSize: 28, // Larger for prominence
    fontWeight: "700",
    color: "#1A1A1A", // Darker for contrast
    marginBottom: 32, // More space below title
    textAlign: "center",
    letterSpacing: 0.5,
  },
  dropdownContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginBottom: 16, // Consistent spacing between fields
    width: "100%", // Full width for consistency
  },
  dropdown: {
    zIndex: 3000,
    elevation: 3000,
    backgroundColor: "#FFFFFF", // White background for dropdown
    borderRadius: 12, // Rounded corners
    borderWidth: 1,
    borderColor: "#E0E0E0", // Subtle border
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#007AFF", // Vibrant blue for primary action
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});