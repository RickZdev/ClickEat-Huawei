import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import COLORS from '../global/COLORS'

const PopularCard = ({ popularItem }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{ width: 200, overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} onPress={() => navigation.navigate("ProductScreen", popularItem)}>
      <Image
        source={{ uri: popularItem.foodImage }}
        style={{ width: '100%', height: 120, marginBottom: 5 }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black, marginBottom: 5 }}>{popularItem.foodName}</Text>
      <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '400', color: COLORS.black, marginBottom: 3 }}>{popularItem.foodRestaurant} - {popularItem.foodLocation}</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.black }}>P{popularItem.foodPrice}.00</Text>
    </TouchableOpacity>
  )
}

export default PopularCard

const styles = StyleSheet.create({})