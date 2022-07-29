import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

import COLORS from '../global/COLORS'

const LocationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/location-warning.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <Text style={styles.text}>Turn On Location & Allow Location Permission to use the app for better user experience.</Text>
      <Text style={styles.text}>(Restart the app after you turn on location or allow permission.)</Text>
    </View>
  )
}

export default LocationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  image: {
    width: '50%',
    height: 300
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    width: '80%',
    marginBottom: 20
  }
})