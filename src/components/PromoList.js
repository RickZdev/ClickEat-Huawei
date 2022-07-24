import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import COLORS from '../global/COLORS'

const PromoList = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/jollibee-ads.jpg')}
        resizeMode='cover'
        style={styles.image}
      />
      {/* <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: 'bold', marginBottom: 10 }}>Available Promos </Text>
      {promos.map(item => (
        <TouchableOpacity style={styles.promoContainer} key={item.id}>
          <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: '500' }}>{item.promoName}</Text>
          <AntDesign name="right" color={COLORS.black} size={16} />
        </TouchableOpacity>
      ))} */}
    </View>
  )
}

export default PromoList

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    marginBottom: 10
  },
  promoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})