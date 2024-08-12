import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { Collapsible } from '@/components/component/Collapsible';
import { ExternalLink } from '@/components/component/ExternalLink';
import ParallaxScrollView from '@/components/component/ParallaxScrollView';
import { ThemedText } from '@/components/component/ThemedText';
import { ThemedView } from '@/components/component/ThemedView';
import InputField from '../../component/InputField';
import { Apple, Eye, EyeSlash } from 'iconsax-react-native';
import { Colors } from '../../constants/Colors';

export default function TabTwoScreen() {
  const [password, setPassword] = useState('');
  const inputFieldRef = useRef<any>(null); // Reference for input field
  const theme = Colors.light;
    
  const handleBlur = () => {
    // Keyboard.dismiss();
  };
  const handleChangePassword = (text: any) => {
    setPassword(text); {/* Set the raw amount */}
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image 
        source={require('@/assets/images/black-woman.jpg')} 
        style={[{ alignSelf: 'center' }, styles.headerImage]} 
      />
      }>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Amira Kimberly</ThemedText>
      </ThemedView>
      <ThemedText>A Botanist and Microbiologist practitioner.</ThemedText>
      <ThemedText type="link">amirakimber445@gmail.com</ThemedText>
      </View>
      <Collapsible title="About Me">
        <ThemedText>
        A Botanist and Microbiologist practitioner:{' '}
          <ThemedText type="defaultSemiBold">Expert Zoologist</ThemedText> and{' '}
           and <ThemedText type="defaultSemiBold">Psycological Therapist</ThemedText>
        </ThemedText>
        <ThemedText>
        Three times Nobel Prize winner with a medal of honor in {' '}
          <ThemedText type="defaultSemiBold">Chemical Physiotherapy</ThemedText> and{' '}
           and <ThemedText type="defaultSemiBold">Neurological Practice</ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Read More</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Address">
        <ThemedText>
          15, Oba Akran, Via Obafemi Awolowo way, Ikeja Lagos.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Change Geofence Boundary Width">
        <ThemedText>
          Adjust the Geofence Boundary with the Input Field Below, default is 200
          
        </ThemedText>
        {/* <InputField
  label=""
  placeholder={"Password"}
  onChangeText={(value) => handleChangePassword(value)}
  onBlur={handleBlur}
  keyboardType='numeric'
  secureTextEntry={false}
  value={password} 
  autoCapitalize="none"
  innerRef={inputFieldRef} // Assign input field reference  
        trailingIcon={
            <View style={{flexDirection: 'row', alignItems: 'center'}}><TouchableOpacity style={{padding: 4}}><Eye size="20" color={theme.black} /></TouchableOpacity>
            <Apple />
            </View>
          }
  // required
/> */}
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
          to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -190,
    left: -35,
    position: 'absolute',
    width: 500,
    height: 400
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
