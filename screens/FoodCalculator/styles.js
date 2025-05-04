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
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginTop: 20,
    marginBottom: 10,
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
  dropdownItem: {
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
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E0F2F1",
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
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
    fontSize: 12,
    fontWeight: "600",
    color: "#004D40",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  fishInfoContainer: {
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
  fishInfoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 12,
  },
  fishInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fishInfoItem: {
    fontSize: 16,
    fontWeight: "500",
    color: "#37474F", // Darker gray
    marginBottom: 8,
  },
  fishInfoItemBold: {
    fontWeight: "700",
    color: "#004D40",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    textAlign: "justify",
    marginVertical: 15,
    lineHeight: 20,
  },
  recommendationContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
  },
  suggestButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#26A69A", // Teal
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100,
  },
  suggestButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
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
});