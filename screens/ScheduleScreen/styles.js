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
    color: "#FF0000", // Red for "Today"
    fontWeight: "bold",
  },
  // Modal styles
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  modalEvent: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  modalEventDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  modalEventText: {
    fontSize: 16,
    color: "#000",
    textTransform: "capitalize", // Capitalize "unfinished" and "finished"
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});