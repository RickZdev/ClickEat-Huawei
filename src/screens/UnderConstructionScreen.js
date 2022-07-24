import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

import COLORS from '../global/COLORS'

const UnderConstructionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={require('../assets/images/under-construction.jpg')}
        resizeMode='cover'
        style={styles.image}
      />
      <Text style={styles.text}>Page is Under Construction</Text>
      <Text style={styles.text}>Sorry for Any Inconvenient</Text>
    </View>
  )
}

export default UnderConstructionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  backButton: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    elevation: 7,
    zIndex: 100,
    width: 30,
    height: 30,
    top: 0,
    left: 0,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black
  }
})