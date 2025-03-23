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
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
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
  categoryContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems:"center",
    justifyContent:"center",
    height:50
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "white",
        // Box Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    
        // Elevation for Android
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 300,

    // Box Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Elevation for Android
    elevation: 5,
},

  productImage: {
    width: 128,
    height: 128,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 14,
    textAlign:"center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom:100-0
  },
  addToCartButton: {
  position:"absolute",
  bottom:0,
  backgroundColor: "#20A920", // Green color
  borderRadius: 20, // Fully rounded button
  paddingVertical: 10,
  paddingHorizontal: 20,
  marginTop: 10,
  alignItems: "center",
  justifyContent: "center",
  marginBottom:10
},
addToCartText: {
  color: "white",
  fontSize: 16,
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
    backgroundColor: "#20A920", // Match your theme color
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
    backgroundColor: "#ccc",
  },
  pageText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});
