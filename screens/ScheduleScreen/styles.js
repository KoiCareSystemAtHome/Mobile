import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Match previous screens
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  headerIcon: {
    fontSize: 28,
    color: "#26A69A", // Teal
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#004D40", // Deep teal
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  nextReminderContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  nextReminderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00695C", // Lighter teal
    marginBottom: 10,
  },
  nextReminderDetails: {
    paddingLeft: 10,
  },
  nextReminderDate: {
    fontSize: 16,
    fontWeight: "700",
    color: "#004D40",
    marginBottom: 5,
  },
  nextReminderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 5,
  },
  nextReminderDescription: {
    fontSize: 14,
    color: "#37474F", // Darker gray
    lineHeight: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 12,
    marginVertical: 10,
    padding: 4,
    alignSelf: "center",
    width: "90%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#26A69A", // Teal
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#004D40",
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },
  calendar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginVertical: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  arrow: {
    fontSize: 24,
    color: "#26A69A",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#004D40",
  },
  fab: {
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
  fabText: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "50%",
    borderWidth: 2,
    borderColor: "#26A69A",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderIcon: {
    fontSize: 28,
    color: "#26A69A",
    marginRight: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#004D40",
  },
  modalBody: {
    flex: 1,
  },
  modalDate: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 15,
  },
  modalEvent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalEventTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#004D40",
    marginRight: 15,
  },
  modalEventText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#004D40",
  },
});