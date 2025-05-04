import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 50, 80, 0.4)", // Darker aquatic overlay
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Space for FAB
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#004D40", // Deep teal
    textAlign: "center",
    marginVertical: 20,
  },
  selectorContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  selector: {
    width: "60%",
  },
  selectorInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A", // Teal
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A",
    marginTop: 8,
    padding: 10,
    width: "60%",
    maxHeight: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#004D40",
  },
  dropdownEmpty: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    textAlign: "center",
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#004D40",
    textAlign: "center",
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    textAlign: "center",
    marginBottom: 12,
  },
  scrollView: {
    maxHeight: 150,
    marginVertical: 8,
  },
  parameterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  parameterText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#00695C", // Lighter teal
    flex: 1,
  },
  parameterValue: {
    fontWeight: "700",
    color: "#004D40",
  },
  infoText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#37474F",
    textAlign: "center",
    marginTop: 8,
  },
  addParamsFab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#26A69A", // Teal
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100,
  },
 modal: {
    width: "350",
  },
  paramRow: {
    flexDirection: "row",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  modalTitle: {
    fontSize: 20,
  },
  paramContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  paramName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  rangeContainer: {
    marginBottom: 10,
  },
  warningText: {
    fontSize: 14,
    color: "#FFA500",
    marginBottom: 2,
  },
  dangerText: {
    fontSize: 14,
    color: "#FF0000",
    marginBottom: 2,
  },
});