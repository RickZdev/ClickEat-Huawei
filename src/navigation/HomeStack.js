import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import ProductScreen from '../screens/ProductScreen'
import ShopScreen from '../screens/ShopScreen'
import ItemScreen from '../screens/ItemScreen'
import UnderConstructionScreen from '../screens/UnderConstructionScreen'
import RestaurantScreen from '../screens/RestaurantScreen'
import HuaweiMap from '../hms-kit/HuaweiMap'
// import HuaweiMap from '../hms-kit/HuaweiMap'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
      <Stack.Screen name="MapScreen" component={HuaweiMap} />
      <Stack.Screen name="UnderConstructionScreen" component={UnderConstructionScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack;