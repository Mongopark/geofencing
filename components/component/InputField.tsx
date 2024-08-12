import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors } from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { s, vs } from '../constants/Scaling';
import { ArrowDown2 } from 'iconsax-react-native';
import Pressable from './Pressable';

export interface InputFieldProps extends React.ComponentProps<typeof TextInput> {
  innerRef?: React.Ref<TextInput>;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isNotEditable?: boolean;
}

export function BaseInputField(props: InputFieldProps) {
  const theme = Colors.light;
  return (
    <View style={styles.baseContainer}>
      {props.label && (
        <Text style={styles.label}>{`${props.label} ${props.required ? '*' : ''}`}</Text>
      )}
      {props.children}
      {props.error && <Text style={[styles.error, { color: theme.danger }]}>{props.error}</Text>}
      {props.hint && <Text style={styles.hint}>{props.hint}</Text>}
    </View>
  );
}

export function BaseEditableInputField(props: InputFieldProps) {
  const theme = Colors.light;
  const [focused, setFocused] = useState(false);

  const enableFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const hideFocus = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: props.error
            ? theme.danger
            : focused
              ? theme.primary
              : theme.inputFieldBorder,
        },
        props.style,
      ]}
    >
      {props.leadingIcon && <View style={styles.leadingIcon}>{props.leadingIcon}</View>}
      <TextInput
        ref={props.innerRef}
        selectionColor={theme.primary}
        placeholderTextColor={theme.placeholderText}
        onFocus={enableFocus}
        onBlur={hideFocus}
        onEndEditing={hideFocus}
        style={[
          styles.input,
          styles.text,
          {
            color: theme.black,
          },
        ]}
        {...props}
        editable={props.isNotEditable===true?false:true}
      />
      {props.trailingIcon && <View style={styles.trailingIcon}>{props.trailingIcon}</View>}
    </View>
  );
}

export default function InputField(props: InputFieldProps) {
  return (
    <BaseInputField {...props}>
      <BaseEditableInputField {...props} />
    </BaseInputField>
  );
}

export function PasswordInputField(props: InputFieldProps) {
  const theme = Colors.light;

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <InputField
      {...props}
      secureTextEntry={!visible}
      autoCapitalize="none"
      autoCorrect={false}
      trailingIcon={
        <TouchableOpacity onPress={toggleVisibility}>
          <MaterialCommunityIcons
            name={visible ? 'eye-off' : 'eye'}
            size={s(24)}
            color={theme.inactiveInputField}
          />
        </TouchableOpacity>
      }
    />
  );
}

export function DropdownInputField(props: InputFieldProps & { onPress: () => void }) {
  const theme = Colors.light;
  return (
    <BaseInputField {...props}>
      <Pressable onPress={props.onPress}>
        <BaseEditableInputField
          {...props}
          editable={false}
          onPressIn={props.onPress}
          trailingIcon={
            <ArrowDown2
              size={s(24)}
              color={props.value?.trim() ? theme.black : theme.inactiveInputField}
            />
          }
        />
      </Pressable>
    </BaseInputField>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    gap: vs(4),
  },
  container: {
    borderWidth: s(1),
    borderRadius: s(50),
    paddingHorizontal: s(12),
    paddingVertical: vs(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'san-serif',
    fontSize: s(12),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  input: {
    flex: 1,
  },
  error: {
    marginTop: vs(2),
    fontSize: s(10),
    fontFamily: 'san-serif',
    color: '#FF0000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  hint: {
    marginTop: vs(4),
    fontSize: s(11),
    fontFamily: 'san-serif',
    color: '#757575',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  text: {
    fontFamily: 'san-serif',
    fontSize: s(14),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  leadingIcon: {
    marginRight: s(12),
  },
  trailingIcon: {
    position: 'absolute',
    right: 0,
    padding: s(12),
  },
});