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
  note: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    padding: 4,
    marginBottom: 16
  },
  foodImage: {
    width: '95%',
    height: 350,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 10
  },  
  notediv: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    marginBottom: 20,
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
});
