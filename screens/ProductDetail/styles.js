import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  container: {
    flex: 1,
    // backgroundColor: "#F5F5F5",
    padding: 40,
    borderRadius: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  shopName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 20,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  heartButton: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
  },
  addToCartButton: {
    backgroundColor: "#20A920",
    paddingHorizontal: 40,
    width: "70%",
    borderRadius: 30,
    flexDirection: "row", // Ensures icon and text are inline
    alignItems: "center", // Aligns items vertically
    justifyContent: "center", // Centers content
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  feedbackSection: {
    marginTop: 20,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  feedbackSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  feedbackList: {
    maxHeight: 200, // Optional: limits the height of the feedback list
  },
  feedbackItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  feedbackHeader: {
    marginBottom: 5,
  },
  feedbackRating: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
  },
  feedbackMemberName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  feedbackContent: {
    fontSize: 14,
    color: "#333",
  },
  noFeedbackText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  paginationButton: {
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  paginationText: {
    color: "#fff",
    fontSize: 16,
  },
  pageInfo: {
    fontSize: 16,
    color: "#333",
  },
  stockQuantity: {
    fontSize: 14,
    color: "#20A920",
    marginTop: 8,
    fontWeight: "600",
  },
  averageRating: {
    fontSize: 14,
    color: "#FFD700",
    marginLeft: 5,
    fontWeight: "600",
  },
});
