import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  walletContainer: {
    padding: 10,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  walletText: {
    fontSize: 16,
    color: "#333",
  },
  addressBar: {
    height: "auto",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressInfo: {
    height: "auto",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#342F3F",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    width: "59%",
    color: "white",
  },
  productPrice: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
  },
  quantityButton: {
    backgroundColor: "#8E6CEF",
    padding: 5,
    borderRadius: 50,
  },
  quantityText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 10,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentMethodContainer: {
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "column",
  },
  radioItem: {
    marginVertical: 5,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
  },
  couponContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#342F3F",
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  applyCouponButton: {
    backgroundColor: "#8E6CEF",
    padding: 10,
    borderRadius: 50,
  },
  checkoutButton: {
    backgroundColor: "#8E6CEF",
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    height: "auto",
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
  },
});
