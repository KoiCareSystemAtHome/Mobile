import { Provider } from '@ant-design/react-native';
import React, { useState, useEffect } from 'react';
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { ImageBackground, View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { OtpInput } from 'react-native-otp-entry';
import { activateAccount, resendCode, resendOtp } from '../../redux/slices/authSlice'; // Assuming resendOtp exists
import { useDispatch } from 'react-redux';

const OTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { email } = route.params;
  const [otp, setOtp] = useState(''); // State to store the OTP value
  const [resendTimer, setResendTimer] = useState(300); // Timer for resend (60 seconds)
  const [canResend, setCanResend] = useState(false); // Whether resend is allowed

  // Timer logic for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount
    } else {
      setCanResend(true); // Allow resend when timer reaches 0
    }
  }, [resendTimer]);

  // Function to handle OTP submission
  const handleSubmit = () => {
    if (otp.length === 6) {
      const values = { otp, email };
      dispatch(activateAccount(values))
      .unwrap()
      .then((res)=>{
        if(res === "success"){
          navigation.navigate('Login')
        }
      })
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
    }
  };

  // Function to handle resend OTP
  const handleResend = () => {
    if (canResend) {
      dispatch(resendCode({ email })) // Dispatch resend OTP action
        .unwrap()
        .then(() => {
          Alert.alert('Success', 'A new OTP has been sent to your email.');
          setResendTimer(300); 
          setCanResend(false); 
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to resend OTP. Please try again later.');
          console.error(error);
        });
    }
  };

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
              {canResend ? 'Resend Code' : `Resend Code in ${resendTimer} seconds`}
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default OTPScreen;