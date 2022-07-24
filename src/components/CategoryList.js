import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

const CategoryList = ({ data }) => {
  return (
    <FlatList
      style={{ marginTop: 20 }}
      data={data}
      keyExtractor={data => data._id}
      renderItem={({ item }) => <CategoryCard data={item} />}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => <View style={{ marginLeft: 10 }} />}
    />
  )
}

export default CategoryList

const styles = StyleSheet.create({})