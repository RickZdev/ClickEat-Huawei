import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Alert } from "react-native";
import { ToastShortComp } from "../function/ToastFunc";
import { addUser } from "./db";

const firebaseConfig = {
  apiKey: "AIzaSyAkN8R1XeD3n5V9SToVaua86xoO5LMUbvw",
  authDomain: "huawei-foodapp.firebaseapp.com",
  projectId: "huawei-foodapp",
  storageBucket: "huawei-foodapp.appspot.com",
  messagingSenderId: "566022633643",
  appId: "1:566022633643:web:7037c439e716ec1f6a1fee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// authentication
const addAuthenticatedUser = async (values, navigation) => {
  try {
    firstName, lastName, email, phoneNumber, password
    const { firstName, lastName, email, phoneNumber, password } = values;
    const fullName = `${firstName} ${lastName}`;
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/shopping-app-be469.appspot.com/o/images%2Favatar%2Favatar.jpg?alt=media&token=32022140-2a82-4c45-8a4b-9fe6f500eba4'
    })

    const extraInfo = {
      createdAt: new Date().toLocaleString(),
      cart: [],
      photoURL: auth.currentUser.photoURL,
      _id: auth.currentUser.uid
    }
    addUser({ ...values, ...extraInfo });
    ToastShortComp('Account Created Successfully!')
    navigation.goBack();
  } catch (err) {
    ToastShortComp(err.message)
  }
}

const loginUser = async (email, password, navigation) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    ToastShortComp(`${user.displayName} Logged in Successfully!`)
    navigation.replace('MenuDrawer');
  } catch (error) {
    if (error.message == 'Firebase: Error (auth/user-not-found).') {
      Alert.alert('', 'Email Address Not Found. Please try again!', [{ text: "Try again", onPress: () => { } }]);
    } else {
      Alert.alert('', 'Wrong Password. Please try again!', [{ text: "Try again", onPress: () => { } }]);
    }
  }
}

const logoutUser = async (navigation) => {
  try {
    await signOut(auth)
    ToastShortComp('Logged out Successfully!')
    navigation.replace('LoginScreen');
  } catch (error) {
    ToastShortComp(error.message)
  }
}

export { auth, addAuthenticatedUser, loginUser, logoutUser }
