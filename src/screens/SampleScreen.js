import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  huaweiLocationInitialize,
  huaweiRequestLocationPermission,
  huaweiRequestLocationUpdatesWithCallback,
  huaweiLocationCheckSettings,
  huaweiGetLocation,
  huaweiGetLocationByName,
} from '../hms-kit/HuaweiLocation'

const SampleScreen = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [location, setLocation] = useState({});

  useEffect(() => {
    huaweiLocationInitialize();
    huaweiRequestLocationPermission();
    huaweiRequestLocationUpdatesWithCallback();
    huaweiLocationCheckSettings();
    huaweiGetLocation(setCurrentLocation)
    huaweiGetLocationByName(currentLocation.latitude, currentLocation.longitude, setLocation)

    console.log(location)
  }, [])

  return (
    <View>
      <Button title="GET PERMISSION" onPress={() => { }} />
      <Text>{currentLocation.latitude}</Text>
      <Text>{currentLocation.longitude}</Text>
      <Text>{currentLocation.street}</Text>
    </View>
  )
}

export default SampleScreen

const styles = StyleSheet.create({})