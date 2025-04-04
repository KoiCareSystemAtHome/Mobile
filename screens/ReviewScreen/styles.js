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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  reviewContent: {
    paddingBottom: 20,
  },
  // New product styles
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  shopName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#d32f2f",
    fontWeight: "bold",
  },
  // Existing review styles
  ratingContainer: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  starButton: {
    marginHorizontal: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  reviewInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});