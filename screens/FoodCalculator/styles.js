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
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    width: "50%",
  },
  selectorText: {
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    width: "50%",
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#FFA500", // Orange for active
  },
  toggleText: {
    fontSize: 12,
    color: "#grey",
  },
  activeText: {
    fontWeight: "bold",
    color: "#000",
  },
  infoText: {
    fontSize: 14,
    color: "grey",
    marginTop: 20,
    textAlign: "justify",
  },
  fishInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  
  fishInfoItem: {
    fontSize: 16,
    color: 'black',
    textAlign: 'justify',
    paddingBottom:3
  },
  fishInfoItemBold: {
    fontWeight: 'bold',
  },
  recommendationButton: {
    marginBottom: 20,
    backgroundColor: "#222",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 0,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  suggestButton: {
    backgroundColor: "#FF0000", // Red background
    borderRadius: 25, // Circular shape
    width: 50, // Fixed width
    height: 50, // Fixed height for a circle
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  recommendationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
