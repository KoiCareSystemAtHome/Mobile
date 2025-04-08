import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  scrollContainer: {
    // flex: 1,
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  formContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
    backgroundColor: "white",
    height: 60,
  },
  genderField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  genderLabel: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownContainer: {
    fontSize: 16,
    backgroundColor: "transparent",
  },
  imageContainer: {
    alignItems: "center",
  },
  selectedImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },

  changeImageText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  imageButton: {
    borderWidth: 2,
    borderColor: "#3498db", // Vibrant blue border
    borderStyle: "dashed", // Dashed border for a modern touch
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12, // Softer rounded corners
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background
    shadowColor: "#000", // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  imageButtonText: {
    color: "#3498db", // Matching blue text
    fontSize: 16,
    fontWeight: "600", // Bolder text for emphasis
    letterSpacing: 0.5, // Slight letter spacing for readability
  },
  fishImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
