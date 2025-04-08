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
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  terms: {
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  tabs: {  // Used in LoginScreen
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  tab: {  // Used in LoginScreen
    marginHorizontal: 10,
    fontSize: 18,
    color: "#555",
  },
  activeTab: {  // Used in LoginScreen
    borderBottomWidth: 2,
    borderBottomColor: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  forgot: {
    color: "#007BFF",
  },
  loginButton: {
    backgroundColor: "#6497B1",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});