import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerIcon: {
    fontSize: 24,
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  calendar: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  arrow: {
    fontSize: 24,
    color: "#000",
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
    width: 20,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#000",
  },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    fontSize: 24,
    color: "#FFF",
  },
  todayLabel: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#FFF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  todayLabelText: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "bold",
  },
  // Modal styles
modal: {
    justifyContent: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "50%", // Adjust height as needed
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderIcon: {
    fontSize: 24,
    marginRight: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  modalBody: {
    flex: 1,
  },
  modalDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  modalEvent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalEventTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginRight: 20,
  },
  modalEventText: {
    fontSize: 16,
    color: "#000",
  },
  modalEventDescription: {
    fontSize: 14,
    color: "#666",
  },
  modalTodayLabel: {
    alignSelf: "center",
    backgroundColor: "#6A5ACD", // Purple like the header
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  modalTodayLabelText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
});