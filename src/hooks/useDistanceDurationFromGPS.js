import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { GOOGLE_MAPS_APIKEY } from '@env';

export const useDistanceDurationFromGPS = destination => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistanceAndDuration = async () => {
      try {
        // Get current GPS location
        const originCoords = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            err => reject(err),
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        });

        setOrigin(originCoords);

        const originStr = `${originCoords.latitude},${originCoords.longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;

        const res = await axios.get(
          'https://maps.googleapis.com/maps/api/directions/json',
          {
            params: {
              origin: originStr,
              destination: destinationStr,
              key: GOOGLE_MAPS_APIKEY,
              mode: 'driving',
            },
          },
        );

        const leg = res.data?.routes?.[0]?.legs?.[0];
        if (!leg) throw new Error('No route found');

        setDistance(leg.distance.text); // e.g., "12.5 km"
        setDuration(leg.duration.text); // e.g., "25 mins"
      } catch (err) {
        setError(err.message || 'Something went wrong');
        console.error('Error fetching distance/duration:', err);
      }
    };

    if (destination?.latitude && destination?.longitude) {
      fetchDistanceAndDuration();
    }
  }, [destination]);

  return { distance, duration, origin, error };
};
