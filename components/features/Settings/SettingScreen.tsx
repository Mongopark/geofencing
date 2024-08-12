import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, TextInput, Pressable, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Collapsible } from '@/components/component/Collapsible';
import { ExternalLink } from '@/components/component/ExternalLink';
import ParallaxScrollView from '@/components/component/ParallaxScrollView';
import { ThemedText } from '@/components/component/ThemedText';
import { ThemedView } from '@/components/component/ThemedView';
import { Colors } from '../../constants/Colors';
import { useThemeStore, useBoundaryStore } from "@/components/store";
import { Logout, LogoutCurve } from 'iconsax-react-native';

export default function TabTwoScreen() {
  const [inputBoundary, setInputBoundary] = useState('');
  const [instruct, setInstruct] = useState(false);
  const themer = useThemeStore((state: any) => state.color);
  const theme = Colors.light;
  const changeBoundary = useBoundaryStore((state) => state.setBoundary);
  const boundary = useBoundaryStore((state) => state.boundary);

  useEffect(() => {
    setInputBoundary(boundary.toString());
  }, [boundary]);

  const handleInputChange = (text: string) => {
    setInputBoundary(text);
  };

  const handleBoundaryBlur = () => {
    const newBoundary = parseInt(inputBoundary);
    if (!isNaN(newBoundary) && newBoundary!==0) {
      changeBoundary(newBoundary); // Update boundary only when the input is valid and editing is done
    } else {
      Alert.alert('Invalid boundary value', 'Please enter a valid number.');
    }
  };


  useEffect(() => {
    if (boundary !== null && boundary !== undefined) {
      console.log('Boundary has been updated to:', boundary);
      Alert.alert('Geofencing Radius Changed', `New radius: ${boundary} meters`);
    }
  }, [boundary]);
  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0a7ea4', dark: themer === 'light' ? '#0a7ea4' : '#1D3D47' }}
      headerImage={
        <Image
          source={require('../../../assets/images/black-woman.jpg')}
          style={styles.headerImage}
        />
      }
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
          <ThemedText type="defaultSemiBold">Psycological Therapist</ThemedText>
        </ThemedText>
        <ThemedText>
          Three times Nobel Prize winner with a medal of honor in{' '}
          <ThemedText type="defaultSemiBold">Chemical Physiotherapy</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">Neurological Practice</ThemedText>
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
          Adjust the Geofence Boundary with the Input Field Below
        </ThemedText>
        <TextInput
          style={[styles.input,{color: themer==='light'?'black':'white',}]}
          placeholder="Input boundary value here..."
          value={inputBoundary}
          onChangeText={handleInputChange}
          onBlur={handleBoundaryBlur} // Update boundary value when done editing
          keyboardType="numeric"
        />
        <ThemedText>
          Defaul value: <ThemedText type="defaultSemiBold">200</ThemedText>{boundary === 0 ? '' : ', Current value: '}
          <ThemedText type="defaultSemiBold">{boundary === 0 ? '' : boundary}</ThemedText>
        </ThemedText>
      </Collapsible>
      <Collapsible title="Instructions to use">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">Geofenct It! app </ThemedText>
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            and navigate to the Map Screen or simply click here 
            </ThemedText><ThemedText type="defaultSemiBold"> Map Screen </ThemedText><ThemedText style={{ fontFamily: 'SpaceMono' }}>
            allow all location permission settings and other settings{instruct?', then you would see your current location on the map, and you can set your geofence anywhere on the map just by clicking anywhere on the map, once the geofence is set it is set to 200meters radius by default which can be edited in the "change geofence boundary with" part of the settings screen, once the settings has been done, anytime you enter or leave the geofence, you will be alerted':'...'}
            </ThemedText>
        </ThemedText>
        <Pressable onPress={()=>setInstruct(!instruct)}>
          <ThemedText type="link">{instruct?'Show less': 'Learn more'}</ThemedText>
          </Pressable>
      </Collapsible>
      <Collapsible title="Customer Care Support">
        <ThemedText>
          For difficulties or issues using the app, reach out to
          <ThemedText type="defaultSemiBold"> Mr. Mong Israel</ThemedText> on +2347053005600
        </ThemedText>
      </Collapsible>
      <Pressable style={{flexDirection: 'row', paddingStart: 23, alignItems: 'center'}} onPress={()=> Alert.alert('log out')}>
        <ThemedText type="defaultSemiBold"> Logout</ThemedText>
        <View style={{ transform: [{ rotate: '180deg' }], marginStart: 4 }}>
        <LogoutCurve
 size="23"
 color="red"
/></View>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: '85%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,    
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});


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