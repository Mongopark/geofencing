import { Dimensions } from 'react-native';

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const [shortDimension, longDimension] =
  screenWidth < screenHeight ? [screenWidth, screenHeight] : [screenHeight, screenWidth];

// Default guideline sizes based on the figma design
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export function scale(size: number): number {
  return (shortDimension / guidelineBaseWidth) * size;
}

export function verticalScale(size: number): number {
  return (longDimension / guidelineBaseHeight) * size;
}

export function moderateScale(size: number, factor: number = 0.5): number {
  return size + (scale(size) - size) * factor;
}

export function moderateVerticalScale(size: number, factor: number = 0.5): number {
  return size + (verticalScale(size) - size) * factor;
}

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
