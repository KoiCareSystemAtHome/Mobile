import { Provider } from "@ant-design/react-native";
import React, { useState, useEffect } from "react";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { OtpInput } from "react-native-otp-entry";
import { activateAccount, resendCode } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Toast } from "@ant-design/react-native"; // Added Toast import

const OTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);

  // Configure Toast duration globally
  useEffect(() => {
    Toast.config({ duration: 2 });
  }, []);

  // Timer logic for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Function to handle OTP submission
  const handleSubmit = () => {
    if (otp.length === 6) {
      const values = { otp, email };
      dispatch(activateAccount(values))
        .unwrap()
        .then((res) => {
          if (res.status === "200") {
            Toast.success("Account activated successfully");
            setTimeout(() => {
              navigation.navigate("Login");
            }, 1000);
          }
        })
        .catch((error) => {
          Toast.fail("Failed to activate account. Please try again.");
          console.error(error);
        });
    } else {
      Toast.fail("Please enter a valid 6-digit OTP");
    }
  };

  // Function to handle resend OTP
  const handleResend = () => {
    if (canResend) {
      dispatch(resendCode({ email }))
        .unwrap()
        .then(() => {
          Toast.success("A new OTP has been sent to your email");
          setResendTimer(300);
          setCanResend(false);
        })
        .catch((error) => {
          Toast.fail("Failed to resend OTP. Please try again later");
          console.error(error);
        });
    }
  };
  useEffect(() => {
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      });
    };

    loadFontAsync();
  }, []);
  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koiimg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Xác Nhận Tài Khoản</Text>

          {/* OTP Input Field */}
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => setOtp(text)}
            focusColor="#007AFF"
            autoFocus={true}
            theme={{
              containerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.otpInput,
              focusedPinCodeContainerStyle: styles.otpInputHighlighted,
            }}
          />

          {/* Resend Code Text */}
          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text
              style={[
                styles.resendText,
                !canResend && styles.resendTextDisabled,
              ]}
            >
              {canResend
                ? "Resend Code"
                : `Resend Code in ${resendTimer} seconds`}
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default OTPScreen;
