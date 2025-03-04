import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import { styles } from './styles';

const RegisterScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/koiimg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.terms}>
          By signing in you are agreeing to our{' '}
          <Text style={styles.link}>Term and privacy policy</Text>
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.tab}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.tab, styles.activeTab]}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            placeholderTextColor="#C4C4C4"
          />
          <Image
            source={require('../../assets/adaptive-icon.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            placeholderTextColor="#C4C4C4"
          />
          <Image
            source={require('../../assets/adaptive-icon.png')}
            style={styles.icon}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#C4C4C4"
          />
          <Image
            source={require('../../assets/adaptive-icon.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#C4C4C4"
          />
          <Image
            source={require('../../assets/adaptive-icon.png')}
            style={styles.icon}
          />
        </View>

        <View style={styles.row}>
          {/* <CheckBox value={true} /> */}
          <Text style={styles.remember}>Remember password</Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forget password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.connectText}>or connect with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/facebook 1.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/google-icon-2048x2048-czn3g8x8 1.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};


export default RegisterScreen;
