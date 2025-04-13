import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backArrow: {
    fontSize: 30,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    paddingVertical: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  buttonSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
