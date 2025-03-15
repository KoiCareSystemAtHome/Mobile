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
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dropdown: {
    marginBottom: 20,
    borderColor: "#4A90E2",
  },
  dropdownContainer: {
    borderColor: "#4A90E2",
  },
  selectedContainer: {
    marginTop: 20,
  },
  symptomText: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
  },
});
