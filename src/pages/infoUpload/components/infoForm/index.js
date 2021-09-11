import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDisclose} from 'native-base';
import GetDeviceCode from './components/getDeviceCode';
import GetDevicePhoto from './components/getDevicePhoto';
import GetGeolocation from './components/getGeolocation';

import InfoComplete from './components/infoComplete';
import ShowHelp from './components/showHelp';
import ShowAction from './components/showAction';
import {postSubmit} from '../../../../service/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const pickType = {
  InDevice: 'InDevice',
  OutDevice: 'OutDevice',
  BarCode: 'BarCode',
};
export const deviceCodeType = {
  ShowIcon: 'ShowIcon',
  Input: 'Input',
  Result: 'Result',
};
export default function InfoForm(props) {
  const {setpage, PAGE_MAP, navigation, toast} = props;
  const [deviceInImgUrl, setdeviceInImgUrl] = useState(null);
  const [deviceOutImgUrl, setdeviceOutImgUrl] = useState(null);
  const [deviceCode, setdeviceCode] = useState({
    type: deviceCodeType.ShowIcon,
    value: '',
  });
  const [textAreaValue, setTextAreaValue] = useState('');
  const [pickImgType, setpickImgType] = useState(null); // getDevicePhoto or getDeviceCode
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  const setImage = {
    InDevice: url => {
      setdeviceInImgUrl(url);
    },
    OutDevice: url => {
      setdeviceOutImgUrl(url);
    },
  };
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.form}>
            <GetDevicePhoto
              title={'设备照片上传'}
              onOpen={onOpen}
              setShowModal={setShowModal}
              deviceInImgUrl={deviceInImgUrl}
              deviceOutImgUrl={deviceOutImgUrl}
              setpickInImg={() => {
                setpickImgType(pickType.InDevice);
              }}
              setpickOutImg={() => {
                setpickImgType(pickType.OutDevice);
              }}
            />
            <GetDeviceCode
              title={'设备编码上传'}
              onOpen={onOpen}
              deviceCode={deviceCode}
              setCodeText={text => {
                setdeviceCode({...deviceCode, value: text});
              }}
              setpickCodeImg={() => {
                setpickImgType(pickType.BarCode);
              }}
              initCodeType={() => {
                setdeviceCode({
                  type: deviceCodeType.ShowIcon,
                  value: '',
                });
              }}
            />
            <GetGeolocation title={'地理位置'} toast={toast} />
            <InfoComplete
              title={'补充信息'}
              textAreaValue={textAreaValue}
              setTextAreaValue={text => {
                setTextAreaValue(text);
              }}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPressIn={() => {
                navigation.navigate('Home');
              }}>
              <Text style={{color: '#88afd5'}}>返回</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mainButton}
              onPressIn={async () => {
                if (!deviceInImgUrl || !deviceOutImgUrl) {
                  toast.show({
                    title: '设备照片为空',
                    status: 'warning',
                    placement: 'top',
                    duration: 1500,
                    isClosable: false,
                    style: {
                      width: 180,
                    },
                  });
                  return;
                }
                if (!deviceCode.value) {
                  toast.show({
                    title: '设备编码为空',
                    status: 'warning',
                    placement: 'top',
                    duration: 1500,
                    isClosable: false,
                    style: {
                      width: 180,
                    },
                  });
                  return;
                }
                const token = await AsyncStorage.getItem('token');
                // const worker = await AsyncStorage.getItem('worker');
                const username = await AsyncStorage.getItem('username');

                const res = await postSubmit({
                  // worker,
                  elecid: deviceCode.value,
                  information: textAreaValue,
                  token,
                  username,
                  file1: deviceInImgUrl,
                  file2: deviceOutImgUrl,
                });
                //token无效
                if (res.code === 101) {
                  await AsyncStorage.removeItem('token');
                  toast.show({
                    title: '用户信息已过期，请重新登录',
                    status: 'warning',
                    placement: 'top',
                    isClosable: false,
                    style: {
                      width: 340,
                    },
                  });
                  navigation.navigate('Login');
                }
                if (res.code === 200) {
                  // const pgname =
                  //   Math.floor(Math.random() * 2) === 0
                  //     ? PAGE_MAP.RESULT_ERROR
                  //     : PAGE_MAP.RESULT_SUCCESS;
                  setpage(PAGE_MAP.RESULT_SUCCESS);
                }
                // if (res.code === 200 && res.msg === '安装成功') {
                //   setpage(PAGE_MAP.RESULT_SUCCESS);
                //   return;
                // }
                // if (res.code === 200 && res.msg === '安装失败') {
                //   setpage(PAGE_MAP.RESULT_ERROR);
                //   return;
                // }
                // toast.show({
                //   title: '登录成功',
                //   status: 'success',
                //   placement: 'top',
                //   isClosable: false,
                // });
                // const pgname =
                //   Math.floor(Math.random() * 2) === 0
                //     ? PAGE_MAP.RESULT_ERROR
                //     : PAGE_MAP.RESULT_SUCCESS;
                // setpage(pgname);
              }}>
              <Text style={{color: 'white'}}>提交</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <ShowAction
        isOpen={isOpen}
        onClose={onClose}
        pickImgType={pickImgType}
        launchImageLibrary={launchImageLibrary}
        setImage={setImage}
        setdeviceCode={setdeviceCode}
        navigation={navigation}
        toast={toast}
      />
      <ShowHelp showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  form: {},
  title: {
    fontSize: 14,
    color: '#505050',
    paddingTop: 20,
    fontWeight: 'bold',
  },
  buttonView: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  mainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#88afd5',
    flex: 1,
    height: 45,
    borderWidth: 1,
    marginLeft: 5,
    borderColor: '#88afd5',
    borderRadius: 3,
    padding: 10,
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#88afd5',
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    height: 45,
    borderRadius: 3,
    padding: 10,
  },
});
