import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 50, 80, 0.4)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#004D40", // Deep teal
    textAlign: "center",
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#26A69A", // Teal
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#004D40",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  listContainer: {
    paddingBottom: 80, // Space for pagination
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004D40",
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  orderDetails: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    marginBottom: 6,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26A69A",
    marginBottom: 8,
  },
  expandButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: "#E0F2F1",
    paddingTop: 12,
    marginTop: 8,
  },
  paymentContainer: {
    backgroundColor: "#E0F2F1", // Light teal
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  refundContainer: {
    backgroundColor: "#FFEBEE", // Light red
    borderRadius: 12,
    padding: 12,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#37474F",
    marginBottom: 6,
    lineHeight: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  paginationButton: {
    backgroundColor: "#26A69A", // Teal
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
    opacity: 0.6,
  },
  pageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D40",
  },
});