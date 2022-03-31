import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDisclose} from 'native-base';
import GetDeviceCode from './components/getDeviceCode';
import GetDevicePhoto from './components/getDevicePhoto';
import GetDeviceNeg from './components/getDeviceNeg';
import GetGeolocation from './components/getGeolocation';

import InfoComplete from './components/infoComplete';
import ShowHelp from './components/showHelp';
import ShowAction from './components/showAction';
import {postSubmit, postEidSearch} from '../../../../service/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const pickType = {
  InDevice: 'InDevice',
  OutDevice: 'OutDevice',
  PosDevice: 'PosDevice',
  NegDevice: 'NegDevice',
  BarCode: 'BarCode',
};
export const deviceCodeType = {
  ShowIcon: 'ShowIcon',
  Input: 'Input',
  Result: 'Result',
};
export default function InfoForm(props) {
  const {setpage, PAGE_MAP, navigation, toast} = props;
  const [deviceInImgUrl, setdeviceInImgUrl] = useState({});
  const [deviceOutImgUrl, setdeviceOutImgUrl] = useState({});
  const [devicePosImgUrl, setdevicePosImgUrl] = useState({});
  const [deviceNegInfo, setdeviceNegInfo] = useState([]);
  const [deviceCode, setdeviceCode] = useState({
    type: deviceCodeType.ShowIcon,
    value: '',
  });
  const [textAreaValue, setTextAreaValue] = useState('');
  const [pickImgType, setpickImgType] = useState(null); // getDevicePhoto or getDeviceCode
  const [negId, setnegId] = useState(null); // getDevicePhoto or getDeviceCode
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showModal, setShowModal] = useState(true);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  const setImage = {
    InDevice: obj => {
      setdeviceInImgUrl(obj);
    },
    OutDevice: obj => {
      setdeviceOutImgUrl(obj);
    },
    PosDevice: obj => {
      setdevicePosImgUrl(obj);
    },
    NegDevice: obj => {
      setdeviceNegInfo(obj);
    },
  };

  return (
    <>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: Dimensions.get('window').height * 0.5 - 75,
            flex: 1,
            zIndex: 9999,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#B5B6B3',
              fontSize: 20,
            }}>
            正在上传,请稍后...
          </Text>
          <ActivityIndicator size={150} color="#B5B6B3" />
        </View>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            ...styles.container,
            backgroundColor: loading ? '#FFFFFF' : 'white',
          }}>
          <View style={styles.form}>
            <GetDevicePhoto
              title={'设备照片上传'}
              onOpen={onOpen}
              setShowModal={setShowModal}
              deviceInImgUrl={deviceInImgUrl?.url}
              deviceOutImgUrl={deviceOutImgUrl?.url}
              devicePosImgUrl={devicePosImgUrl?.url}
              setpickInImg={() => {
                setpickImgType(pickType.InDevice);
              }}
              setpickOutImg={() => {
                setpickImgType(pickType.OutDevice);
              }}
              setpickPosImg={() => {
                setpickImgType(pickType.PosDevice);
              }}
            />
            <GetDeviceCode
              title={'定位编码上传'}
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
            <GetDeviceNeg
              title={'故障照片上传'}
              onOpen={onOpen}
              setnegId={setnegId}
              setShowModal={setShowModal}
              setdeviceNegInfo={setdeviceNegInfo}
              deviceNegInfo={deviceNegInfo}
              deviceInImgUrl={deviceInImgUrl?.url}
              deviceOutImgUrl={deviceOutImgUrl?.url}
              devicePosImgUrl={devicePosImgUrl?.url}
              setpickInImg={() => {
                setpickImgType(pickType.InDevice);
              }}
              setpickOutImg={() => {
                setpickImgType(pickType.OutDevice);
              }}
              setpickPosImg={() => {
                setpickImgType(pickType.PosDevice);
              }}
              setpickNegImg={() => {
                setpickImgType(pickType.NegDevice);
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
                console.log(deviceNegInfo);
                // navigation.navigate('Home');
              }}>
              <Text style={{color: '#88afd5'}}>返回</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mainButton}
              onPressIn={async () => {
                // console.log(deviceNegInfo);
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
                const deviceInfo = await postEidSearch(deviceCode.value);
                if (deviceInfo.code === 201) {
                  const {username: us} = deviceInfo.data;
                  if (us !== username) {
                    Alert.alert(
                      '提交失败',
                      `该电表已被用户名为 ${us} 的用户提交过，请选择其他电表`,
                      [
                        {
                          text: '取消',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: '返回主页',
                          onPress: () => {
                            navigation.navigate('Home');
                          },
                        },
                      ],
                    );
                    return;
                  }
                }
                const username = await AsyncStorage.getItem('username');
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
                setloading(true);
                const token = await AsyncStorage.getItem('token');
                // const worker = await AsyncStorage.getItem('worker');

                // const res = await postSubmit({
                //   // worker,
                //   elecid: deviceCode.value,
                //   information: textAreaValue,
                //   token,
                //   username,
                //   file1: deviceInImgUrl.upload_url,
                //   file2: deviceOutImgUrl.upload_url,
                // });

                const file1_ = [
                  {path: deviceInImgUrl.upload_url, info: [], code: ''},
                  {path: deviceOutImgUrl.upload_url, info: [], code: ''},
                  {
                    path: devicePosImgUrl.upload_url,
                    info: [],
                    code: deviceCode.value,
                  },
                ];
                const file2_ = deviceNegInfo
                  .filter(item => {
                    return Boolean(
                      item.upload_url && (item.info?.length || item.extra),
                    );
                  })
                  .map(item => {
                    const {upload_url, info, extra} = item;
                    if (extra) {
                      info.push(extra);
                    }
                    return {
                      path: upload_url,
                      info,
                      code: '',
                    };
                  });

                // [{"extra": "", "id": "pr085hhcmb", "info": ["表无电", "表黑屏", "表箱倾斜"], "url": null}, {"extra": "", "id": "e8niow1g6ps", "info": [], "url": null}, {"extra": "", "id": "vyuvk656fhg", "info": [], "url": null}]
                const res = await postSubmit({
                  // worker,
                  elecid: deviceCode.value,
                  information: textAreaValue,
                  token,
                  username,
                  file1: JSON.stringify(file1_),
                  file2: JSON.stringify(file2_),
                });
                setloading(false);
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
        negId={negId}
        launchImageLibrary={launchImageLibrary}
        deviceNegInfo={deviceNegInfo}
        setImage={setImage}
        setdeviceCode={setdeviceCode}
        navigation={navigation}
        toast={toast}
        setloading={setloading}
      />
      <ShowHelp showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
    marginBottom: 100,
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
