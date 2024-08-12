/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/components/constants/Colors';
import { useThemeStore } from "@/components/store";

export function useThemeColor(
  props: string,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useThemeStore((state: any) => state.color);
  // const themer = useColorScheme() ?? 'light';
  const themer = theme ?? useColorScheme();
  const colorFromProps = props[themer];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[themer][colorName];
  }
}
