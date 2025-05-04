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
  },
  listContent: {
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
    fontFamily: "System",
  },
  dropdownWrapper: {
    zIndex: 2000, // Above all elements
    marginBottom: 20, // Base margin to prevent clipping
  },
  dropdown: {
    borderColor: "#26A69A", // Vibrant teal
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#E0F2F1", // Light teal
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownContainer: {
    zIndex: 2000, // Above all elements
    borderColor: "#26A69A",
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#E0F2F1",
    marginTop: 5,
    maxHeight: 200, // Enable scrolling for long lists
  },
  symptomCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1, // Below button
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 12,
  },
  symptomList: {
    maxHeight: 150, // Match SymptomScreen
  },
  symptomItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F2F1",
  },
  symptomText: {
    fontSize: 16,
    color: "#37474F", // Darker gray
    lineHeight: 22,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#26A69A", // Match SymptomScreen’s button
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100, // Above cards, below dropdown
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});