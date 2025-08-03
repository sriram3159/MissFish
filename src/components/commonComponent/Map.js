import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Button,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import FeatherIcon from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapPin from 'react-native-vector-icons/FontAwesome6';
import CompassHeading from 'react-native-compass-heading';
import { SH } from '../../utils/dimensions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAY2dJykSYpx-o7UgVHP5X_CfyyPm-UvOY';
const fromLocation = {
  latitude: 8.094902240100733,
  longitude: 77.48392429159924,
};
// const NAGERCOIL = { latitude: 8.172, longitude: 77.434 };

const Map = ({ distance, setDistance, duration, setDuration, location }) => {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);

  const [heading, setHeading] = useState(null);

  useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({ heading }) => {
      setHeading(heading); // updates heading state
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Current GPS:', latitude, longitude);
          setOrigin({ latitude, longitude });
        },
        error => {
          console.log('Geolocation error:', JSON.stringify(error));
          alert(`Please turn on the location`);
        },
        {
          enableHighAccuracy: false, // false uses network/wifi instead of GPS
          timeout: 10000, // wait max 10s
          maximumAge: 1000,
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  const handleDirectionsReady = useCallback(result => {
    setDistance(result.distance);
    setDuration(result.duration);

    mapRef.current?.fitToCoordinates(result.coordinates, {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
      animated: true,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {fromLocation ? (
          <>
            <MapView
              ref={mapRef}
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={false}
              region={{
                latitude: fromLocation.latitude,
                longitude: fromLocation.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
            >
              <Marker
                coordinate={fromLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat
                rotation={heading}
              >
                <Ionicons name="send" size={23} color="#4285F4" />
              </Marker>

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

              <MapViewDirections
                origin={fromLocation}
                destination={location}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={2}
                strokeColor="#4285F4"
                mode="DRIVING"
                onReady={handleDirectionsReady}
                onError={error => console.log('Directions error:', error)}
              />
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
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
});
