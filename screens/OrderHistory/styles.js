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
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff5722",
  },
  status: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 14,
    color: "#ff5722",
  },
  productRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,

  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    flexDirection: "row",
    justifyContent:'flex-end',
    alignItems: "center",
    marginTop: 4,
  },
  originalPrice: {
    color: "#999",
    marginRight: 6,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  quantity: {
    marginTop: 4,
    fontSize: 12,
    color: "#555",
  },
  totalPrice: {
    fontSize: 14,
    color: "#333",
  },
  highlight: {
    fontWeight: "bold",
    color: "#d32f2f",
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  rewardText: {
    fontSize: 13,
    color: "#f57c00",
    marginLeft: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  returnButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: "#d32f2f",
    borderWidth: 1,
    borderRadius: 5,
  },
  returnText: {
    fontSize: 14,
    color: "#d32f2f",
  },
  reviewButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  paginationButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: "transparent",
  },
  paginationText: {
    color: "#fff",
    fontSize: 16,
  },
  pageText: {
    fontSize: 16,
    color: "#333",
  },
});
