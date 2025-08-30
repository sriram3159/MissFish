import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import FeatherIcon from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapPin from 'react-native-vector-icons/FontAwesome6';
import CompassHeading from 'react-native-compass-heading';
import images from '../../image/images';
import { SF, SH, SW } from '../../utils/dimensions';
import { postRequest } from '../../services/apiService';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useGlobalContext } from '../../contexts/globalContext';

const fromLocation = {
  latitude: 8.094902240100733,
  longitude: 77.48392429159924,
};
// const fromLocation = {
//   latitude: 12.991345,
//   longitude: 77.555958,
// };

// const location = {
//   latitude: 12.950771,
//   longitude: 77.584236,
// };

const Map = ({
  distance,
  setDistance,
  duration,
  setDuration,
  location,
  status,
  orderId,
}) => {
  const { location: gpsLocation } = useGlobalContext();
  const mapRef = useRef(null);

  const [heading, setHeading] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [showNavigateBtn, setShowNavigateBtn] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasUserNavigated, setHasUserNavigated] = useState(false);
  const locationData = useMemo(() => {
    if (status === 'Order is Picked Up') {
      return gpsLocation || fromLocation; // fallback
    }
    return fromLocation;
  }, [status, gpsLocation]);
  useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({ heading }) => {
      setHeading(heading); // updates heading state
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  // useEffect(() => {
  //   let watchId;

  //   if (status === 'Order is Picked Up') {
  //     const watchUserLocation = async () => {
  //       if (Platform.OS === 'android') {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         );
  //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //           console.warn('Location permission denied');
  //           return;
  //         }
  //       }

  //       Geolocation.getCurrentPosition(
  //         pos => {
  //           setOrigin({
  //             latitude: pos.coords?.latitude,
  //             longitude: pos.coords?.longitude,
  //           });
  //         },
  //         err => console.log('Error getting current pos:', err),
  //         {
  //           enableHighAccuracy: false, // 👈 fast, uses WiFi/Cell
  //           timeout: 5000,
  //           maximumAge: 10000, // allow cached location
  //         },
  //       );

  //       // Then immediately start a high-accuracy watcher
  //       watchId = Geolocation.watchPosition(
  //         position => {
  //           const { latitude, longitude } = position.coords;
  //           setOrigin({ latitude, longitude });
  //         },
  //         error => console.error('Watch error:', error),
  //         {
  //           enableHighAccuracy: true,
  //           distanceFilter: 0,
  //           interval: 1000,
  //           fastestInterval: 1000,
  //           forceRequestLocation: true,
  //           showLocationDialog: true,
  //         },
  //       );
  //     };

  //     watchUserLocation();
  //   }

  //   return () => {
  //     if (watchId) Geolocation.clearWatch(watchId);
  //   };
  // }, [status]);

  useEffect(() => {
    if (status === 'Order is Picked Up') {
      mapRef.current?.animateToRegion(
        {
          latitude: gpsLocation?.latitude,
          longitude: gpsLocation?.longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        },
        1000, // animation duration
      );
    }
  }, [status, gpsLocation]);

  const handleDirectionsReady = useCallback(
    result => {
      setDistance(result.distance);
      setDuration(result.duration);
      setRouteCoords(result.coordinates);

      if (!isNavigating && !hasUserNavigated) {
        mapRef.current?.fitToCoordinates(result.coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    },
    [isNavigating, status],
  );

  useEffect(() => {
    if (isNavigating) {
      const timeout = setTimeout(() => setIsNavigating(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isNavigating]);
  return (
    <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
      <View style={styles.container}>
        {fromLocation && location ? (
          <>
            <MapView
              showsMyLocationButton={false}
              showsTraffic={false}
              showsIndoors={false}
              showsBuildings={false}
              showsCompass={false}
              toolbarEnabled={false}
              loadingEnabled={true}
              loadingIndicatorColor="#666"
              loadingBackgroundColor="#f2f2f2"
              ref={mapRef}
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={false}
              initialRegion={{
                latitude: fromLocation?.latitude,
                longitude: fromLocation?.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              onRegionChangeComplete={region => {
                const { latitudeDelta, longitudeDelta } = region;
                if (latitudeDelta > 0.006 || longitudeDelta > 0.006) {
                  setShowNavigateBtn(true);
                } else {
                  setShowNavigateBtn(false);
                }
              }}
            >
              <Marker coordinate={fromLocation} anchor={{ x: 0.5, y: 0.5 }}>
                <View style={styles.markerWrapper}>
                  <MapPin name="location-pin" size={30} color="#4285F4" />
                  <Entypo
                    name="shop"
                    size={14}
                    color="#fff"
                    style={styles.innerHomeIcon}
                  />
                </View>
              </Marker>

              {gpsLocation && status === 'Order is Picked Up' && (
                <Marker
                  coordinate={gpsLocation}
                  anchor={{ x: 0.5, y: 0.5 }}
                  flat
                  rotation={status === 'Order is Picked Up' ? heading : 0}
                >
                  <Image
                    source={images.bike}
                    resizeMode="contain"
                    style={{
                      height: SF(35),
                      width: SF(45),
                      transform: [{ rotate: '-60deg' }],
                    }}
                  />
                </Marker>
              )}

              <Marker coordinate={location} anchor={{ x: 0.5, y: 1 }}>
                <View style={styles.markerWrapper}>
                  <MapPin name="location-pin" size={30} color="#4285F4" />
                  <FeatherIcon
                    name="home"
                    size={14}
                    color="#fff"
                    style={styles.innerHomeIcon}
                  />
                </View>
              </Marker>

              {status === 'Order is Picked Up' && gpsLocation && (
                <MapViewDirections
                  origin={fromLocation}
                  destination={gpsLocation}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={2}
                  strokeColor={
                    status === 'Order is Picked Up' ? 'black' : '#4285F4'
                  } // gray if moving, blue if static
                  mode="DRIVING"
                />
              )}

              {status === 'Order is Picked Up' && gpsLocation && (
                <MapViewDirections
                  origin={gpsLocation}
                  destination={location}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={2}
                  strokeColor="#4285F4"
                  mode="DRIVING"
                  optimizeWaypoints={true}
                  onReady={handleDirectionsReady}
                />
              )}
              {/* 👇 THIS IS THE NEW ONE: fromLocation → location when NOT Order is Picked Up */}
              {status !== 'Order is Picked Up' && (
                <MapViewDirections
                  origin={fromLocation}
                  destination={location}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={2}
                  strokeColor="#4285F4"
                  mode="DRIVING"
                  optimizeWaypoints={true}
                  onReady={handleDirectionsReady}
                />
              )}
            </MapView>
          </>
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
              Fetching your location...
            </Text>
          </View>
        )}
        {gpsLocation && showNavigateBtn && status === 'Order is Picked Up' && (
          <View
            style={{
              position: 'absolute',
              bottom: SH(45),
              right: SW(8),
              zIndex: 100,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsNavigating(true);
                setHasUserNavigated(true);
                mapRef.current.animateToRegion(
                  {
                    latitude: gpsLocation?.latitude,
                    longitude: gpsLocation?.longitude,
                    latitudeDelta: 0.0035,
                    longitudeDelta: 0.0035,
                  },
                  1000,
                );
              }}
              style={styles.navigateBtnWrapper}
            >
              <Icon
                name="navigate"
                size={SF(16)}
                color={'rgba(255, 255, 255, 1)'}
              />
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 1)',
                  fontWeight: 600,
                  fontSize: SF(19),
                }}
              >
                Navigate
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
  mapStyle: {
    flex: 1,
  },
  infoBox: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    borderRadius: 10,
    zIndex: 100,
    elevation: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  innerHomeIcon: {
    position: 'absolute',
    top: 6, // Adjust to center inside pin visually
    alignSelf: 'center',
    zIndex: 2,
  },
  navigateBtnWrapper: {
    backgroundColor: 'rgba(255, 89, 99, 1)',
    paddingHorizontal: SW(12),
    paddingVertical: SH(10),
    borderRadius: SF(45),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SW(8),
  },
});
