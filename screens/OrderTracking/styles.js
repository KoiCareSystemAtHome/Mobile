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
  progressContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    marginTop:20
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    position: "relative",
    marginBottom: 10,
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#ddd",
  },
  progressLineActive: {
    backgroundColor: "#00A76F",
  },
  step: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ddd",
    position: "absolute",
  },
  stepActive: {
    backgroundColor: "#00A76F",
  },
  stepCompleted: {
    backgroundColor: "#00A76F",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  stepText: {
    fontSize: 10,
    color: "#aaa",
  },
  stepTextActive: {
    color: "#00A76F",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#00A76F",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  status: {
    fontSize: 14,
    color: "gray",
  },
  activeText: {
    color: "green",
    fontWeight: "bold",
  },
});
