import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import COLORS from '../global/COLORS'

const CategoryCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ItemScreen', data)}>
      <Image
        source={{ uri: data.categoryImage }}
        style={{ height: 100, width: '100%' }}
        resizeMode="cover"
      />
      <Text style={{ position: 'absolute', top: 51, padding: 2, fontWeight: 'bold', color: COLORS.black, borderRadius: 5, fontSize: 9 }}>{data.categoryName}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    width: 60,
    marginRight: 10,
  }
})