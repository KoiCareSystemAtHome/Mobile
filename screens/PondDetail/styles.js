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
    // flex:1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  cardContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    position: "relative", // Allow absolute positioning for the button
  },
  cardContent: {},
  pondImage: {
    width: "100%",
    height: 180,
  },
  pondInfo: {
    padding: 10,
  },
  pondText: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFD29D",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addFishButton: {
    bottom: 50, // Position it above the edit button
    right: 0,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  parametersContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  parametersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  parameterCard: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 5,
    height: 50,
    width: "30%",
    overflow: "hidden",
  },
  parameterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  statisticsContainer: {
    marginBottom: 100,
  },
  statisticsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statisticCard: {
    backgroundColor: "white",
    height: 300,
  },
  statisticsLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statisticsDropdown: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  suggestedContainer: {
    marginTop: 20,
  },
  productList: {
    paddingVertical: 10,
  },
  productCard: {
    width: 180,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10, // Space between cards
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 128,
    height: 128,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 14,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },
  addToCartButton: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#20A920",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  addToCartText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  modal:{
    width:350
  },
  modalOverlay: {
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
    justifyContent: "center",
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
    marginHorizontal: 5, // Add spacing between columns
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
    height: 40,
    borderRadius: 10,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:"white"
  },
  imageContainer: {
    alignItems: "center",
  },
  selectedImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  changeImageText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  statusCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 50,

  },
});