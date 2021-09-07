import React from 'react';
import {Text, View, Item, Icon, Input, Button} from 'native-base';
import {KeyboardAvoidingView, Dimensions, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = {
  root: {
    flex: 1,
  },
  upperSection: {
    flex: 1,
  },
  lowerSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  camera: {
    height: '100%',
  },
};

class ItemBarcodeScanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMode: false,
    };
    const {route, navigation} = this.props;
    const {setdeviceCode, toast} = route.params;
    this.navigation = navigation;
    this.setdeviceCode = setdeviceCode;
    this.toast = toast;
    this.WIDTH = Dimensions.get('window').width;
    this.HEIGHT = Dimensions.get('window').height;
  }

  onBarCodeRead = scanResult => {
    // scanResult.data will contain your scanned data
    this.setdeviceCode(scanResult.data);
    this.toast.show({
      title: '识别成功',
      status: 'success',
      placement: 'top',
      duration: 2000,
      isClosable: false,
    });
    this.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.root}>
        {/* OR Use a simple <View> instead of <KeyboardAvoidingView> */}
        <View style={styles.upperSection}>
          <RNCamera
            captureAudio={false}
            style={{flex: 1, alignItems: 'center'}}
            flashMode={
              this.state.flashMode
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            onBarCodeRead={this.onBarCodeRead}>
            <BarcodeMask
              width={this.WIDTH * 0.83}
              height={this.WIDTH * 0.41}
              showAnimatedLine={true}
              outerMaskOpacity={0.2}
            />
            <Text
              style={{
                color: 'white',
                paddingTop: '50%',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              请将条形码置于扫描框中
            </Text>
            <Text
              style={{
                color: 'white',
                paddingTop: '5%',
                fontSize: 13,
                color: '#fef4b4',
                fontWeight: 'bold',
              }}>
              若长时间未识别，建议使用手动输入方式
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: '35%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPressIn={() => {
                  const {flashMode} = this.state;
                  this.setState({flashMode: !flashMode});
                }}
                style={{
                  padding: 20,
                  backgroundColor: `${
                    this.state.flashMode ? '#ededef' : 'black'
                  }`,
                  borderRadius: 100,
                }}>
                <MaterIcon
                  name="flashlight"
                  size={45}
                  color={this.state.flashMode ? 'black' : '#ededef'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={() => {
                  this.navigation.goBack();
                }}
                style={{padding: 20}}>
                <AntDesignIcon name="closecircle" size={80} color="#ededef" />
              </TouchableOpacity>
            </View>
          </RNCamera>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ItemBarcodeScanContainer;
