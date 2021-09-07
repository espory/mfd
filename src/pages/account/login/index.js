import React, {useEffect, useState, useContext} from 'react';
var axios = require('axios');
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LOGO_URL = '../../../public/image/logo.jpg';
import {ToastContext} from '../../../index';
import {postLogin} from '../../../service/index';
import {useToast} from 'native-base';
const Login = props => {
  const {navigation} = props;
  // const toast = useContext(ToastContext);
  const toast = useToast();
  const [keyboardShow, setkeyboardShow] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const isJump = async () => {
    const res = await AsyncStorage.getItem('token');
    console.log(res);
    if (res) {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    isJump();
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setkeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setkeyboardShow(false);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.logoView}>
            <Image style={styles.logoImg} source={require(LOGO_URL)} />
            <Text style={{paddingTop: 5, fontWeight: 'bold'}}>用户登录</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              value={username}
              onChangeText={text => {
                setusername(text);
              }}
              style={styles.input}
              editable
              maxLength={30}
              placeholder={'输入用户名'}
            />
            <TextInput
              value={password}
              onChangeText={text => {
                setpassword(text);
              }}
              style={styles.input}
              editable
              secureTextEntry={true}
              maxLength={30}
              placeholder={'输入密码'}
            />
            <TouchableOpacity
              style={styles.button}
              title="登录"
              onPressIn={async () => {
                if (!username || !password) {
                  toast.show({
                    title: '用户名或密码不能为空',
                    description: '',
                    status: 'error',
                    placement: 'top',
                    duration: 1500,
                    isClosable: false,
                    style: {
                      width: 250,
                    },
                  });
                  return;
                }

                const loginRes = await postLogin({username, password});
                const {code = 400} = loginRes;
                if (code === 205) {
                  toast.show({
                    title: '用户名或密码错误',
                    status: 'error',
                    placement: 'top',
                    duration: 1500,
                    isClosable: false,
                    style: {
                      width: 220,
                    },
                  });
                  return;
                }
                if (code === 400) {
                  toast.show({
                    title: '未知错误，请联系管理员',
                    status: 'error',
                    placement: 'top',
                    duration: 1500,
                    isClosable: false,
                    style: {
                      width: 250,
                    },
                  });

                  return;
                }
                toast.show({
                  title: '登录成功',
                  status: 'success',
                  placement: 'top',
                  duration: 2000,
                  isClosable: false,
                  style: {
                    width: 140,
                  },
                });
                const {token, data} = loginRes;
                const {name, worker} = data;
                await AsyncStorage.setItem('name', name);
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('worker', String(worker));
                await AsyncStorage.setItem('token', token);
                navigation.navigate('Home');
                return;
              }}>
              <Text style={{color: 'white'}}>登录</Text>
            </TouchableOpacity>
          </View>
        </View>

        {!keyboardShow && (
          <View style={styles.containerBottom}>
            <Pressable
              onPressIn={async () => {
                navigation.navigate('Regist');
              }}>
              <Text style={styles.bottomText}>用户注册</Text>
            </Pressable>
            <Text style={styles.bottomText}>|</Text>
            <Pressable
              onPressIn={() => {
                toast.show({
                  title: '功能待实现',
                  status: 'warning',
                  placement: 'top',
                  duration: 1000,
                  isClosable: false,
                  style: {
                    width: 180,
                  },
                });
              }}>
              <Text style={styles.bottomText}>忘记密码</Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerTop: {
    height: '90%',
  },
  logoView: {
    paddingTop: '30%',
    paddingBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  inputView: {
    height: '40%',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    marginTop: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#64505050',
    padding: 0,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#74b4ee',
    marginTop: '15%',
    width: '85%',
    padding: 10,
  },
  containerBottom: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    color: '#808080',
  },
  bottomText: {
    color: '#808080',
    padding: 25,
  },
});

export default Login;
