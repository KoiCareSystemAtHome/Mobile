import React, { useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { packageSelector } from '../../redux/selector';
import { getPackage } from '../../redux/slices/transactionSlice';
import dayjs from 'dayjs';

const PackageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const packageData = useSelector(packageSelector);

  useEffect(() => {
    dispatch(getPackage());
  }, [dispatch]);

  return (
    <ImageBackground
      source={require('../../assets/koimain3.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Package</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>
          Trải nghiệm tất cả dịch vụ mới từ Koi Guardian
        </Text>

        {/* Package Cards */}
        {packageData.map((pkg, index) => (
          <View key={index} style={styles.packageCard}>
            <View style={styles.cardContent}>
              <Text style={styles.packageTitle}>{pkg.packageTitle}</Text>
              <Text style={styles.packageDescription}>{pkg.packageDescription}</Text>
              <Text style={styles.packageDescription}>
                Có hiệu lực từ: {dayjs(pkg.startDate).format('DD/MM/YYYY')} đến{' '}
                {dayjs(pkg.endDate).format('DD/MM/YYYY')}
              </Text>
              {/* Price Row */}
              <Text style={styles.packagePrice}>
                Giá: {pkg.packagePrice.toLocaleString('vi-VN')} VND
              </Text>
              <TouchableOpacity style={styles.chooseButton}>
                <Text style={styles.chooseButtonText}>Choose</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardIcon}>
              <Text style={styles.iconText}>{pkg.type}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default PackageScreen;