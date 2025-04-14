import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3B82F6",
  },
  tabText: {
    fontSize: 16,
    color: "#4B5563",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#3B82F6",
    fontWeight: "700",
  },
  listContainer: {
    paddingBottom: 20,
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3A8A",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626", // Matches orderTotal for consistency
    marginBottom: 6,
  },
  orderDetails: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 6,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
    marginBottom: 8,
  },
  paymentContainer: {
    backgroundColor: "#D1FAE5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  refundContainer: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#1E3A8A",
    marginBottom: 6,
    lineHeight: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  paginationButton: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 8,
    paddingVertical: 10,
    width: 50,
    alignItems: "center",
  },
  paginationText: {
    color: "#1E3A8A",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "transparent",
    opacity: 0.3,
  },
  pageText: {
    color: "#1E3A8A",
    fontSize: 16,
    fontWeight: "500",
  },
});