import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/components/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'welcome';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'welcome' ? styles.welcome : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
  },
  welcome: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '300',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 30,
    marginTop: -15
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: -10,
    color: '#0a7ea4',
  },
  link: {
    lineHeight: 24,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
