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
    paddingTop: 60,
  },
  formContainer: { // Added for EditFishScreen
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
  },
  fishImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  variety: {
    fontSize: 16,
    color: "#666",
  },
  price: {
    fontSize: 16,
    color: "#6497B1",
    marginVertical: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBlock: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#999",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editIcon: {
    padding: 5,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: "#666",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  modalCancelButton: {
    padding: 10,
  },
  modalCancelText: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalSaveButton: {
    padding: 10,
  },
  modalSaveText: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#6497B1",
    fontSize: 16,
  },
  modalFields: {
    backgroundColor: "transparent",
    width: "100%",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputRow: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 5,
    height: 40,
    borderRadius: 10,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  deceasedButton: {
    backgroundColor: "#ff4d4f",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  deceasedButtonText: {
    textAlign: "center",
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#ff4d4f",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    textAlign: "center",
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 5,
  },
});