import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 50, 80, 0.4)", // Darker, aquatic-themed overlay

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "rgba(0, 73, 104, 0.8)", // Darker blue for header
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    textAlign: "center",
    flex: 1,
    letterSpacing: 0.5,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E6F0FA",
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  blogCard: {
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
  blogHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  shopImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E6F0FA",
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#004D73", // Dark blue for koi theme
    flexShrink: 1,
    lineHeight: 24,
  },
  shopName: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    marginTop: 4,
  },
  blogContent: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 12,
    textAlign: "justify",
  },
  blogImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  productsContainer: {
    marginTop: 8,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D73",
    marginBottom: 12,
  },
  productsList: {
    paddingVertical: 4,
  },
  productCard: {
    width: 140,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
    height: 40, // Fixed height for consistency
  },
  productPrice: {
    fontSize: 14,
    color: "#006994",
    fontWeight: "600",
  },
});