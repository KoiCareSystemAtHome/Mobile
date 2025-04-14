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
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A3C5A",
    marginBottom: 12,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
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
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0077B6",
  },
  paymentDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A3C5A",
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0077B6",
    marginBottom: 4,
  },
  paymentDueDate: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 4,
  },
  paymentSource: {
    fontSize: 14,
    color: "#4A5568",
  },
  paymentStatus: {
    fontWeight: "600",
    color: "#0077B6",
  },
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    position: "relative",
    marginVertical: 12,
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: "#E2E8F0",
  },
  progressLineActive: {
    backgroundColor: "#10B981",
  },
  step: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  stepActive: {
    backgroundColor: "#10B981",
  },
  stepCompleted: {
    backgroundColor: "#10B981",
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  stepText: {
    fontSize: 12,
    color: "#A0AEC0",
    textAlign: "center",
  },
  stepTextActive: {
    color: "#1A3C5A",
    fontWeight: "600",
  },
  trackingCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
  },
  trackingItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  trackingTime: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 2,
  },
  trackingStatus: {
    fontSize: 14,
    color: "#4A5568",
  },
  activeText: {
    color: "#10B981",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: "#0077B6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 6,
    alignItems: "center",
    flexGrow: 1,
    minWidth: 120,
  },
  confirmButton: {
    backgroundColor: "#10B981", // Green color for confirmation
  },
  cancelButton: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  noDataText: {
    fontSize: 14,
    color: "#4A5568",
    textAlign: "center",
    padding: 12,
  },
});
