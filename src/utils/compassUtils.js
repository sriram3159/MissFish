import CompassHeading from 'react-native-compass-heading';

export const startCompass = callback => {
  const degreeUpdateRate = 3;
  CompassHeading.start(degreeUpdateRate, ({ heading }) => {
    callback(heading);
  });

  return () => CompassHeading.stop();
};
