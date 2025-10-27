// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import FeatherIcon from 'react-native-vector-icons/Foundation';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MapPin from 'react-native-vector-icons/FontAwesome6';
// import CompassHeading from 'react-native-compass-heading';
// import images from '../../image/images';
// import { SF, SH, SW } from '../../utils/dimensions';
// import { GOOGLE_MAPS_APIKEY } from '@env';
// import { useGlobalContext } from '../../contexts/globalContext';

// // Shop location (origin)
// const fromLocation = {
//   latitude: 8.094902240100733,
//   longitude: 77.48392429159924,
// };

// function debounce(func, delay) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), delay);
//   };
// }

// function getDistanceFromLatLonInMeter(pos1, pos2) {
//   if (!pos1 || !pos2) return 0;
//   const R = 6371000;
//   const dLat = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
//   const dLon = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((pos1.latitude * Math.PI) / 180) *
//       Math.cos((pos2.latitude * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function getBearing(start, end) {
//   if (!start || !end) return 0;
//   const lat1 = (start.latitude * Math.PI) / 180;
//   const lon1 = (start.longitude * Math.PI) / 180;
//   const lat2 = (end.latitude * Math.PI) / 180;
//   const lon2 = (end.longitude * Math.PI) / 180;

//   const dLon = lon2 - lon1;
//   const y = Math.sin(dLon) * Math.cos(lat2);
//   const x =
//     Math.cos(lat1) * Math.sin(lat2) -
//     Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

//   const brng = Math.atan2(y, x);
//   return ((brng * 180) / Math.PI + 360) % 360; // convert to degrees
// }

// const Map = ({
//   distance,
//   setDistance,
//   duration,
//   setDuration,
//   location,
//   status,
//   orderId,
// }) => {
//   const { location: gpsLocation } = useGlobalContext();
//   const mapRef = useRef(null);

//   const [heading, setHeading] = useState(0);

//   // NAVIGATION STATE TRACKING
//   const [showNavigateBtn, setShowNavigateBtn] = useState(true); // Show on mount
//   const [showRecenter, setShowRecenter] = useState(false);
//   const [hasNavigated, setHasNavigated] = useState(false);
//   const [lastRouteOrigin, setLastRouteOrigin] = useState(gpsLocation);
//   const [mapReady, setMapReady] = useState(false);
//   const [prevGps, setPrevGps] = useState(null);
//   const [bearing, setBearing] = useState(0);
//   // Compass heading for bike marker rotation
//   useEffect(() => {
//     CompassHeading.start(3, ({ heading }) => setHeading(heading));
//     return () => CompassHeading.stop();
//   }, []);

//   // On mount, show navigate button, hide recenter
//   useEffect(() => {
//     setShowNavigateBtn(true);
//     setShowRecenter(false);
//     setHasNavigated(false);
//   }, []);

//   useEffect(() => {
//     if (prevGps && gpsLocation) {
//       setBearing(getBearing(prevGps, gpsLocation));
//     }
//     if (gpsLocation) {
//       setPrevGps(gpsLocation);
//     }
//   }, [gpsLocation]);

//   // When GPS location changes, only update route origin if moved > 20m
//   useEffect(() => {
//     if (
//       gpsLocation &&
//       location &&
//       (!lastRouteOrigin ||
//         getDistanceFromLatLonInMeter(gpsLocation, lastRouteOrigin) > 20)
//     ) {
//       setLastRouteOrigin(gpsLocation);
//     }
//   }, [gpsLocation, location]);
//   useEffect(() => {
//     if (
//       status === 'Order is Picked Up' &&
//       !hasNavigated &&
//       mapReady &&
//       fromLocation &&
//       location &&
//       gpsLocation
//     ) {
//       mapRef.current?.fitToCoordinates([fromLocation, location, gpsLocation], {
//         edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
//         animated: true,
//       });
//     } else {
//       if (!hasNavigated) {
//         mapRef.current?.fitToCoordinates([fromLocation, location], {
//           edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
//           animated: true,
//         });
//       }
//     }
//   }, [mapReady, fromLocation, location, gpsLocation, hasNavigated]);

//   const handleNavigate = () => {
//     if (gpsLocation && mapRef.current) {
//       setHasNavigated(true);
//       setShowNavigateBtn(false);
//       mapRef.current.animateToRegion(
//         {
//           latitude: gpsLocation.latitude,
//           longitude: gpsLocation.longitude,
//           latitudeDelta: DEFAULT_DELTA,
//           longitudeDelta: DEFAULT_DELTA,
//         },
//         1000,
//       );
//     }
//   };

//   // RECENTER HANDLER
//   const handleRecenter = () => {
//     if (gpsLocation && mapRef.current) {
//       // setHasNavigated(false); // Reset so Navigate shows again
//       // setShowNavigateBtn(true);
//       setShowRecenter(false);
//       mapRef.current.animateToRegion(
//         {
//           latitude: gpsLocation.latitude,
//           longitude: gpsLocation.longitude,
//           latitudeDelta: DEFAULT_DELTA,
//           longitudeDelta: DEFAULT_DELTA,
//         },
//         500,
//       );
//     }
//   };

//   // Directions callback
//   const handleDirectionsReady = useCallback(
//     result => {
//       setDistance?.(result.distance);
//       setDuration?.(result.duration);
//     },
//     [setDistance, setDuration],
//   );
//   const DEFAULT_DELTA = 0.0035; // your default zoom
//   const MARGIN_FACTOR = 0.1; // 10% margin

//   useEffect(() => {
//     if (status === 'Order is Picked Up' && hasNavigated && gpsLocation) {
//       mapRef.current?.animateCamera(
//         {
//           center: {
//             latitude: gpsLocation.latitude,
//             longitude: gpsLocation.longitude,
//           },
//           pitch: 0,x
//           heading: 0,
//           zoom: 17.5, // keep zoom level fixed
//         },
//         { duration: 1000 },
//       ); // smooth animation
//     }
//   }, [gpsLocation, status, hasNavigated]);

