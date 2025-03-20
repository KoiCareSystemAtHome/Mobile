import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  container: { flex: 1, padding: 20 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  fishImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardImage: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    flexShrink: 1,
    padding: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editIcon: {
    padding: 5,
  },
  variety: {
    fontSize: 18,
    color: "#787878",
    marginBottom: 5,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    borderRadius: 10,
  },
  infoBlock: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    height: "auto",
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    marginBottom: 20,
    marginTop: 20,
  },

  modalCancelText: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  modalSaveText: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  modalFields: {
    width: "100%",
    marginVertical: 10,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    borderRadius: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    height: 40,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputRow: {
    flex: 1,
    marginHorizontal: 5, // Add spacing between columns
  },
  modalFields: {
    width: "100%",
    marginVertical: 10,
  },
  imageButtonText: {
    color: "#6497B1",
    fontSize: 16,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
    borderStyle: "dashed",
    backgroundColor: "#EBEBEB",
  },
  deceasedButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ff9800",
    padding: 10,
    borderRadius: "50%",

    width: 50,
    height: 50,
  },
  deceasedButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    // marginTop: 5,
  },
  deleteButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: "50%",
    width: 50,
    height: 50,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },

});
