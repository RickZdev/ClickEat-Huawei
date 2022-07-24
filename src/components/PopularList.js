import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import PopularCard from './PopularCard'
import COLORS from '../global/COLORS'

const PopularList = ({ data }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: 'bold', paddingLeft: 5 }}> Most Popular Meals </Text>
      <FlatList
        style={{ paddingHorizontal: 10, marginTop: 10 }}
        data={data}
        keyExtractor={data => data._id}
        renderItem={({ item }) => <PopularCard popularItem={item} />}
        horizontal={true}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 5 }} />}
      />
    </View>
  )
}

export default PopularList

const styles = StyleSheet.create({})