import React from 'react'
import HMSMapView, { MapTypes, HMSMarkerView } from '@hmscore/react-native-hms-map'

const HuaweiMapComp = ({ latitude, longitude, height }) => {
  return (
    <HMSMapView
      style={{ height: height, width: '100%' }}
      camera={{
        target: { latitude: latitude || 0, longitude: longitude || 0 },
        zoom: 17,
        bearing: 5,
      }}
      useAnimation={true}
      animationDuration={2000}
      mapType={MapTypes.NORMAL}
      scrollGesturesEnabled={true}
      buildingsEnabled={true}
      trafficEnabled={true}
      pointToCenter={{ x: 10, y: 10 }}
    >
      <HMSMarkerView coordinate={{ latitude: latitude || 0, longitude: longitude || 0 }} />
    </HMSMapView>
  )
}

export default HuaweiMapComp