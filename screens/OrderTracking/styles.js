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
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    flexDirection: "column", // Stack the title and footer vertically
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",

  },
  price: {
    fontSize: 14,
    color: "#00A76F",
    marginRight: 10, // Space between price and quantity
  },
  quantity: {
    fontSize: 14,
    color: "#666",
    marginRight: 10, // Space between quantity and total price
  },
  productFooter: {
    flexDirection: "row", // Align price, quantity, and total price in a row
    alignItems: "center",
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 14,
    color: "#333",
  },
  highlight: {
    fontWeight: "bold",
    color: "#00A76F",
  },
  progressContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    marginTop: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    position: "relative",
    marginBottom: 10,
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#ddd",
  },
  progressLineActive: {
    backgroundColor: "#00A76F",
  },
  step: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ddd",
    position: "absolute",
  },
  stepActive: {
    backgroundColor: "#00A76F",
  },
  stepCompleted: {
    backgroundColor: "#00A76F",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  stepText: {
    fontSize: 10,
    color: "#aaa",
  },
  stepTextActive: {
    color: "#00A76F",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  reportButton: {
    backgroundColor: "#FF4D4F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  reviewButton: {
    backgroundColor: "#00A76F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF9500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  status: {
    fontSize: 14,
    color: "gray",
  },
  activeText: {
    color: "green",
    fontWeight: "bold",
  },
  paymentDetails: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentAmount: {
    fontSize: 18,
    color: "#ff4d4f",
    fontWeight: "bold",
    marginVertical: 5,
  },
  paymentDueDate: {
    fontSize: 14,
    color: "#888",
  },
  paymentSource: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  paymentStatus: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
});