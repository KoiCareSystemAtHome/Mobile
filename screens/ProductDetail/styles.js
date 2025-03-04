import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  feedbackContent: {
    flex: 1,
  },
  feedbackUser: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  feedbackText: {
    fontSize: 14,
    color: "#444",
  },
  feedbackDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  noFeedbackText: {
    textAlign: "center",
    color: "#888",
  },
});
