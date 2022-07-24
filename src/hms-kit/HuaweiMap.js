import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// import HMSMap, { MapTypes, HMSMarkerView, HMSCircleView, PatternItemTypes } from '@hmscore/react-native-hms-map'

const HuaweiMap = () => {
  const latitude = 14.60376489065885;
  const longitude = 121.09556682843996;
  return (
    <HMSMap
      style={{ height: '100%' }}

      camera={{
        target: { latitude: latitude, longitude: longitude },
        zoom: 11,
        bearing: 5,
        tilt: 70,
      }}
      latLngBoundsForCameraTarget={[
        { latitude: 50, longitude: 35 },
        { latitude: 42, longitude: 30 },
      ]}
      useAnimation={true}
      animationDuration={2000}
      compassEnabled={true}
      mapType={MapTypes.NORMAL}
      minZoomPreference={10}
      maxZoomPreference={20}
      rotateGesturesEnabled={true}
      scrollGesturesEnabled={true}
      tiltGesturesEnabled={true}
      zoomControlsEnabled={true}
      zoomGesturesEnabled={true}
      buildingsEnabled={true}
      trafficEnabled={true}
      pointToCenter={{ x: 10, y: 10 }}
      gestureScaleByMapCenter={true}
      markerClusterColor={[255, 230, 130, 0]}
      markerClusterTextColor={[200, 0, 0, 0]}
      markerClusterIcon={{ asset: "ic_launcher.png" }}
      description="Huawei Map"
      mapStyle={
        '[{"mapFeature":"all","options":"labels.icon","paint":{"icon-type":"night"}}]'
      }
      myLocationEnabled={true}
      mapPadding={{ right: 200, left: 10, top: 10, bottom: 10 }}
      markerClustering={true}
      myLocationButtonEnabled={true}
      scrollGesturesEnabledDuringRotateOrZoom={true}
      onCameraUpdateFinished={(e) => console.log("HMSMap onCameraUpdateFinished: ", e.nativeEvent)}
      onCameraUpdateCanceled={(e) => console.log("HMSMap onCameraUpdateCanceled: ", e.nativeEvent)}
      onCameraIdle={(e) => console.log("HMSMap onCameraIdle: ", e.nativeEvent)}
      onMapReady={(e) => console.log("HMSMap onMapReady: ", e.nativeEvent)}
      onCameraMoveCanceled={(e) => console.log("HMSMap onCameraMoveCanceled: ", e.nativeEvent)}
      onCameraMove={(e) => console.log("HMSMap onCameraMove: ", e.nativeEvent)}
      onCameraMoveStarted={(e) => console.log("HMSMap onCameraMoveStarted: ", e.nativeEvent)}
      onMapClick={(e) => console.log("HMSMap onMapClick: ", e.nativeEvent)}
      onMapLoaded={(e) => console.log("HMSMap onMapLoaded: ", e.nativeEvent)}
      onMapLongClick={(e) => console.log("HMSMap onMapLongClick: ", e.nativeEvent)}
      onMyLocationButtonClick={(e) => console.log("HMSMap onMyLocationButtonClick: ", e.nativeEvent)}
      onMyLocationClick={(e) => console.log("HMSMap onMyLocationClick: ", e.nativeEvent)}
      onPoiClick={(e) => console.log("HMSMap onPoiClick: ", e.nativeEvent)}
      onSnapshotReady={(e) => console.log("HMSMap onSnapshotReady: ", e.nativeEvent)}
    >
      <HMSMarkerView // Simple example
        coordinate={{ latitude: latitude, longitude: longitude }}
        title="Hello Huawei Map"
        snippet="This is a snippet!"
      />
      <HMSCircleView // Simple example
        center={{ latitude: latitude, longitude: longitude }}
        radius={9000}
      />
      <HMSCircleView // Complex example
        center={{ latitude: latitude, longitude: longitude }}
        radius={9000}
        clickable={true}
        fillColor={[144, 0, 114, 255]} // transparent blue(0x900072FF)
        strokeWidth={10}
        strokeColor={-256} // yellow(0xFFFFFF00)
        strokePattern={[
          { type: PatternItemTypes.DASH, length: 20 },
          { type: PatternItemTypes.DOT },
          { type: PatternItemTypes.GAP, length: 20 },
        ]}
        visible={true}
        zIndex={2}
        onClick={(e) => console.log("HMSCircle onClick: ", e.nativeEvent)}
      />
    </HMSMap>
  )
}

export default HuaweiMap

const styles = StyleSheet.create({})