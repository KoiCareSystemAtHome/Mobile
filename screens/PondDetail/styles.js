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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  cardContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    position: "relative", // Allow absolute positioning for the button
  },
  cardContent: {},
  pondImage: {
    width: "100%",
    height: 180,
  },
  pondInfo: {
    padding: 10,
  },
  pondText: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFD29D",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  parametersContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  parametersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  parameterCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 5,
    height: 50,
    width: "30%",
    overflow: "hidden",
  },
  parameterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  statisticsContainer: {
    marginBottom: 20,
  },
  statisticsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statisticCard: {
    backgroundColor: "white",
    height: 300,
  },
  statisticsLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statisticsDropdown: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
