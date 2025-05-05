import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Softer overlay for readability
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    backgroundColor: "rgba(0, 105, 148, 0.8)", // Deep blue for water theme
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure header stays above scrollable content
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    marginTop: 100, // Space for fixed header
    marginBottom: 80, // Space for fixed checkout button
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  walletContainer: {
    padding: 12,
    backgroundColor: "#E6F0FA", // Light blue for water effect
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  walletText: {
    fontSize: 16,
    color: "#004D73", // Darker blue for contrast
    fontWeight: "600",
  },
  addressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#006994", // Water-themed blue
    margin: 20,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressBarText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
  },
  addressInfo: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  changeAddressButton: {
    alignSelf: "flex-end",
  },
  changeAddressText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9", // Light background for contrast
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#004D73",
    fontWeight: "500",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F0FA",
    borderRadius: 20,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  quantityButton: {
    backgroundColor: "#006994",
    padding: 8,
    borderRadius: 12,
  },
  quantityText: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 12,
    fontWeight: "500",
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  summaryPrice: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  totalText: {
    fontSize: 18,
    color: "#004D73",
    fontWeight: "700",
  },
  totalPrice: {
    fontSize: 18,
    color: "#004D73",
    fontWeight: "700",
  },
  paymentMethodContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowರ: false,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D73",
    marginBottom: 12,
  },
  radioGroup: {
    flexDirection: "column",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  checkoutButton: {
    backgroundColor: "#006994", // Water-themed blue
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure button stays above scrollable content
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  spacer: {
    height: 100, // Space to prevent content from being hidden under checkout button
  },
});