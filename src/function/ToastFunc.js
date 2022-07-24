import { ToastAndroid } from 'react-native'

const ToastLongComp = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0, 300)
}

const ToastShortComp = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0, 300)
}

export { ToastLongComp, ToastShortComp };