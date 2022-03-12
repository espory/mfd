import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
export default function getDeviceNeg(props) {
  const {
    title,
    onOpen,
    deviceOutImgUrl,
    deviceInImgUrl,
    setpickInImg,
    setpickOutImg,
    setShowModal,
    setpickPosImg,
    devicePosImgUrl,
  } = props;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={{
            padding: 7,
            paddingTop: 20,
            paddingBottom: 0,
            // backgroundColor: 'red',
          }}
          onPressIn={() => {
            setShowModal(true);
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 14,
                paddingRight: 3,
                color: '#F8B200',
              }}>
              点击查看帮助
            </Text>
            <EntypoIcon name="help-with-circle" size={16} color="#F6A726" />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => {
            setpickOutImg();
            onOpen();
          }}>
          {deviceOutImgUrl ? (
            <Image
              source={{
                uri: deviceOutImgUrl,
              }}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator color="white" />}
            />
          ) : (
            <>
              <Text
                style={{
                  position: 'absolute',
                  top: 10,
                  fontSize: 12,
                  color: 'gray',
                }}>
                表箱外壳
              </Text>
              <Icon name="plus" size={30} color="gray" />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.cameraButton, marginLeft: 15}}
          onPress={() => {
            setpickInImg();
            onOpen();
          }}>
          {deviceInImgUrl ? (
            <Image
              source={{uri: deviceInImgUrl}}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator color="white" />}
            />
          ) : (
            <>
              <Text
                style={{
                  position: 'absolute',
                  top: 10,
                  fontSize: 12,
                  color: 'gray',
                }}>
                表箱内部
              </Text>
              <Icon name="plus" size={30} color="gray" />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.cameraButton, marginLeft: 15}}
          onPress={() => {
            setpickPosImg();
            onOpen();
          }}>
          {deviceInImgUrl ? (
            <Image
              source={{uri: devicePosImgUrl}}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator color="white" />}
            />
          ) : (
            <>
              <Text
                style={{
                  position: 'absolute',
                  top: 10,
                  fontSize: 12,
                  color: 'gray',
                }}>
                定位电表
              </Text>
              <Icon name="plus" size={30} color="gray" />
            </>
          )}
        </TouchableOpacity>
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
