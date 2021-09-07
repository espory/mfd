import React, {useEffect, useState, useContext} from 'react';
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
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
const LOGO_URL = '../../../public/image/logo.jpg';
import {ToastContext} from '../../../index';
import {postRegiste, postLogin} from '../../../service/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Regist = props => {
  const [keyboardShow, setkeyboardShow] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [verifyPassword, setverifyPassword] = useState('');
  const {navigation} = props;
  const toast = useContext(ToastContext);

  useEffect(() => {
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
            <Text style={{paddingTop: 5, fontWeight: 'bold'}}>用户注册</Text>
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
            <TextInput
              value={verifyPassword}
              onChangeText={text => {
                setverifyPassword(text);
              }}
              style={styles.input}
              editable
              secureTextEntry={true}
              maxLength={30}
              placeholder={'确认密码'}
            />
            <TouchableOpacity
              style={styles.button}
              title="注册"
              onPressIn={async () => {
                if (password !== verifyPassword) {
                  toast.show({
                    title: '两次输入密码不一致',
                    status: 'error',
                    placement: 'top',
                    duration: 2000,
                    isClosable: false,
                  });
                  return;
                }
                // const initId = Number(Math.random().toString().slice(2, 11));
                const registeRes = await postRegiste({
                  username,
                  password,
                  name: '未命名',
                  // worker: initId,
                });
                const {code} = registeRes || {code: 400};
                if (code === 201) {
                  toast.show({
                    title: '注册成功',
                    status: 'success',
                    placement: 'top',
                    duration: 2000,
                    isClosable: false,
                  });
                  const loginRes = await postLogin({username, password});
                  const {token} = loginRes;
                  await AsyncStorage.setItem('name', '未命名');
                  await AsyncStorage.setItem('username', username);
                  // await AsyncStorage.setItem('worker', String(initId));
                  await AsyncStorage.setItem('token', token);
                  navigation.navigate('Home');
                  return;
                }
                if (code === 405) {
                  toast.show({
                    title: '用户名已存在',
                    status: 'error',
                    placement: 'top',
                    duration: 2000,
                    isClosable: false,
                  });
                  return;
                }
                toast.show({
                  title: '注册失败，请联系管理员',
                  status: 'error',
                  placement: 'top',
                  duration: 2000,
                  isClosable: false,
                });
              }}>
              <Text style={{color: 'white'}}>注册</Text>
            </TouchableOpacity>
          </View>
        </View>

        {!keyboardShow && (
          <View style={styles.containerBottom}>
            <Pressable
              onPressIn={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.bottomText}>已存在账号？去登录</Text>
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

export default Regist;
