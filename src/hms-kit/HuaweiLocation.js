import HMSLocation from '@hmscore/react-native-hms-location';
import { Alert, PermissionsAndroid } from 'react-native';

const locationRequest = {
  priority: HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
  interval: 3,
  numUpdates: 10,
  fastestInterval: 1000.0,
  expirationTime: 200000.0,
  expirationTimeDuration: 200000.0,
  smallestDisplacement: 0.0,
  maxWaitTime: 2000000.0,
  needAddress: true,
  language: 'en',
  countryCode: 'en',
};

const locationSettingsRequest = {
  locationRequests: [locationRequest],
  alwaysShow: true,
  needBle: false,
}

const huaweiLocationInitialize = () => {
  HMSLocation.LocationKit.Native.init()
    .then(_ => console.log("Initialize Location: true"))
    .catch(error => console.log("Error while initializing." + error));
}

const huaweiRequestLocationPermission = async () => {
  HMSLocation.FusedLocation.Native.hasPermission()
    .then((res) => console.log("hasPermission: ", res.hasPermission))
    .catch((err) => console.log(err.message));

  try {
    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);

    if (
      userResponse["android.permission.ACCESS_FINE_LOCATION"] ==
      PermissionsAndroid.RESULTS.DENIED ||
      userResponse["android.permission.ACCESS_FINE_LOCATION"] ==
      PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      Alert.alert("Permission:", "Please allow permission to use location in settings to use this app");
    }
  } catch (err) {
    Alert.alert("Permission:", "Please allow permission to use location in settings to use this app");
  }
}

const huaweiRequestLocationUpdatesWithCallback = () => {
  HMSLocation.FusedLocation.Native.requestLocationUpdatesWithCallbackEx(locationRequest)
    .then((res) => console.log("Request Location Updates with CallBack: true"))
    .catch((err) => console.log("ERROR: REQUEST LOCATION UPDATES WITH CALLBACK", err.message));
};

const huaweiLocationCheckSettings = (setIsLocationAvailable) => {
  HMSLocation.FusedLocation.Native.checkLocationSettings(locationSettingsRequest)
    .then(_res => {
      setIsLocationAvailable(_res.locationSettingsStates.isLocationPresent)
    })
    .catch(_error => console.log(_error))
}

const huaweiGetLocation = (setLocation) => {
  HMSLocation.FusedLocation.Native.getLastLocationWithAddress(locationRequest)
    .then((pos) => {
      setLocation(pos);
    })
    .catch((err) => console.log("Error Getting Location", err.message));
}

const huaweiGetLocationByName = (latitude, longitude, setLocation) => {
  const getFromLocationNameRequest = {
    latitude: latitude,
    longitude: longitude,
    maxResults: 3
  }

  HMSLocation.Geocoder.Native.getFromLocation(getFromLocationNameRequest, null)
    .then((hwLocationList) => {
      setLocation(...hwLocationList);
    })
    .catch((err) => console.log(err.message));
}

const huaweiCheckIsLocationAvailable = (setIsLocationAvailable) => {
  HMSLocation.FusedLocation.Native.getLocationAvailability()
    .then((res) => setIsLocationAvailable(res.isLocationAvailable))
    .catch((err) => console.log(err.message));
}

// practice
const huaweiLocationNotification = () => {
  HMSLocation.LocationKit.Native.setNotification({
    contentTitle: "Hello",
    contentText: "You received something",
    defType: "mipmap",
    resourceName: "ic_launcher",
  })
    .then((res) => console.log("Notification set:", res))
    .catch((err) => alert(err.message));
}

const huaweiGetFromLocationName = (locationName, setLocations) => {
  const getFromLocationNameRequest = {
    locationName: locationName,
    maxResults: 20,
    lowerLeftLatitude: 14.52452444161395,
    lowerLeftLongitude: 121.09071455568746,
    upperRightLatitude: 17.40249419246226,
    upperRightLongitude: 121.1473288124462,
  }

  HMSLocation.Geocoder.Native.getFromLocationName(getFromLocationNameRequest, null)
    .then((hwLocationList) => {
      let tempDb = []
      hwLocationList.map(item => {
        tempDb.push(item);
      })

      setLocations(tempDb);
      // console.log(JSON.stringify(hwLocationList, null, 3))
      // console.log(...hwLocationList)
    })
    .catch((err) => console.log(err.message));
}


export {
  huaweiLocationInitialize, huaweiLocationCheckSettings, huaweiRequestLocationPermission, huaweiGetLocation,
  huaweiRequestLocationUpdatesWithCallback, huaweiGetLocationByName, huaweiCheckIsLocationAvailable,
  huaweiLocationNotification, huaweiGetFromLocationName
}