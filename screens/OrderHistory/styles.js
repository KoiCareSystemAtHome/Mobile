import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 50, 80, 0.4)", // Darker aquatic overlay
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto", // Replace with custom font if available
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
    flexGrow: 1,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 16,
    padding: 16,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A3C5A",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A3C5A",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 2,
  },
  quantity: {
    fontSize: 14,
    color: "#4A5568",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0077B6",
  },
  orderFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A3C5A",
    marginBottom: 8,
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardText: {
    fontSize: 14,
    color: "#4A5568",
    marginLeft: 8,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  paginationButton: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: "#F1F5F9",
    opacity: 0.6,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A3C5A",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A5568",
  },
  noDataText: {
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
    marginTop: 24,
  },
});