import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { auth } from '../database/authentication'
import { huaweiLocationCheckSettings, huaweiLocationInitialize, huaweiRequestLocationPermission, huaweiRequestLocationUpdatesWithCallback } from '../hms-kit/HuaweiLocation'
import LocationScreen from './LocationScreen'

const LoadingScreen = ({ navigation }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [isLocationOpen, setIsLocationAvailable] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
    huaweiLocationInitialize();
    huaweiLocationCheckSettings(setIsLocationAvailable)
    huaweiRequestLocationPermission();
    huaweiRequestLocationUpdatesWithCallback();
    console.log('hahaha')
    auth.onAuthStateChanged(user => {
      setAuthenticatedUser(user)
    })
  }, [])



  const onRefresh = () => {
    setRefreshing(true)
    huaweiLocationCheckSettings(setIsLocationAvailable)
    huaweiRequestLocationPermission();
    huaweiRequestLocationUpdatesWithCallback();
    setRefreshing(false)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
        />
      }
    >
      {isLocationOpen ?
        <>
          {authenticatedUser !== null ? navigation.replace('MenuDrawer') : navigation.replace('OnboardingScreen')}
        </>
        :
        <>
          <LocationScreen />
        </>

      }
    </ScrollView>
  )
}

export default LoadingScreen