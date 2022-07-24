import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { auth } from '../database/authentication'
import MenuDrawer from '../navigation/MenuDrawer'
import OnboardingScreen from './OnboardingScreen'

const LoadingScreen = ({ navigation }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  useEffect(() => {
    SplashScreen.hide();
    auth.onAuthStateChanged(user => {
      setAuthenticatedUser(user)
    })
  }, [])

  return (
    <View style={{ flex: 1, }}>
      {authenticatedUser !== null ? <MenuDrawer /> : <OnboardingScreen />}
    </View>
  )
}

export default LoadingScreen