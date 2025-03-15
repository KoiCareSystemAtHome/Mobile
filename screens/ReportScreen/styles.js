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
  imageContainer: {
    alignItems: "center",
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  imageButtonText: {
    color: "#6497B1",
    fontSize: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  changeImageButton: {
    backgroundColor: "#16a085",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },

  changeImageText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputRow: {
    flex: 1,
    marginHorizontal: 5, // Add spacing between columns
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    borderRadius: 30,
  },
  submitButton: {
      padding: 10,
      marginTop:50,
      backgroundColor:"#16a085",
    },
});
