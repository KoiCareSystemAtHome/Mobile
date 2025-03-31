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
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30, // Increased margin for better spacing
      color: '#333', // Darker color for better contrast
    },
    otpContainer: {
      width: '100%',
      height: 60,
      marginBottom: 30,
    },
    otpInput: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      fontSize: 20,
      color: '#333',
      backgroundColor: '#fff',
      textAlign: 'center',
    },
    otpInputHighlighted: {
      borderColor: '#007AFF', // Highlight color when focused
    },
    submitButton: {
      backgroundColor: '#007AFF', // A nice blue color for the button
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });