import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
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
  const {mention, setdeviceImgUrl, isCorrectImg, toast} = route.params;
  const [camera, setcamera] = useState(null);
  const [loading, setloading] = useState(false);
  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.3};
      setloading(true);
      const data = await camera.takePictureAsync(options);
      const res = await isCorrectImg(data.uri);
      setloading(false);
      console.log(res);
      if (res.code === 201) {
        await setdeviceImgUrl({url: data.uri, upload_url: res.data});
        navigation.goBack();
      } else {
        toast.show({
          title: '照片拍摄不合规，请重新拍摄',
          status: 'error',
          placement: 'top',
          duration: 3000,
          isClosable: false,
          style: {
            width: 240,
          },
        });
      }
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
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: Dimensions.get('window').height * 0.5 - 75,
              width: '100%',
              flex: 1,
              zIndex: 9999,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={150} color="#B5B6B3" />
          </View>
        )}
        <View
          style={{
            opacity: 0.6,
            height: '55%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: loading ? '#F3A016' : 'white',
              paddingTop: 40,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {loading ? '正在上传图片,请等待...' : mention}
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
