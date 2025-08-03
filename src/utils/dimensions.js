import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const BASE_DESIGN_WIDTH = 390; // Figma artboard width
export const BASE_DESIGN_HEIGHT = 931; // Figma artboard height

export const SW = dimension => {
  return wp((dimension / BASE_DESIGN_WIDTH) * 100 + '%');
};

export const SH = dimension => {
  return hp((dimension / BASE_DESIGN_HEIGHT) * 100 + '%');
};

export const SF = dimension => {
  return hp((dimension / BASE_DESIGN_HEIGHT) * 100 + '%');
};

export const heightPercent = percent => {
  return hp(percent);
};

export const widthPercent = percent => {
  return wp(percent);
};

export const fontPercent = percent => {
  return hp(percent);
};
