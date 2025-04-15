import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 50, 80, 0.4)", // Darker, aquatic-themed overlay
  },
  container: {
    flex: 1,
    padding: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 73, 104, 0.8)", // Dark blue
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#004D73", // Dark blue
    marginBottom: 8,
  },
  shopName: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  averageRating: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "600",
    marginLeft: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#006994", // Water-themed blue
    marginBottom: 8,
  },
  stockQuantity: {
    fontSize: 16,
    color: "#20A920", // Green for availability
    fontWeight: "600",
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    textAlign: "justify",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E6F0FA", // Light blue
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D73",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    // paddingHorizontal: 8,
  },
  quantityButton: {
    backgroundColor: "#006994",
    padding: 10,
    paddingHorizontal: 12,

    borderRadius: 15,
  },
  quantityText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
  },
  addToCartButton: {
    backgroundColor: "#006994",
    borderRadius: 12,
    // padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  feedbackSection: {
    marginTop: 16,
    marginBottom: 12,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#004D73",
  },
  feedbackItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  feedbackHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  feedbackMemberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  feedbackRating: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "600",
  },
  feedbackContent: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  noFeedbackText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#E6F0FA",
    borderRadius: 12,
    marginTop: 12,
  },
  paginationButton: {
    backgroundColor: "#006994",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#B0C4DE",
  },
  paginationText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  pageInfo: {
    fontSize: 16,
    color: "#004D73",
    fontWeight: "600",
  },
});
