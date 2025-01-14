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

const RegisterScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/koiimg.jpg')}
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
            source={require('../assets/adaptive-icon.png')}
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
            source={require('../assets/adaptive-icon.png')}
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
            source={require('../assets/adaptive-icon.png')}
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
            source={require('../assets/adaptive-icon.png')}
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
              source={require('../assets/facebook 1.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/google-icon-2048x2048-czn3g8x8 1.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  terms: {
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  tab: {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#555',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height:50,
    borderRadius:10 ,
    backgroundColor:"white"
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  remember: {
    marginLeft: 8,
  },
  forgot: {
    color: '#007BFF',
  },
  loginButton: {
    backgroundColor: '#6497B1',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  connectText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});

export default RegisterScreen;
