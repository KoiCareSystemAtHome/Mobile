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
  categoryContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems:"center",
    justifyContent:"center",
    height:50
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
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
  priceAndButtonContainer: {
    flexDirection: "row", // Sắp xếp ngang hàng
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "space-between", // Đẩy 2 bên ra xa
    width: "100%", // Đảm bảo chiếm full chiều rộng
    paddingHorizontal: 10, // Khoảng cách hai bên
    marginTop: 8,
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
    justifyContent: "center",
  
    // Auto height nhưng không quá 300
    minHeight: 100, 
    maxHeight: 300, 
    alignSelf: "stretch", // Chiều rộng tự động mở rộng
  
    // Box Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
  
    // Elevation for Android
    elevation: 5,
  },
  

  productImage: {
    marginTop: 46,
    width: "100%",
    height: "50%",
    resizeMode: "cover"
  },
  productName: {
    marginTop:8,
    fontSize: 14,
    textAlign:"bottom",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom:0
  },
  priceContainer: {
    flexDirection: "row", // Căn ngang hàng
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "space-between", // Đẩy các phần tử ra xa
    width: "100%", // Full chiều rộng
    marginTop: 8,
  },
  
  priceText: {
    flex: 0.7, // 70% width
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  
  iconContainer: {
    flex: 0.3, // 30% width
    alignItems: "flex-end", // Căn phải icon
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
    backgroundColor: "#transparent", // Match your theme color
    borderRadius: 8,
    paddingVertical: 10,
    width: 70,
    fontWeight: "bold",
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