//   const handleRegionChange = useCallback(
//     debounce(region => {
//       if (!gpsLocation) return;

//       const marginLat = region.latitudeDelta * MARGIN_FACTOR;
//       const marginLon = region.longitudeDelta * MARGIN_FACTOR;

//       // "Safe" box excluding margin
//       const latMin = region.latitude - region.latitudeDelta / 2 + marginLat;
//       const latMax = region.latitude + region.latitudeDelta / 2 - marginLat;
//       const lonMin = region.longitude - region.longitudeDelta / 2 + marginLon;
//       const lonMax = region.longitude + region.longitudeDelta / 2 - marginLon;

//       const bikeVisible =
//         gpsLocation.latitude >= latMin &&
//         gpsLocation.latitude <= latMax &&
//         gpsLocation.longitude >= lonMin &&
//         gpsLocation.longitude <= lonMax;

//       const isDefaultZoom =
//         Math.abs(region.latitudeDelta - DEFAULT_DELTA) < DEFAULT_DELTA * 0.2 &&
//         Math.abs(region.longitudeDelta - DEFAULT_DELTA) < DEFAULT_DELTA * 0.2;

//       if (!showNavigateBtn) {
//         if (!bikeVisible || !isDefaultZoom) {
//           setShowRecenter(true);
//           setShowNavigateBtn(false);
//         } else {
//           setShowRecenter(false);
//           setShowNavigateBtn(false);
//         }
//       }
//     }, 300),
//     [gpsLocation, showNavigateBtn],
//   );

//   // Info Box for delivery
//   const InfoBox = () =>
//     distance && duration ? (
//       <View style={styles.infoBox}>
//         <Text style={styles.infoText}>
//           Distance: {distance.toFixed(2)} km | ETA: {Math.round(duration)} min
//         </Text>
//       </View>
//     ) : null;

//   // Markers
//   const ShopMarker = () => (
//     <Marker coordinate={fromLocation} anchor={{ x: 0.5, y: 0.5 }}>
//       <View style={styles.markerWrapper}>
//         <MapPin name="location-pin" size={30} color="#4285F4" />
//         <Entypo
//           name="shop"
//           size={14}
//           color="#fff"
//           style={styles.innerHomeIcon}
//         />
//       </View>
//     </Marker>
//   );
//   const DestinationMarker = () => (
//     <Marker coordinate={location} anchor={{ x: 0.5, y: 1 }}>
//       <View style={styles.markerWrapper}>
//         <MapPin name="location-pin" size={30} color="#4285F4" />
//         <FeatherIcon
//           name="home"
//           size={14}
//           color="#fff"
//           style={styles.innerHomeIcon}
//         />
//       </View>
//     </Marker>
//   );
//   const BikeMarker = () => (
//     <Marker
//       coordinate={gpsLocation}
//       anchor={{ x: 0.5, y: 0.5 }}
//       flat
//       rotation={bearing || heading}
//     >
//       <Image
//         source={images.bike}
//         resizeMode="contain"
//         style={{
//           height: SF(35),
//           width: SF(45),
//           transform: [{ rotate: '-60deg' }],
//         }}
//       />
//     </Marker>
//   );

//   // Loader status
//   const showLoader = !location;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         {showLoader ? (
//           <View style={styles.loader}>
//             <ActivityIndicator size="large" color="#007AFF" />
//             <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
//               Fetching destination location...
//             </Text>
//           </View>
//         ) : (
//           <>
//             <MapView
//               ref={mapRef}
//               style={styles.mapStyle}
//               provider={PROVIDER_GOOGLE}
//               showsUserLocation={false}
//               onMapReady={() => setMapReady(true)}
//               initialRegion={{
//                 latitude: fromLocation.latitude,
//                 longitude: fromLocation.longitude,
//                 latitudeDelta: DEFAULT_DELTA,
//                 longitudeDelta: DEFAULT_DELTA,
//               }}
//               onRegionChangeComplete={handleRegionChange}
//               showsTraffic={true}
//               showsBuildings={true}
//               showsIndoors={true}
//               toolbarEnabled={true}
//             >
//               <ShopMarker />
//               <DestinationMarker />
//               {status === 'Order is Picked Up' && gpsLocation && (
//                 <>
//                   {/* Bike marker */}
//                   <BikeMarker />

//                   {/* Path: shop → bike (black) */}
//                   <MapViewDirections
//                     origin={fromLocation}
//                     destination={gpsLocation}
//                     apikey={GOOGLE_MAPS_APIKEY}
//                     strokeWidth={3}
//                     strokeColor="black"
//                     mode="DRIVING"
//                   />

