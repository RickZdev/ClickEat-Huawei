import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'

import COLORS from '../global/COLORS'

const HeaderComp = ({ coverPhoto }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <ImageBackground
        source={{ uri: coverPhoto }}
        resizeMode='cover'
        style={{ width: '100%', height: 150 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: COLORS.white,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20
  }
})