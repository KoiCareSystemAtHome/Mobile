import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Match Shopping screen
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatListContent: {
    paddingBottom: 100, // Space for cartFab
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#004D40", // Deep teal
    flex: 1,
    textAlign: "center",
  },
  headerPlaceholder: {
    width: 44, // Match backButton size for symmetry
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  productInfo: {
    marginBottom: 20,
  },
  shopName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00695C", // Lighter teal
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stockQuantity: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26A69A", // Teal
  },
  averageRating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD700",
    marginLeft: 12,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#004D40",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
    marginRight: 12,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#26A69A",
    paddingHorizontal: 10,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#004D40",
  },
  disabledQuantityButton: {
    opacity: 0.5,
  },
  disabledQuantityText: {
    color: "#B0BEC5",
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginHorizontal: 12,
  },
  addToCartButton: {
    backgroundColor: "#26A69A", // Teal
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  disabledAddToCartButton: {
    backgroundColor: "#B0BEC5",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#37474F", // Darker gray
    lineHeight: 20,
    marginBottom: 12,
  },
  feedbackSection: {
    marginBottom: 20,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#004D40",
    marginBottom: 12,
  },
  feedbackItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  feedbackMemberName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#004D40",
  },
  feedbackRating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD700",
  },
  feedbackContent: {
    fontSize: 14,
    fontWeight: "400",
    color: "#37474F",
  },
  noFeedbackText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    textAlign: "center",
    marginVertical: 12,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  paginationButton: {
    backgroundColor: "#E0F2F1",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 12,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
    opacity: 0.5,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
  cartFab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#26A69A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100,
  },
});