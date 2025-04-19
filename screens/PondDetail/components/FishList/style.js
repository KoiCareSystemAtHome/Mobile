import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 50, 80, 0.4)", // Darker aquatic overlay
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  fishGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fishCard: {
    width: "48%", // Slightly less than 33.33% to account for margins
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  fishImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 8,
  },
  fishName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A3C5A",
    textAlign: "center",
  },
  noDataText: {
    fontSize: 14,
    color: "#4A5568",
    textAlign: "center",
    padding: 12,
  },
});