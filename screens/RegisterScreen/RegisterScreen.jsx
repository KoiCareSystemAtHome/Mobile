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
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.terms}>
          Khi đăng nhập hệ thống, bạn đồng ý với{' '}
          <Text style={styles.link}>Điều khoản và chính sách bảo mật</Text>
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.tab}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.tab, styles.activeTab]}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Họ và tên"
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
            placeholder="Email"
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
            placeholder="Mật khẩu"
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
            placeholder="Nhập lại mật khẩu"
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
          <Text style={styles.remember}>
            {/* Remember password */}
            </Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Đăng ký</Text>
        </TouchableOpacity>

       
        
      </View>
    </ImageBackground>
  );
};


export default RegisterScreen;
