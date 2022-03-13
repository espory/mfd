import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Input} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {deviceCodeType} from '../index';

export default function GetDeviceCode(props) {
  const {title, onOpen, deviceCode, setpickCodeImg, setCodeText, initCodeType} =
    props;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {deviceCode.type === deviceCodeType.ShowIcon ? (
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => {
              setpickCodeImg();
              onOpen();
            }}>
            <Icon name="barcode" size={60} color="#495058" />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginTop: 20,
              width: '100%',
            }}>
            <Input
              value={deviceCode.value}
              onChangeText={text => {
                setCodeText(text);
              }}
              style={{
                borderColor: '#cccccc',
                backgroundColor: 'white',
                marginLeft: -1,
              }}
              placeholder="输入电表上的编码"
              InputRightElement={
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    right: 10,
                  }}
                  onPress={() => {
                    initCodeType();
                  }}>
                  <AntIcon name="closecircle" size={20} color="#495058" />
                </TouchableOpacity>
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: '#505050',
    paddingTop: 20,
    fontWeight: 'bold',
  },
  cameraButton: {
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  image: {
    borderColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
