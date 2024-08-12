import React, { useMemo } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, ViewStyle, View } from 'react-native';
import {
    Pressable as NativePressable,
    PressableProps as NativePressableProps,
  } from 'react-native';
  import Pressable, { PressableProps } from './Pressable';
  import { Colors } from '../constants/Colors';
  import { s, vs } from '../constants/Scaling';
  

interface ButtonProps extends Omit<PressableProps, 'children'> {
  text: string | undefined;
  loading?: boolean;
  trailingIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle & TextStyle>;
}

export default function Button(props: ButtonProps) {
  const theme = Colors;

  const style = useMemo(() => StyleSheet.flatten(props.style || {}), [props.style]);

  const childColor = style?.color || theme.light.background;

  return (
    <Pressable
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: props.disabled ? theme.light.disabled : theme.light.primary,
          borderColor: style?.borderColor || theme.light.background,
        },
        style,
      ]}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? (
        <ActivityIndicator color={childColor} />
      ) : (
        <>        
        {props.leadingIcon && <View style={styles.leadingIcon}>{props.leadingIcon}</View>}
          <Text
            style={[
              styles.text,
              {
                fontFamily: style?.fontFamily || 'san-serif',
                color: childColor,
              },
            ]}
          >
            {props.text}
          </Text>
          {props.trailingIcon}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: vs(12),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: s(8),
  },
  leadingIcon: {
    marginRight: 1,
  },
  text: {
    fontSize: s(14),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
