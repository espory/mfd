import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function MCamera(props) {
  const {navigation, route} = props;
  const {mention, setdeviceImgUrl} = route.params;
  const [camera, setcamera] = useState(null);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.3};
      const data = await camera.takePictureAsync(options);
      await setdeviceImgUrl(data.uri);
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          setcamera(ref);
        }}
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: '相机使用权限',
          message: '需要您的许可去使用相机',
          buttonPositive: '同意',
          buttonNegative: '拒绝',
        }}
        // androidRecordAudioPermissionOptions={{
        //   title: 'Permission to use audio recording',
        //   message: 'We need your permission to use your audio',
        //   buttonPositive: 'Ok',
        //   buttonNegative: 'Cancel',
        // }}
        // onGoogleVisionBarcodesDetected={({barcodes}) => {
        //   console.log(barcodes);
        // }}
      >
        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              paddingTop: 10,
              paddingLeft: 20,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Ionicons name="arrow-back-sharp" size={50} color="white" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            opacity: 0.6,
            height: '55%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              paddingTop: 40,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {mention}
          </Text>
          <Icon
            name="scan-helper"
            size={Dimensions.get('window').width * 0.9}
            color="white"
          />
        </View>
        <View
          style={{
            flex: 0,
            height: '30%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPressIn={takePicture} style={styles.capture}>
            <Icon name="camera" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: 'black',
    marginTop: '15%',
    height: 120,
    width: 120,
    borderRadius: 120,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    paddingBottom: 20,
    opacity: 0.8,
  },
});

export default MCamera;