//                   {/* Path: bike → destination (blue) */}
//                   <MapViewDirections
//                     origin={lastRouteOrigin || gpsLocation}
//                     destination={location}
//                     apikey={GOOGLE_MAPS_APIKEY}
//                     strokeWidth={3}
//                     strokeColor="#4285F4"
//                     mode="DRIVING"
//                     optimizeWaypoints={true}
//                     onReady={handleDirectionsReady}
//                   />
//                 </>
//               )}
//               {/* Before pickup → shop → destination (blue) */}
//               {status !== 'Order is Picked Up' && (
//                 <MapViewDirections
//                   origin={fromLocation}
//                   destination={location}
//                   apikey={GOOGLE_MAPS_APIKEY}
//                   strokeWidth={3}
//                   strokeColor="#4285F4"
//                   mode="DRIVING"
//                   optimizeWaypoints={true}
//                   onReady={handleDirectionsReady}
//                 />
//               )}
//             </MapView>
//             {/* Info Box */}
//             {/* <InfoBox /> */}
//             {/* Navigate Button (shown initially, hidden after navigation, shown again after recenter) */}
//             {status === 'Order is Picked Up' &&
//               gpsLocation &&
//               showNavigateBtn && (
//                 <TouchableOpacity
//                   style={styles.navigateBtnWrapper}
//                   onPress={handleNavigate}
//                 >
//                   <Icon name="navigate" size={SF(16)} color={'#fff'} />
//                   <Text
//                     style={{
//                       color: '#fff',
//                       fontWeight: '600',
//                       fontSize: SF(19),
//                     }}
//                   >
//                     Navigate
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             {/* Recenter Button (when bike marker not visible, and user has navigated) */}
//             {gpsLocation && showRecenter && (
//               <TouchableOpacity
//                 style={styles.recenterBtn}
//                 onPress={handleRecenter}
//               >
//                 <Icon name="locate" size={28} color="#fff" />
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Map;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     overflow: 'visible',
//   },
//   mapStyle: {
//     flex: 1,
//   },
//   infoBox: {
//     position: 'absolute',
//     top: SH(18),
//     left: SW(18),
//     right: SW(18),
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 12,
//     borderRadius: 10,
//     zIndex: 100,
//     elevation: 5,
//     alignItems: 'center',
//   },
//   infoText: {
//     color: 'white',
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   markerWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   innerHomeIcon: {
//     position: 'absolute',
//     top: 6,
//     alignSelf: 'center',
//     zIndex: 2,
//   },
//   navigateBtnWrapper: {
//     position: 'absolute',
//     bottom: SH(45),
//     right: SW(18),
//     backgroundColor: '#4285F4',
//     paddingHorizontal: SW(18),
//     paddingVertical: SH(12),
//     borderRadius: SF(45),
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 101,
//     elevation: 5,
//     gap: SW(10),
//   },
//   recenterBtn: {
//     position: 'absolute',
//     bottom: SH(40),
//     right: SW(20),
//     backgroundColor: '#4285F4',
//     padding: 16,
//     borderRadius: 32,
//     elevation: 3,
//     zIndex: 100,
//   },
// });

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
// } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import FeatherIcon from 'react-native-vector-icons/Foundation';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MapPin from 'react-native-vector-icons/FontAwesome6';
// import CompassHeading from 'react-native-compass-heading';
// import images from '../../image/images';
// import { SF, SH, SW } from '../../utils/dimensions';
// import { GOOGLE_MAPS_APIKEY } from '@env';
// import { useGlobalContext } from '../../contexts/globalContext';
// import { Polyline } from 'react-native-maps';
// import debounce from 'lodash.debounce';

// // Shop location (origin)
// const fromLocation = {
//   latitude: 8.094902240100733,
//   longitude: 77.48392429159924,
// };

// function getDistanceFromLatLonInMeter(pos1, pos2) {
//   if (!pos1 || !pos2) return 0;
//   const R = 6371000;
//   const dLat = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
//   const dLon = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((pos1.latitude * Math.PI) / 180) *
//       Math.cos((pos2.latitude * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function getBearing(start, end) {
//   if (!start || !end) return 0;
//   const lat1 = (start.latitude * Math.PI) / 180;
//   const lon1 = (start.longitude * Math.PI) / 180;
//   const lat2 = (end.latitude * Math.PI) / 180;
//   const lon2 = (end.longitude * Math.PI) / 180;

//   const dLon = lon2 - lon1;
//   const y = Math.sin(dLon) * Math.cos(lat2);
//   const x =
//     Math.cos(lat1) * Math.sin(lat2) -
//     Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

//   const brng = Math.atan2(y, x);
//   return ((brng * 180) / Math.PI + 360) % 360; // convert to degrees
// }

// const Map = ({
//   distance,
//   setDistance,
//   duration,
//   setDuration,
//   location,
//   status,
//   orderId,
// }) => {
//   const { location: gpsLocation } = useGlobalContext();
//   const mapRef = useRef(null);
//   console.log(gpsLocation);

//   const [heading, setHeading] = useState(0);

//   // NAVIGATION STATE TRACKING
//   const [showNavigateBtn, setShowNavigateBtn] = useState(true); // Show on mount
//   const [showRecenter, setShowRecenter] = useState(false);
//   const [hasNavigated, setHasNavigated] = useState(false);
//   const [lastRouteOrigin, setLastRouteOrigin] = useState(gpsLocation);
//   const [mapReady, setMapReady] = useState(false);
//   const [prevGps, setPrevGps] = useState(null);
//   const [bearing, setBearing] = useState(0);

//   // Compass heading for bike marker rotation
//   useEffect(() => {
//     CompassHeading.start(3, ({ heading }) => setHeading(heading));
//     return () => CompassHeading.stop();
//   }, []);

//   // On mount, show navigate button, hide recenter
//   useEffect(() => {
//     setShowNavigateBtn(true);
//     setShowRecenter(false);
//     setHasNavigated(false);
//   }, []);

//   useEffect(() => {
//     if (prevGps && gpsLocation) {
//       const dist = getDistanceFromLatLonInMeter(prevGps, gpsLocation);
//       if (dist > 8) {
//         setBearing(getBearing(prevGps, gpsLocation));
//         setPrevGps(gpsLocation);
//       }
//     } else if (gpsLocation) {
//       setPrevGps(gpsLocation);
//     }
//   }, [gpsLocation]);

//   // When GPS location changes, only update route origin if moved > 20m
//   useEffect(() => {
//     if (
//       gpsLocation &&
//       location &&
//       (!lastRouteOrigin ||
//         getDistanceFromLatLonInMeter(gpsLocation, lastRouteOrigin) > 20)
//     ) {
//       setLastRouteOrigin(gpsLocation);
//     }
//   }, [gpsLocation, location]);

//   useEffect(() => {
//     if (
//       status === 'Order is Picked Up' &&
//       !hasNavigated &&
//       mapReady &&
//       fromLocation &&
//       location &&
//       gpsLocation
//     ) {
//       mapRef.current?.fitToCoordinates([fromLocation, location, gpsLocation], {
//         edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
//         animated: true,
//       });
//     } else {
//       if (!hasNavigated) {
//         mapRef.current?.fitToCoordinates([fromLocation, location], {
//           edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
//           animated: true,
//         });
//       }
//     }
//   }, [mapReady, fromLocation, location, gpsLocation, hasNavigated]);

//   const DEFAULT_DELTA = 0.005; // or adjust based on zoom you want
//   const NAVIGATE_DELTA = 0.005; // keep same as DEFAULT to avoid mismatch

//   const handleNavigate = () => {
//     if (gpsLocation && mapRef.current) {
//       setShowRecenter(false);
//       setShowNavigateBtn(false);
//       setHasNavigated(true); // ✅ so camera follows after
//       mapRef.current.animateToRegion(
//         {
//           latitude: gpsLocation.latitude,
//           longitude: gpsLocation.longitude,
//           latitudeDelta: NAVIGATE_DELTA,
//           longitudeDelta: NAVIGATE_DELTA,
//         },
//         500,
//       );
//     }
//   };

//   const handleRecenter = () => {
//     if (gpsLocation && mapRef.current) {
//       setShowRecenter(false);
//       mapRef.current.animateToRegion(
//         {
//           latitude: gpsLocation.latitude,
//           longitude: gpsLocation.longitude,
//           latitudeDelta: NAVIGATE_DELTA, // ✅ same
//           longitudeDelta: NAVIGATE_DELTA, // ✅ same
//         },
//         500,
//       );
//     }
//   };

//   const [coordsShopToGps, setCoordsShopToGps] = useState([]);
//   const [coordsGpsToDest, setCoordsGpsToDest] = useState([]);
//   const handleDirectionsReady = useCallback(
//     result => {
//       setDistance?.(result.distance);
//       setDuration?.(result.duration);
//       if (gpsLocation && result.coordinates?.length) {
//         let minDist = Infinity;
//         let splitIndex = 0;
//         result.coordinates.forEach((point, i) => {
//           const dist = getDistanceFromLatLonInMeter(point, gpsLocation);
//           if (dist < minDist) {
//             minDist = dist;
//             splitIndex = i;
//           }
//         });
//         if (splitIndex <= 0) {
//           setCoordsShopToGps([result.coordinates[0], gpsLocation]);
//           setCoordsGpsToDest(result.coordinates);
//         } else if (splitIndex >= result.coordinates.length - 1) {
//           setCoordsShopToGps(result.coordinates);
//           setCoordsGpsToDest([gpsLocation, result.coordinates.at(-1)]);
//         } else {
//           const beforeGps = [
//             ...result.coordinates.slice(0, splitIndex + 1),
//             gpsLocation,
//           ];
//           const afterGps = [
//             gpsLocation,
//             ...result.coordinates.slice(splitIndex),
//           ];
//           setCoordsShopToGps(beforeGps);
//           setCoordsGpsToDest(afterGps);
//         }
//       }
//     },
//     [
//       gpsLocation,
//       setDistance,
//       setDuration,
//       setCoordsShopToGps,
//       setCoordsGpsToDest,
//     ],
//   );
//   const MARGIN_FACTOR = 0.1; // 10% margin

//   // Follow GPS only after navigation
//   useEffect(() => {
//     if (
//       status === 'Order is Picked Up' &&
//       hasNavigated &&
//       gpsLocation &&
//       prevGps &&
//       getDistanceFromLatLonInMeter(prevGps, gpsLocation) > 2
//     ) {
//       mapRef.current?.animateCamera(
//         {
//           center: gpsLocation,
//           zoom: 17.5, // ✅ fixed zoom, smooth follow
//         },
//         { duration: 800 },
//       );
//       setPrevGps(gpsLocation);
//     }
//   }, [gpsLocation, hasNavigated, status]);

//   // inside your Map component
//   const handleRegionChange = useMemo(
//     () =>
//       debounce(region => {
//         if (!gpsLocation) return;

//         const marginLat = region.latitudeDelta * MARGIN_FACTOR;
//         const marginLon = region.longitudeDelta * MARGIN_FACTOR;

//         const latMin = region.latitude - region.latitudeDelta / 2 + marginLat;
//         const latMax = region.latitude + region.latitudeDelta / 2 - marginLat;
//         const lonMin = region.longitude - region.longitudeDelta / 2 + marginLon;
//         const lonMax = region.longitude + region.longitudeDelta / 2 - marginLon;

//         const bikeVisible =
//           gpsLocation.latitude >= latMin &&
//           gpsLocation.latitude <= latMax &&
//           gpsLocation.longitude >= lonMin &&
//           gpsLocation.longitude <= lonMax;

//         const isDefaultZoom =
//           Math.abs(region.latitudeDelta - DEFAULT_DELTA) <
//             DEFAULT_DELTA * 0.2 &&
//           Math.abs(region.longitudeDelta - DEFAULT_DELTA) < DEFAULT_DELTA * 0.2;

//         if (!showNavigateBtn) {
//           if (!bikeVisible || !isDefaultZoom) {
//             setShowRecenter(true);
//             setShowNavigateBtn(false);
//           } else {
//             setShowRecenter(false);
//             setShowNavigateBtn(false);
//           }
//         }
//       }, 300), // 300ms debounce
//     [gpsLocation, showNavigateBtn],
//   );

//   // Info Box for delivery
//   const InfoBox = () =>
//     distance && duration ? (
//       <View style={styles.infoBox}>
//         <Text style={styles.infoText}>
//           Distance: {distance.toFixed(2)} km | ETA: {Math.round(duration)} min
//         </Text>
//       </View>
//     ) : null;

//   const ShopMarker = React.memo(() => (
//     <Marker
//       coordinate={fromLocation}
//       anchor={{ x: 0.5, y: 0.5 }}
//       tracksViewChanges={false}
//     >
//       <View style={styles.markerWrapper}>
//         {/* <MapPin name="location-pin" size={30} color="#4285F4" />
//         <Entypo
//           name="shop"
//           size={14}
//           color="#fff"
//           style={styles.innerHomeIcon}
//         /> */}
//         <Image
//           source={images.shop}
//           resizeMode="contain"
//           style={{
//             height: SF(15),
//             width: SF(15),
//           }}
//         />
//       </View>
//     </Marker>
//   ));

//   const DestinationMarker = React.memo(({ location }) => (
//     <Marker
//       coordinate={location}
//       anchor={{ x: 0.5, y: 1 }}
//       tracksViewChanges={false}
//     >
//       <View style={styles.markerWrapper}>
//         {/* <MapPin name="location-pin" size={30} color="#4285F4" /> */}
//         {/* <FeatherIcon
//           name="home"
//           size={14}
//           color="#fff"
//           style={styles.innerHomeIcon}
//         /> */}
//         <Image
//           source={images.destination}
//           resizeMode="contain"
//           style={{
//             height: SF(15),
//             width: SF(15),
//           }}
//         />
//       </View>
//     </Marker>
//   ));

//   const BikeMarker = React.memo(({ gpsLocation, bearing, heading }) => (
//     <Marker
//       coordinate={gpsLocation}
//       anchor={{ x: 0.5, y: 0.5 }}
//       flat
//       rotation={bearing || heading}
//       tracksViewChanges={false}
//     >
//       <Image
//         source={images.bike}
//         resizeMode="contain"
//         style={{
//           height: SF(35),
//           width: SF(45),
//           transform: [{ rotate: '-60deg' }],
//         }}
//       />
//     </Marker>
//   ));

//   const ShopToGpsPolyline = React.memo(({ coords }) =>
//     coords.length > 1 ? (
//       <Polyline coordinates={coords} strokeWidth={3} strokeColor="gray" />
//     ) : null,
//   );

//   const GpsToDestPolyline = React.memo(({ coords }) =>
//     coords.length > 1 ? (
//       <Polyline coordinates={coords} strokeWidth={3} strokeColor="#4285F4" />
//     ) : null,
//   );

//   // Loader status
//   const showLoader = !location;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         {showLoader ? (
//           <View style={styles.loader}>
//             <ActivityIndicator size="large" color="#007AFF" />
//             <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
//               Fetching destination location...
//             </Text>
//           </View>
//         ) : (
//           <>
//             <MapView
//               ref={mapRef}
//               style={styles.mapStyle}
//               provider={PROVIDER_GOOGLE}
//               onMapReady={() => setMapReady(true)}
//               initialRegion={{
//                 latitude: fromLocation.latitude,
//                 longitude: fromLocation.longitude,
//                 latitudeDelta: DEFAULT_DELTA,
//                 longitudeDelta: DEFAULT_DELTA,
//               }}
//               onRegionChangeComplete={handleRegionChange}
//               showsTraffic
//               showsBuildings
//               showsIndoors
//               toolbarEnabled
//               showsCompass={true}
//             >
//               <ShopMarker />
//               <DestinationMarker location={location} />

//               {status === 'Order is Picked Up' &&
//               gpsLocation?.latitude &&
//               gpsLocation?.longitude ? (
//                 <>
//                   <BikeMarker
//                     gpsLocation={gpsLocation}
//                     bearing={bearing}
//                     heading={heading}
//                   />

//                   <MapViewDirections
//                     origin={fromLocation}
//                     destination={location}
//                     waypoints={[gpsLocation]}
//                     apikey={GOOGLE_MAPS_APIKEY}
//                     strokeWidth={4}
//                     strokeColor="blue"
//                     optimizeWaypoints={true}
//                     onReady={handleDirectionsReady}
//                     mode="DRIVING"
//                     precision="high"
//                   />

//                   <ShopToGpsPolyline coords={coordsShopToGps} />
//                   <GpsToDestPolyline coords={coordsGpsToDest} />
//                 </>
//               ) : (
//                 <MapViewDirections
//                   origin={fromLocation}
//                   destination={location}
//                   apikey={GOOGLE_MAPS_APIKEY}
//                   strokeWidth={3}
//                   strokeColor="#4285F4"
//                   mode="DRIVING"
//                   optimizeWaypoints={true}
//                   onReady={handleDirectionsReady}
//                   waypoints={[]}
//                   precision="high"
//                 />
//               )}
//             </MapView>

//             {/* Info Box */}
//             {/* <InfoBox /> */}
//             {/* Navigate Button (shown initially, hidden after navigation, shown again after recenter) */}
//             {status === 'Order is Picked Up' &&
//               gpsLocation &&
//               showNavigateBtn && (
//                 <TouchableOpacity
//                   style={styles.navigateBtnWrapper}
//                   onPress={handleNavigate}
//                 >
//                   <Icon name="navigate" size={SF(16)} color={'#fff'} />
//                   <Text
//                     style={{
//                       color: '#fff',
//                       fontWeight: '600',
//                       fontSize: SF(19),
//                     }}
//                   >
//                     Navigate
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             {/* Recenter Button (when bike marker not visible, and user has navigated) */}
//             {gpsLocation && showRecenter && (
//               <TouchableOpacity
//                 style={styles.recenterBtn}
//                 onPress={handleRecenter}
//               >
//                 <Icon name="locate" size={28} color="#fff" />
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default React.memo(Map);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     overflow: 'visible',
//   },
//   mapStyle: {
//     flex: 1,
//   },
//   infoBox: {
//     position: 'absolute',
//     top: SH(18),
//     left: SW(18),
//     right: SW(18),
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 12,
//     borderRadius: 10,
//     zIndex: 100,
//     elevation: 5,
//     alignItems: 'center',
//   },
//   infoText: {
//     color: 'white',
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   markerWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//     padding: SF(6),
//     backgroundColor: 'white',
//     borderColor: '#4285F4',
//     borderWidth: 3,
//     borderRadius: SF(40),
//   },
//   innerHomeIcon: {
//     position: 'absolute',
//     top: 6,
//     alignSelf: 'center',
//     zIndex: 2,
//   },
//   navigateBtnWrapper: {
//     position: 'absolute',
//     bottom: SH(45),
//     right: SW(18),
//     backgroundColor: '#4285F4',
//     paddingHorizontal: SW(18),
//     paddingVertical: SH(12),
//     borderRadius: SF(45),
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 101,
//     elevation: 5,
//     gap: SW(10),
//   },
//   recenterBtn: {
//     position: 'absolute',
//     bottom: SH(40),
//     right: SW(20),
//     backgroundColor: '#4285F4',
//     padding: 16,
//     borderRadius: 32,
//     elevation: 3,
//     zIndex: 100,
//   },
// });

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
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Ionicons';
import CompassHeading from 'react-native-compass-heading';
import images from '../../image/images';
import { SF, SH, SW } from '../../utils/dimensions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useGlobalContext } from '../../contexts/globalContext';
import debounce from 'lodash.debounce';

// ---------- Helpers ----------
function getDistanceFromLatLonInMeter(pos1, pos2) {
  if (!pos1 || !pos2) return 0;
  const R = 6371000;
  const dLat = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
  const dLon = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pos1.latitude * Math.PI) / 180) *
      Math.cos((pos2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getBearing(start, end) {
  if (!start || !end) return 0;
  const lat1 = (start.latitude * Math.PI) / 180;
  const lon1 = (start.longitude * Math.PI) / 180;
  const lat2 = (end.latitude * Math.PI) / 180;
  const lon2 = (end.longitude * Math.PI) / 180;

  const dLon = lon2 - lon1;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const brng = Math.atan2(y, x);
  return ((brng * 180) / Math.PI + 360) % 360; // degrees
}

// ---------- Constants ----------
const DEFAULT_DELTA = 0.005;
const NAVIGATE_DELTA = DEFAULT_DELTA;
const MARGIN_FACTOR = 0.1;

// Shop location (memoized constant)
const FROM_LOCATION_CONST = {
  latitude: 8.094902240100733,
  longitude: 77.48392429159924,
};

// ---------- Child components (memoized) ----------
const ShopMarker = React.memo(({ fromLocation }) => (
  <Marker
    coordinate={fromLocation}
    anchor={{ x: 0.5, y: 0.5 }}
    tracksViewChanges={false}
  >
    <View style={styles.markerWrapper}>
      <Image
        source={images.shop}
        resizeMode="contain"
        style={styles.shopImage}
      />
    </View>
  </Marker>
));

const DestinationMarker = React.memo(({ location }) => (
  <Marker
    coordinate={location}
    anchor={{ x: 0.5, y: 1 }}
    tracksViewChanges={false}
  >
    <View style={styles.markerWrapper}>
      <Image
        source={images.destination}
        resizeMode="contain"
        style={styles.destImage}
      />
    </View>
  </Marker>
));

const BikeMarker = React.memo(({ gpsLocation, rotation }) => (
  <Marker
    coordinate={gpsLocation}
    anchor={{ x: 0.5, y: 0.5 }}
    flat
    rotation={rotation || 0}
    tracksViewChanges={false}
  >
    <Image source={images.bike} resizeMode="contain" style={styles.bikeImage} />
  </Marker>
));

const ShopToGpsPolyline = React.memo(({ coords }) =>
  coords && coords.length > 1 ? (
    <Polyline coordinates={coords} strokeWidth={3} strokeColor="gray" />
  ) : null,
);

const GpsToDestPolyline = React.memo(({ coords }) =>
  coords && coords.length > 1 ? (
    <Polyline coordinates={coords} strokeWidth={3} strokeColor="#4285F4" />
  ) : null,
);

// Directions wrapper to avoid MapViewDirections recalculating unnecessarily
const Directions = React.memo(({ origin, destination, waypoint, onReady }) => {
  // stable waypoints
  const waypoints = useMemo(() => (waypoint ? [waypoint] : []), [waypoint]);

  // create a key that only changes when coords meaningfully change
  const key = `${origin.latitude}-${origin.longitude}-${destination.latitude}-${
    destination.longitude
  }-${waypoint?.latitude ?? 0}-${waypoint?.longitude ?? 0}`;

  return (
    <MapViewDirections
      key={key}
      origin={origin}
      destination={destination}
      waypoints={waypoints}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={Math.max(3, Math.min(4, DEFAULT_DELTA * 1000))} // heuristic, but stable
      strokeColor="#4285F4"
      optimizeWaypoints={true}
      onReady={onReady}
      mode="DRIVING"
      precision="high"
    />
  );
});

// ---------- Main Map component ----------
const Map = ({
  distance,
  setDistance,
  duration,
  setDuration,
  location,
  status,
  orderId,
}) => {
  const { location: gpsLocationFromContext } = useGlobalContext();
  const mapRef = useRef(null);

  // keep a ref of gps location so frequent changes don't force re-renders
  const gpsLocationRef = useRef(gpsLocationFromContext);
  useEffect(() => {
    gpsLocationRef.current = gpsLocationFromContext;
  }, [gpsLocationFromContext]);

  const [heading, setHeading] = useState(0);
  const [showNavigateBtn, setShowNavigateBtn] = useState(true);
  const [showRecenter, setShowRecenter] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [lastRouteOrigin, setLastRouteOrigin] = useState(
    gpsLocationFromContext || null,
  );
  const [mapReady, setMapReady] = useState(false);
  const prevGpsRef = useRef(null);
  const [bearing, setBearing] = useState(0);

  const [coordsShopToGps, setCoordsShopToGps] = useState([]);
  const [coordsGpsToDest, setCoordsGpsToDest] = useState([]);

  // Memoized stable objects for props
  const memoizedFromLocation = useMemo(() => FROM_LOCATION_CONST, []);
  const memoizedDestination = useMemo(() => location, [location]);

  // Compass (throttled updates)
  useEffect(() => {
    // throttle heading updates to ~500ms
    const throttledSet = debounce(val => {
      setHeading(val);
    }, 500);

    CompassHeading.start(3, ({ heading: h }) => throttledSet(h));
    return () => {
      CompassHeading.stop();
      throttledSet.cancel();
    };
  }, []);

  // update prevGpsRef and bearing when gps changes but avoid re-render spam
  useEffect(() => {
    const gps = gpsLocationRef.current;
    if (!gps) return;
    const prev = prevGpsRef.current;
    if (prev) {
      const dist = getDistanceFromLatLonInMeter(prev, gps);
      if (dist > 8) {
        const br = getBearing(prev, gps);
        setBearing(br);
        prevGpsRef.current = gps;
      }
    } else {
      prevGpsRef.current = gps;
    }
  }, [gpsLocationFromContext]); // still react to context change but minimal computations

  // Only update lastRouteOrigin when moved > 20 m
  useEffect(() => {
    const gps = gpsLocationRef.current;
    if (!gps || !location) return;
    if (
      !lastRouteOrigin ||
      getDistanceFromLatLonInMeter(gps, lastRouteOrigin) > 20
    ) {
      setLastRouteOrigin(gps);
    }
  }, [gpsLocationFromContext, location]);

  // Fit to coordinates when map is ready or when order picked up first time
  useEffect(() => {
    if (!mapReady || !memoizedDestination) return;
    const gps = gpsLocationRef.current;
    try {
      if (status === 'Order is Picked Up' && !hasNavigated && gps) {
        mapRef.current?.fitToCoordinates(
          [memoizedFromLocation, memoizedDestination, gps],
          {
            edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
            animated: true,
          },
        );
      } else if (!hasNavigated) {
        mapRef.current?.fitToCoordinates(
          [memoizedFromLocation, memoizedDestination],
          {
            edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
            animated: true,
          },
        );
      }
    } catch (e) {
      // safe guard
    }
  }, [mapReady, memoizedDestination, hasNavigated, status]);

  // Throttled animateCamera while following after navigation
  const throttledAnimateCameraRef = useRef(
    debounce(
      loc => {
        if (!mapRef.current) return;
        try {
          mapRef.current.animateCamera(
            {
              center: loc,
              zoom: 17.5,
            },
            { duration: 700 },
          );
        } catch (e) {
          // ignore
        }
      },
      1000,
      { leading: true, trailing: false },
    ),
  );

  useEffect(() => {
    if (
      status === 'Order is Picked Up' &&
      hasNavigated &&
      gpsLocationRef.current &&
      prevGpsRef.current &&
      getDistanceFromLatLonInMeter(prevGpsRef.current, gpsLocationRef.current) >
        2
    ) {
      throttledAnimateCameraRef.current(gpsLocationRef.current);
      prevGpsRef.current = gpsLocationRef.current;
    }
  }, [gpsLocationFromContext, hasNavigated, status]);

  // Debounced directions ready handler (stable reference)
  const directionsReadyRef = useRef();
  useEffect(() => {
    directionsReadyRef.current = debounce(result => {
      // result: { distance, duration, coordinates }
      if (!result) return;
      setDistance?.(result.distance);
      setDuration?.(result.duration);

      const gps = gpsLocationRef.current;
      if (
        gps &&
        Array.isArray(result.coordinates) &&
        result.coordinates.length
      ) {
        let minDist = Infinity;
        let splitIndex = 0;
        result.coordinates.forEach((point, i) => {
          const dist = getDistanceFromLatLonInMeter(point, gps);
          if (dist < minDist) {
            minDist = dist;
            splitIndex = i;
          }
        });

        if (splitIndex <= 0) {
          setCoordsShopToGps([result.coordinates[0], gps]);
          setCoordsGpsToDest(result.coordinates);
        } else if (splitIndex >= result.coordinates.length - 1) {
          setCoordsShopToGps(result.coordinates);
          setCoordsGpsToDest([gps, result.coordinates.at(-1)]);
        } else {
          const beforeGps = [
            ...result.coordinates.slice(0, splitIndex + 1),
            gps,
          ];
          const afterGps = [gps, ...result.coordinates.slice(splitIndex)];
          setCoordsShopToGps(beforeGps);
          setCoordsGpsToDest(afterGps);
        }
      }
    }, 700);

    return () => {
      directionsReadyRef.current && directionsReadyRef.current.cancel();
    };
  }, [setDistance, setDuration]);

  // region change handler (debounced) - uses gpsRef for visibility checks
  const handleRegionChange = useMemo(
    () =>
      debounce(region => {
        const gps = gpsLocationRef.current;
        if (!gps || !region) return;

        const marginLat = region.latitudeDelta * MARGIN_FACTOR;
        const marginLon = region.longitudeDelta * MARGIN_FACTOR;

        const latMin = region.latitude - region.latitudeDelta / 2 + marginLat;
        const latMax = region.latitude + region.latitudeDelta / 2 - marginLat;
        const lonMin = region.longitude - region.longitudeDelta / 2 + marginLon;
        const lonMax = region.longitude + region.longitudeDelta / 2 - marginLon;

        const bikeVisible =
          gps.latitude >= latMin &&
          gps.latitude <= latMax &&
          gps.longitude >= lonMin &&
          gps.longitude <= lonMax;

        const isDefaultZoom =
          Math.abs(region.latitudeDelta - DEFAULT_DELTA) <
            DEFAULT_DELTA * 0.2 &&
          Math.abs(region.longitudeDelta - DEFAULT_DELTA) < DEFAULT_DELTA * 0.2;

        if (!showNavigateBtn) {
          if (!bikeVisible || !isDefaultZoom) {
            setShowRecenter(true);
            setShowNavigateBtn(false);
          } else {
            setShowRecenter(false);
            setShowNavigateBtn(false);
          }
        }
      }, 300),
    [showNavigateBtn],
  );

  // Navigate button handler (memoized)
  const handleNavigate = useCallback(() => {
    const gps = gpsLocationRef.current;
    if (gps && mapRef.current) {
      setShowRecenter(false);
      setShowNavigateBtn(false);
      setHasNavigated(true);
      try {
        mapRef.current.animateToRegion(
          {
            latitude: gps.latitude,
            longitude: gps.longitude,
            latitudeDelta: NAVIGATE_DELTA,
            longitudeDelta: NAVIGATE_DELTA,
          },
          500,
        );
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleRecenter = useCallback(() => {
    const gps = gpsLocationRef.current;
    if (gps && mapRef.current) {
      setShowRecenter(false);
      try {
        mapRef.current.animateToRegion(
          {
            latitude: gps.latitude,
            longitude: gps.longitude,
            latitudeDelta: NAVIGATE_DELTA,
            longitudeDelta: NAVIGATE_DELTA,
          },
          500,
        );
      } catch (e) {}
    }
  }, []);

  // initial mount behavior
  useEffect(() => {
    setShowNavigateBtn(true);
    setShowRecenter(false);
    setHasNavigated(false);
  }, []);

  // Loader status
  const showLoader = !location;

  // safe to use gpsRef in conditional rendering below
  const gps = gpsLocationRef.current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {showLoader ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
              Fetching destination location...
            </Text>
          </View>
        ) : (
          <>
            <MapView
              ref={mapRef}
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => setMapReady(true)}
              initialRegion={{
                latitude: memoizedFromLocation.latitude,
                longitude: memoizedFromLocation.longitude,
                latitudeDelta: DEFAULT_DELTA,
                longitudeDelta: DEFAULT_DELTA,
              }}
              onRegionChangeComplete={handleRegionChange}
              showsTraffic={true}
              showsBuildings={false}
              showsIndoors={false}
              toolbarEnabled={true}
              showsCompass={true}
            >
              <ShopMarker fromLocation={memoizedFromLocation} />
              <DestinationMarker location={memoizedDestination} />

              {status === 'Order is Picked Up' &&
              gps?.latitude &&
              gps?.longitude ? (
                <>
                  <BikeMarker gpsLocation={gps} rotation={bearing || heading} />

                  <Directions
                    origin={memoizedFromLocation}
                    destination={memoizedDestination}
                    waypoint={gps}
                    onReady={result =>
                      directionsReadyRef.current &&
                      directionsReadyRef.current(result)
                    }
                  />

                  <ShopToGpsPolyline coords={coordsShopToGps} />
                  <GpsToDestPolyline coords={coordsGpsToDest} />
                </>
              ) : (
                <Directions
                  origin={memoizedFromLocation}
                  destination={memoizedDestination}
                  waypoint={null}
                  onReady={result =>
                    directionsReadyRef.current &&
                    directionsReadyRef.current(result)
                  }
                />
              )}
            </MapView>

            {/* Navigate Button */}
            {status === 'Order is Picked Up' && gps && showNavigateBtn && (
              <TouchableOpacity
                style={styles.navigateBtnWrapper}
                onPress={handleNavigate}
              >
                <Icon name="navigate" size={SF(16)} color={'#fff'} />
                <Text style={styles.navigateBtnText}>Navigate</Text>
              </TouchableOpacity>
            )}

            {/* Recenter Button */}
            {gps && showRecenter && (
              <TouchableOpacity
                style={styles.recenterBtn}
                onPress={handleRecenter}
              >
                <Icon name="locate" size={28} color="#fff" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Map);

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
  mapStyle: {
    flex: 1,
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
    padding: SF(6),
    backgroundColor: 'white',
    borderColor: '#4285F4',
    borderWidth: 3,
    borderRadius: SF(40),
  },
  shopImage: {
    height: SF(15),
    width: SF(15),
  },
  destImage: {
    height: SF(15),
    width: SF(15),
  },
  bikeImage: {
    height: SF(35),
    width: SF(45),
    transform: [{ rotate: '-60deg' }],
  },
  navigateBtnWrapper: {
    position: 'absolute',
    bottom: SH(45),
    right: SW(18),
    backgroundColor: '#4285F4',
    paddingHorizontal: SW(18),
    paddingVertical: SH(12),
    borderRadius: SF(45),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 101,
    elevation: 5,
    gap: SW(10),
  },
  navigateBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: SF(19),
    marginLeft: SW(8),
  },
  recenterBtn: {
    position: 'absolute',
    bottom: SH(40),
    right: SW(20),
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 32,
    elevation: 3,
    zIndex: 100,
  },
});
