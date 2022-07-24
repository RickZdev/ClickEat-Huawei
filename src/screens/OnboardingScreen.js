import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import COLORS from '../global/COLORS'
import { useNavigation } from '@react-navigation/native'

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/images/onboarding-screen.png')}
      resizeMode='cover'
      style={styles.background}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.text}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.text}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    marginBottom: 35
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginBottom: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: "uppercase"
  },

})