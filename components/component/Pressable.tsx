import React from 'react';
import {
  Pressable as NativePressable,
  PressableProps as NativePressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type PressableProps = NativePressableProps & {
  style?: StyleProp<ViewStyle>;
};

export default function Pressable(props: PressableProps) {
  return (
    <NativePressable
      {...props}
      style={({ pressed }) => [
        props.style,
        { opacity: pressed ? 0.5 : 1 }, // Adjust opacity based on press state
      ]}
    />
  );
}
