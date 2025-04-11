import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(153, 204, 153, 0.6)",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingLeft: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  filterText: {
    marginLeft: 5,
    fontSize: 16,
  },
  filterDrawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 300,
    height: "100%",
    backgroundColor: "#fff",
    padding: 15,
    zIndex: 1001, // Ensure drawer is above the overlay
  },
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black overlay
    zIndex: 1000, // Below the drawer but above other content
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop:40
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterScrollContainer: {
    flexGrow: 1,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterOptions: {
    maxHeight: 150,
  },
  filterOption: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: "#ddd",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  activeCategory: {
    backgroundColor: "#20A920",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  activeCategoryText: {
    color: "white",
    fontWeight: "bold",
  },
 productList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "space-between", // Distribute content evenly
    height: 280, // Fixed height for uniformity
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 120, // Fixed image height to prevent stretching
    resizeMode: "cover",
    borderRadius: 5, // Optional: rounded corners for image
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    flexWrap: "wrap", // Allow text to wrap to avoid overflow
    maxHeight: 40, // Limit text height to prevent overlap
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },
  priceAndButtonContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 8,
  },
  addToCartButton: {
    backgroundColor: "#20A920",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Full width for consistency
  },
  addToCartText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingVertical: 10,
    width: 70,
  },
  paginationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "transparent",
    opacity: 0.3,
  },
  pageText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});